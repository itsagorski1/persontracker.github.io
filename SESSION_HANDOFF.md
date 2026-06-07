# PersonTracker Java → Node.js Migration

Source repo:
- https://github.com/itsagorski1/persontracker.github.io

Target repo:
- https://github.com/itsagorski1/persontracker-nodejs.github.io

Goal:
Convert the existing Java backend/API into a Node.js backend while preserving frontend behavior/UI.

## Stack

Backend:
- Node.js
- Express
- MongoDB + Mongoose
- dotenv
- cors

Optional:
- Socket.IO for realtime updates
- JWT/Auth0 auth
- rate limiting

Frontend:
- Keep existing frontend mostly unchanged
- Replace Java API calls with fetch() to Express API

## Required Deliverables

1. Full Node.js backend
2. Equivalent API routes
3. MongoDB schemas/models
4. Updated frontend API calls
5. Environment variable support
6. Deployment-ready structure
7. README with setup instructions

## Desired Project Structure

persontracker-nodejs/
├── server/
│   ├── index.js
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── public/
│   └── .env.example
├── package.json
└── README.md

## Core API Requirements

GET /api/people
- returns all tracked people

POST /api/update
Body:
{
  "name": "john",
  "lat": 0,
  "lng": 0
}

- updates or inserts person location

Optional:
DELETE /api/person/:name

## Mongo Schema

Person:
- name
- lat
- lng
- updated

## Notes

- GitHub Pages cannot host Node.js
- Frontend remains on GitHub Pages
- Backend should deploy to Render or Railway
- Frontend should call deployed backend URL

Example:
fetch("https://YOUR-APP.onrender.com/api/people")

## Security Requirements

- use .env for secrets
- never expose Mongo URI
- validate request bodies
- add basic rate limiting
- enable CORS safely

## Tasks

1. Analyze current Java project structure
2. Identify backend functionality
3. Port backend logic to Express
4. Replace Java-specific code
5. Preserve frontend behavior
6. Ensure deployability

## Output Format

Generate:
- complete file tree
- all code files
- package.json
- README
- deployment instructions