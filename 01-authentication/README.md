# Authentication System

This project consists of a full-stack authentication system with a TypeScript Express backend and a React frontend.

> **Note:** For more detailed information about each part of the project, please refer to their respective README files:
>
> - Backend: [Backend README](./back-end/README.md) - Contains detailed API documentation, database setup, and backend-specific configurations
> - Frontend: [Frontend README](./front-end/README.md) - Contains UI/UX details, component documentation, and frontend-specific setup instructions

## Project Structure

```bash
.
├── backend/           # Express TypeScript backend
│   ├── src/
│   │   ├── modules/  # Feature modules (auth, user, etc.)
│   │   └── shared/   # Shared utilities and types
│   └── prisma/       # Database schema and migrations
│
└── frontend/         # React TypeScript frontend
    └── src/
        ├── components/
        ├── pages/
        └── services/ # API integration
```

## Prerequisites

- Node.js (v20 or higher)
- npm or yarn
- PostgreSQL database

## Environment Setup

1. Create a `.env` file in the backend directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/auth_db"

# JWT
JWT_SECRET="your-jwt-secret"
REFRESH_SECRET="your-refresh-secret"

# Server
PORT=3000
NODE_ENV=development
```

2. Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:3000/api
```

## Installation

1. Install backend dependencies:

```bash
cd backend
npm install
```

2. Install frontend dependencies:

```bash
cd frontend
npm install
```

3. Set up the database:

```bash
cd backend
npx prisma migrate dev
```

## Running the Project

### Option 1: Run Separately

1. Start the backend:

```bash
cd backend
npm run dev
```

2. Start the frontend:

```bash
cd frontend
npm run dev
```

### Option 2: Run Both with a Single Command

Create a `package.json` in the root directory:

```json
{
  "name": "auth-system",
  "version": "1.0.0",
  "scripts": {
    "install:all": "npm install && cd frontend && npm install && cd ../backend && npm install",
    "dev": "concurrently \"cd backend && npm run dev\" \"cd frontend && npm run dev\"",
    "build": "cd backend && npm run build && cd ../frontend && npm run build",
    "start": "cd backend && npm start"
  },
  "devDependencies": {
    "concurrently": "^8.0.0"
  }
}
```

Then you can run both applications with:

```bash
npm run dev
```

## API Endpoints

### Authentication

- `POST /api/sign-up` - Register a new user
- `POST /api/sign-in` - Login user
- `POST /api/sign-out` - Logout user
- `POST /api/refresh-token` - Refresh access token

### User

- `GET /api/profile` - Get user profile (protected route)

## Features

- User registration and authentication
- JWT-based authentication with refresh tokens
- Protected routes
- TypeScript support
- PostgreSQL database with Prisma ORM
- React frontend with TypeScript
- Environment configuration
- Development and production builds

## Development

- Backend runs on `http://localhost:3000`
- Frontend runs on `http://localhost:5173`
- API documentation available at `http://localhost:3000/api-docs` (when implemented)

## Production Build

1. Build both applications:

```bash
npm run build
```

2. Start the production server:

```bash
npm start
```

## Security Features

- HTTP-only cookies for token storage
- CSRF protection
- Password hashing with bcrypt
- JWT token expiration
- Refresh token rotation
- Secure cookie settings

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
