# Person Tracker

Person Tracker is now structured for a static GitHub Pages frontend plus a Node.js API backed by MongoDB.

## Project Tree

```text
.
├── html/
│   ├── config.js
│   └── index.html
├── server/
│   ├── index.js
│   ├── middleware/
│   │   ├── auth0.js
│   │   └── validation.js
│   ├── models/
│   │   └── Person.js
│   ├── public/
│   ├── routes/
│   │   ├── education.js
│   │   ├── people.js
│   │   └── relationships.js
│   └── .env.example
├── Dockerfile
├── index.html
├── package.json
├── package-lock.json
├── render.yaml
└── README.md
```

The old Java source is still present for reference, but the deployable backend entrypoint is `server/index.js`.

## API

- `GET /healthz`
- `GET /api/people`
- `POST /api/people`
- `POST /api/update`
- `DELETE /api/people`
- `DELETE /api/person/:name`
- `POST /api/marriages`
- `POST /api/divorces`
- `POST /api/education`

`POST /api/update` accepts the lightweight location payload from the handoff:

```json
{
  "name": "john",
  "lat": 0,
  "lng": 0
}
```

## Environment

Copy [server/.env.example](/Users/jonah/Documents/code/java/random/persontracker/server/.env.example) to `.env` for local development.

```text
PORT=8080
MONGO_URI=mongodb://localhost:27017/persontracker
MONGO_DB=persontracker
ALLOWED_ORIGINS=http://localhost:8080,https://YOUR-USER.github.io
RATE_LIMIT_MAX=300
AUTH0_REQUIRED=false
AUTH0_DOMAIN=YOUR-TENANT.us.auth0.com
AUTH0_AUDIENCE=https://persontracker-api
```

The server also accepts the older Java env names, such as `PERSON_TRACKER_MONGO_URI`, for easier migration.

## Local Setup

```sh
npm install
npm start
```

Open `http://localhost:8080`. The frontend is served from `html/`, and API calls go to the same origin by default.

## GitHub Pages Frontend

1. Push the repo to GitHub.
2. In repository settings, open `Pages`.
3. Choose `Deploy from a branch`.
4. Select `main` and `/ (root)`.

The root [index.html](/Users/jonah/Documents/code/java/random/persontracker/index.html) redirects visitors to the static app in `html/index.html`.

## Auth0 Setup

Create two Auth0 resources:

1. Application: choose `Single Page Application`.
2. API: use an identifier such as `https://persontracker-api`.

In the Auth0 Application settings, add these URLs:

```text
Allowed Callback URLs:
http://localhost:8080/,https://YOUR-USER.github.io/YOUR-REPO/html/index.html

Allowed Logout URLs:
http://localhost:8080/,https://YOUR-USER.github.io/YOUR-REPO/html/index.html

Allowed Web Origins:
http://localhost:8080,https://YOUR-USER.github.io
```

Use your real Pages URL. If your Pages site serves from a custom domain or a different path, use that exact app URL instead.

The frontend uses Auth0's SPA SDK, so it only needs public values in [html/config.js](/Users/jonah/Documents/code/java/random/persontracker/html/config.js): domain, client id, and API audience. The backend validates access tokens with Auth0's `express-oauth2-jwt-bearer` middleware.

## Render Deployment

1. Create a MongoDB Atlas cluster and database user.
2. In Render, create a Blueprint from this repo.
3. Set `MONGO_URI` to your Atlas connection string.
4. Set `ALLOWED_ORIGINS` to your exact GitHub Pages origin, for example `https://YOUR-USER.github.io`.
5. Set `AUTH0_DOMAIN` to your Auth0 tenant domain, for example `YOUR-TENANT.us.auth0.com`.
6. Set `AUTH0_AUDIENCE` to the Auth0 API identifier, for example `https://persontracker-api`.
7. Keep `AUTH0_REQUIRED=true` on Render.
8. Deploy.

[render.yaml](/Users/jonah/Documents/code/java/random/persontracker/render.yaml) uses the Dockerfile and checks `/healthz`.

## Connect the Frontend

For a repo-wide default, edit [html/config.js](/Users/jonah/Documents/code/java/random/persontracker/html/config.js):

```js
window.PERSON_TRACKER_CONFIG = {
    apiBaseUrl: "https://your-render-service.onrender.com",
    auth0: {
        domain: "YOUR-TENANT.us.auth0.com",
        clientId: "YOUR_AUTH0_SPA_CLIENT_ID",
        audience: "https://persontracker-api"
    }
};
```

You can also paste the backend URL into the frontend's `API base URL` field and save it in the browser.
