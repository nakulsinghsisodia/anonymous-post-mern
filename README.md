# Anonymous Chat

A full-stack MERN application where users can share confessions publicly, either anonymously or with their username.

## Features

- User authentication (register/login with JWT)
- Create confession posts
- Post anonymously or with identity visible
- Global feed with latest confessions
- Like/unlike confessions
- Personalized home greeting (logged-in user)
- My Posts page with stats
- Delete own posts
- Responsive UI with React + Tailwind CSS

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, Axios, Framer Motion
- Backend: Node.js, Express, MongoDB, Mongoose, JWT

## Project Structure

```text
Anonymous Chat/
  backend/
  frontend/
```

## Prerequisites

- Node.js (LTS recommended)
- npm
- MongoDB connection string

## Environment Variables

Create `backend/.env`:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

## Installation

From the project root, install dependencies for both apps:

```bash
cd backend
npm install

cd ../frontend
npm install
```

## Run the App

Run backend:

```bash
cd backend
npm run dev
```

Run frontend (new terminal):

```bash
cd frontend
npm run dev
```

Frontend default URL: `http://localhost:5173`  
Backend default URL: `http://localhost:5000`

## Available Scripts

### Backend

- `npm run dev` - start with nodemon
- `npm start` - start production server

### Frontend

- `npm run dev` - start Vite dev server
- `npm run build` - production build
- `npm run preview` - preview production build
- `npm run lint` - run ESLint

## API Overview

- `POST /api/auth/register` - register user
- `POST /api/auth/login` - login user
- `GET /api/confessions` - get all confessions
- `GET /api/confessions/mine` - get current user's confessions (auth required)
- `POST /api/confessions` - create confession (auth required)
- `PUT /api/confessions/:id/like` - toggle like (auth required)
- `DELETE /api/confessions/:id` - delete own confession (auth required)
