# Task 5C - REST API + Front-End

A minimal Node.js + Express REST API with a static front-end that performs CRUD operations against the API.

## Prerequisites
- Node.js 18+ installed

## Install
```bash
npm install
```

## Run
```bash
npm start
```
Open `http://localhost:3000` in your browser.

## API
- `GET /api/health` — returns `{ status: "ok", uptimeSec: number }`
- `GET /api/items` — list items
- `GET /api/items/:id` — get single item
- `POST /api/items` — create `{ title: string, completed?: boolean }`
- `PUT /api/items/:id` — update `{ title?: string, completed?: boolean }`
- `DELETE /api/items/:id` — remove

Data is stored in-memory and resets on server restart.

### Error responses
- Not found: `404 { "error": "Not Found" }` for unknown API routes; `404 { "error": "Item not found" }` for missing items
- Bad request: `400 { "error": "..." }` for validation errors
- Server error: `500 { "error": "Internal Server Error" }`

## Project Structure
```
server.js
public/
  index.html
  style.css
  app.js
```
