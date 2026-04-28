# Person Tracker Session Handoff

Date: 2026-04-28
Project: `persontracker`

## What the user asked for

1. Use the code in `src/main/java` and make it into an HTML page.
2. Redo that work in the `html/` folder.
3. Make it use MongoDB.
4. Save the session so work can continue later from another computer.

## What was built

An HTML front end was created at `html/index.html`.

It now supports:

- adding a person
- recording a marriage
- recording a divorce
- viewing saved people and relationship history

The app was then changed from browser `localStorage` to a Java backend backed by MongoDB.

## Files added or changed

### Frontend

- `html/index.html`

### Build configuration

- `build.gradle.kts`

Added:

- Gradle `application` plugin
- MongoDB Java driver
- Jackson databind
- main class pointing to `com.jonah.code.java.random.persontracker.app.PersonTrackerServer`

### New backend files

- `src/main/java/com/jonah/code/java/random/persontracker/app/PersonTrackerServer.java`
- `src/main/java/com/jonah/code/java/random/persontracker/app/MongoPersonRepository.java`
- `src/main/java/com/jonah/code/java/random/persontracker/app/TrackerPerson.java`
- `src/main/java/com/jonah/code/java/random/persontracker/app/MarriageRequest.java`
- `src/main/java/com/jonah/code/java/random/persontracker/app/DivorceRequest.java`

### Existing file fixed so the project compiles

- `src/main/java/com/jonah/code/java/random/persontracker/person/personfileeditor/PersonFileEditor.java`

## Current architecture

### Frontend

`html/index.html` calls these API endpoints:

- `GET /api/people`
- `POST /api/people`
- `DELETE /api/people`
- `POST /api/marriages`
- `POST /api/divorces`

### Backend

`PersonTrackerServer.java`:

- starts a small HTTP server on port `8080` by default
- serves files from the `html/` folder
- exposes the JSON API above

`MongoPersonRepository.java`:

- connects to MongoDB
- uses database `persontracker` by default
- uses collection `people`
- creates a unique index on lowercased names

## Environment variables supported

- `PERSON_TRACKER_MONGO_URI`
- `PERSON_TRACKER_MONGO_DB`
- `PERSON_TRACKER_PORT`

Defaults:

- Mongo URI: `mongodb://localhost:27017`
- Mongo DB: `persontracker`
- Port: `8080`

## Verification already done

This command succeeded:

```powershell
./gradlew compileJava
```

## Current blocker

This command failed:

```powershell
./gradlew run
```

Reason:

- MongoDB was not running on `localhost:27017`
- the server timed out trying to connect

Observed failure:

- `com.mongodb.MongoTimeoutException`
- connection refused to `localhost:27017`

## Exact next step

Start MongoDB locally, then run:

```powershell
./gradlew run
```

After that, open:

```text
http://localhost:8080
```

## Short conversation summary

The work started by converting the rough Java person-tracking classes into an HTML page. That page first used browser storage. Then the user asked to move it to MongoDB, so a Java server and Mongo-backed repository were added and the HTML was switched to API calls. The remaining issue is not code compilation; it is only that MongoDB was not running during the last test.

## How to resume from another computer

Open this repository on the other computer and share this file at the start of the next session. The most useful instruction is:

> Continue from `SESSION_HANDOFF.md`. The frontend is in `html/index.html`, the backend is in `src/main/java/com/jonah/code/java/random/persontracker/app/`, and the current blocker is getting MongoDB running so `./gradlew run` works.
