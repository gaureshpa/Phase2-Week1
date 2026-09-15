# Support Ticket API

A simple file-backed REST API for managing support tickets, built with Node.js, Express, and TypeScript.

## Features

* Create support tickets
* List all tickets
* View a ticket by ID
* Update ticket status
* Assign tickets
* Delete tickets
* Validate ticket input
* Store tickets in a JSON file
* Unit and API endpoint tests

## Tech Stack

* Node.js
* Express
* TypeScript
* Vitest

## Project Structure

```text
support-ticket-api/
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── types.ts
│   ├── ticketStore.ts
│   ├── validation.ts
│   └── routes/
│       └── tickets.ts
├── tests/
│   ├── validation.test.ts
│   └── tickets.test.ts
├── data/
│   └── tickets.json
├── package.json
├── tsconfig.json
└── README.md
```

## Installation

Clone the project and install dependencies:

```bash
npm install
```

## Running the API

Start the development server:

```bash
npm run dev
```

The API runs at:

```text
http://localhost:3000
```

## API Endpoints

### Create a ticket

```http
POST /tickets
```

Request body:

```json
{
  "title": "Overflow Issue",
  "description": "Page heading on Home Page is overflowing on mobile",
  "priority": "high"
}
```

Response:

```json
{
  "id": 1,
  "title": "Overflow Issue",
  "description": "Page heading on Home Page is overflowing on mobile",
  "priority": "high",
  "status": "open",
  "assignee": null
}
```

### Get all tickets

```http
GET /tickets
```

### Get a ticket by ID

```http
GET /tickets/:id
```

Example:

```http
GET /tickets/1
```

### Update ticket status

```http
PATCH /tickets/:id/status
```

Request body:

```json
{
  "status": "resolved"
}
```

Allowed statuses:

```text
open
in-progress
resolved
```

### Assign a ticket

```http
PATCH /tickets/:id/assign
```

Request body:

```json
{
  "assignee": "John"
}
```

An assignee can also be cleared:

```json
{
  "assignee": null
}
```

### Delete a ticket

```http
DELETE /tickets/:id
```

Example:

```http
DELETE /tickets/1
```

## Validation

The API validates:

* Title is required
* Description is required
* Priority must be `low`, `medium`, or `high`
* Status must be `open`, `in-progress`, or `resolved`
* Assignee must be a non-empty string or `null`
* Ticket ID must be a positive integer

Invalid input returns:

```http
400 Bad Request
```

A valid ID that does not exist returns:

```http
404 Not Found
```

## Testing

Run the test suite with:

```bash
npm test
```

The tests include:

* Ticket validation unit tests
* Create ticket endpoint
* Get all tickets endpoint
* Get ticket by ID endpoint
* Update status endpoint
* Assign ticket endpoint
* Delete ticket endpoint

## Build

Compile the TypeScript project:

```bash
npm run build
```

Start the compiled application:

```bash
npm start
```

## Data Storage

Tickets are stored in:

```text
data/tickets.json
```

The API reads the file when retrieving tickets and writes the updated data back to the file when tickets are created, updated, or deleted.
