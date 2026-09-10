# Task Manager CLI

A simple persistent command line Task Manager built with Typescript, Node.js and Vitest.

## Features

+ Add Tasks
+ List Tasks
+ Complete Tasks
+ Delete tasks
+ Filter tasks
+ Persists tasks in JSON
+ Handle missing and malformed data safely 









\

## Setup

```bash
npm install
npm run dev -- add "Learn async/await"
npm run dev -- list
npm run dev -- complete 1
npm run dev -- delete 1
npm run dev -- filter completed
npm run dev -- filter pending
npm run dev -- filter all
```

## Testing

Run all tests:

```bash
npm test
```

## Build

```bash
npm run build
```

Run the compiled application:

```bash
npm start -- list
```

## Project Structure

```
src/
├── cli/          # CLI commands
├── repository/   # JSON file storage
├── services/     # Business logic
└── types/        # TypeScript types

tests/            # Vitest tests
tasks.json        # Persistent task storage
```