/* Offline-Betrieb. Bewusst klein gehalten: Die App ist eine einzige Datei ohne
   externe Zugriffe, es gibt also nichts zu koordinieren.

   Strategie: network-first mit Fallback auf den Cache. Damit ist eine neu
   veroeffentlichte Fassung sofort da, sobald Netz vorhanden ist, und ohne Netz
   startet die zuletzt gesehene. Cache-first waere umgekehrt: schneller, aber die
   Kinder haetten tagelang eine alte Fassung. Bei zwei Nutzern zaehlt Aktualitaet
   mehr als der Bruchteil einer Sekunde Ladezeit.

   Die Punktestaende liegen im localStorage und werden vom Cache nie beruehrt. */
const CACHE = "punkte-v1";
const DATEIEN = ["./", "./index.html", "./manifest.webmanifest", "./icon-180.png", "./icon-192.png", "./icon-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(DATEIEN)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request)
      .then(r => {
        const kopie = r.clone();
        caches.open(CACHE).then(c => c.put(e.request, kopie)).catch(() => {});
        return r;
      })
      .catch(() => caches.match(e.request).then(r => r || caches.match("./index.html")))
  );
});
