# TODO List Application

A full-stack TODO list application built with **React.js (Frontend)** and **Node.js + Express (Backend)**. This project allows users to manage tasks with features like adding, updating, deleting, and marking tasks as complete. It also supports task dependencies and recurring tasks.
Please Not that this is a sample code to show case best practises in React 

---

## Features

### Frontend (React.js)

- **Task Management**:
  - Add, update, and delete tasks.
  - Mark tasks as done.
  - Set task priority (Low, Medium, High).
- **Task Dependencies**:
  - Define dependencies between tasks.
  - Prevent marking a task as done if its dependencies are incomplete.
- **Recurring Tasks**:
  - Create daily, weekly, or monthly recurring tasks.
  - Visual indicators for recurring tasks.
- **Search and Filter**:
  - Search tasks by title.
  - Filter tasks by status or priority.
- **Responsive UI**:
  - Works seamlessly on desktop and mobile devices.

### Backend (Node.js + Express)

- **REST API**:
  - CRUD operations for tasks.
  - Handle task dependencies and recurrence logic.
- **Validation**:
  - Validate task data before saving.
  - Prevent circular dependencies.
- **Error Handling**:
  - Centralized error handling with meaningful error messages.
- **TypeScript**:
  - Full TypeScript support for type safety and better developer experience.

---

## Technologies Used

### Frontend

- **React.js**: Frontend framework.
- **TypeScript**: For type safety.
- **Axios**: For API communication.
- **Material-UI (Optional)**: For pre-built UI components.
- **React Testing Library**: For unit testing.

### Backend

- **Node.js**: Runtime environment.
- **Express.js**: Web framework.
- **TypeScript**: For type safety.
- **Jest**: For unit testing.
- **Node-cron**: For handling recurring tasks.

---

## Getting Started

### Prerequisites Install Dependencies:

- Node.js (v16 or higher)
- npm (v8 or higher)
- Git

## Install Dependencies:

BackEnd

- cd todo-backend
- npm install

FrontEnd

- cd todo-frontend
- npm install

## Run the Backend

- cd todo-backend
- npm start

## Run the Frontend

- cd todo-frontend
- npm run dev

## API ENDPOINTS METHOD

Method Endpoint Description
GET /api/tasks Get all tasks
POST /api/tasks Create a new task
PUT /api/tasks/:id Update a task
DELETE /api/tasks/:id Delete a task
GET /api/tasks?search=... Search tasks by title
GET /api/tasks?sortBy=... Sort tasks by priority or status
