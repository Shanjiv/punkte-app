# Punkte

Eine kleine Web-App, mit der Kinder Punkte für **Versuche** sammeln — nicht für
Ergebnisse. Vier Bereiche: Fußball, Zuhause, Schule, Essen. Ab einer einstellbaren
Schwelle gibt es eine Belohnung.

## Benutzen

Die Seite in **Safari** öffnen → Teilen → **Zum Home-Bildschirm**. Sie läuft dann im
Vollbild, mit eigenem Symbol und auch ohne Internet.

Beim ersten Start wird eingetragen, wer sie benutzt: Name, Geburtsdatum, Farbe.

## Datenschutz

**Diese App sendet nichts.** Kein Konto, kein Server, keine Übertragung, keine Tracker,
keine externen Ressourcen. Alle Eingaben liegen ausschließlich im `localStorage` des
Geräts und verlassen es nie. Im Programmcode steht kein Name und kein Geburtsdatum.

Sicherung und Wiederherstellung als JSON-Datei im Elternbereich (auf dem Startbildschirm
das Feld *Für Eltern* gedrückt halten).

## Wie sie gebaut ist

Eine einzige HTML-Datei ohne Framework und ohne externe Zugriffe, dazu ein Manifest, ein
Service Worker für den Offline-Betrieb und drei Symbole.

Zwei Regeln stecken bewusst im Entwurf:

- **Punkte gibt es für Versuche, nicht für Tore.** Ergebnisbezogene Belohnung untergräbt
  die innere Motivation; ein Versuch hängt nur vom Kind ab, ein Tor nicht.
- **Punkte können nie abgezogen werden.** Beim Einlösen sinkt der aktuelle Stand, der
  Wert *insgesamt gesammelt* bleibt stehen.

Kein Vergleich zwischen Kindern: getrennte Konten, keine gemeinsame Rangliste, der Stand
des Geschwisterkindes ist nirgends sichtbar.
