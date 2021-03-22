<p align="center">
  <img src="assets/app.png" alt="current-app">
</p>

<h3 align="center">Simple todo</h3>

<p align="center">An Angular & Electron app</p>

# Access

- Frontend : [https://todo.teddyfontaine.fr](https://todo.teddyfontaine.fr)
- API : [https://api-todo.teddyfontaine.fr](https://api-todo.teddyfontaine.fr)
- Swagger : [https://swagger-todo.teddyfontaine.fr/doc/api](https://swagger-todo.teddyfontaine.fr/doc/api)

# Features

## Client Side

- [ ] Final design match ?
- [x] Add new todos to the list
- [x] Mark todos as complete
- [x] Delete todos from the list
- [ ] Filter by all/active/complete todos
- [x] Clear all completed todos
- [x] See hover states for all interactive elements on the page
- [x] **Bonus**: Toggle light and dark mode
- [x] **Bonus**: Drag and drop to reorder items on the list

## Server Side

- [x] Design a simple API for persisting state on the server side
- [x] Implement routes for all listed **CRUD** operations
  - [x] Create a todo
  - [x] Read all todo
  - [x] Update a todo
  - [x] Delete a todo
  - [x] Delete a todo id list
- [x] Implement swagger 3.0

# Launch

## Frontend

```bash
$ cd frontend
$ npm install
$ npm run start
```

## Backend

```bash
$ cd backend
$ npm install
$ npm run start
```