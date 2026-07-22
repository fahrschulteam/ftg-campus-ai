# Sprint 1: Grundschutz der Newsletter-App

## Was wurde geändert?

Die wichtigen Netlify-Funktionen verlangen nun einen geheimen Zugangsschlüssel. Ohne diesen Schlüssel können Außenstehende keine Newsletter generieren, Testmails senden, Empfängerlisten abrufen, Dateien hochladen, Kurse verändern oder einen Newsletter versenden.

Die öffentlichen Bild- und PDF-Links bleiben erreichbar, weil sie in versendeten Newslettern funktionieren müssen.

## Geschützte Funktionen

- newsletter-generate
- get-rapidmail-lists
- send-test
- send-rapidmail
- upload-image
- upload-pdf
- kurse-load
- kurse-save

## Einrichtung in Netlify

1. In Netlify das Projekt öffnen.
2. `Site configuration` öffnen.
3. `Environment variables` öffnen.
4. Neue Variable anlegen:
   - Name: `FTG_API_KEY`
   - Wert: ein langer zufälliger Schlüssel, mindestens 32 Zeichen.
5. Optional zusätzlich:
   - Name: `FTG_ALLOWED_ORIGIN`
   - Wert: die vollständige Adresse der App, zum Beispiel `https://deine-app.netlify.app`
6. Danach einen neuen Deploy auslösen.

Beim ersten geschützten Aufruf fragt die App nach dem Zugangsschlüssel. Er wird nur für die aktuelle Browser-Sitzung gespeichert und beim Schließen des Tabs gelöscht.

## Sicherheitsregel

Den Wert von `FTG_API_KEY` niemals in GitHub, E-Mails, Screenshots oder öffentliche Dokumente eintragen.
