# Better Auth System

A full-stack authentication system built with Express.js, TypeScript, React, and Better-Auth. This project demonstrates a modern authentication implementation with enhanced security features, session management, and a clean separation between front-end and back-end.

## 🚀 Overview

This project consists of two main applications:

- **Back-end**: Express.js API with TypeScript, Better-Auth, Prisma ORM, and PostgreSQL
- **Front-end**: React application with TypeScript, Vite, Material-UI, and React Query

### Key Features

- **Better-Auth Integration**: Modern authentication library with session management
- **Database**: PostgreSQL with Prisma ORM for type-safe database operations
- **Docker Support**: Containerized PostgreSQL database for easy development
- **TypeScript**: Full type safety across both front-end and back-end
- **Modern UI**: Material-UI components with responsive design
- **State Management**: React Query for server state management
- **Form Handling**: React Hook Form with Zod validation
- **Security**: CORS, Helmet, and environment-based configuration

## 📋 Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** >= 20.0.0
- **npm** (comes with Node.js)
- **Docker** and **Docker Compose** (for PostgreSQL database)
- **Git** (for cloning the repository)

## 🛠️ Installation & Setup

### 1. Clone and Install Dependencies

```bash
# Clone the repository (if not already done)
git clone <your-repo-url>
cd 02-better-auth

# Install all dependencies (root, front-end, and back-end)
npm run install:all
```

### 2. Database Setup

The project uses PostgreSQL with Docker for easy development setup.

```bash
# Navigate to the back-end directory
cd back-end

# Start PostgreSQL database with Docker
docker-compose up -d

# Verify the database is running
docker-compose ps
```

### 3. Environment Configuration

Create environment files for both applications:

#### Back-end Environment

Create a `.env` file in the `back-end` directory:

```bash
cd back-end
cp .env.example .env  # if available
# or create .env manually
```

Add the following environment variables:

```env
# App
PORT=3000
NODE_ENV=development

# Multiple origins can be specified by separating them with commas
CORS_ORIGINS=http://localhost:5173,http://localhost:3000,http://localhost:4173


# Database
DATABASE_URL="file:./dev.db"

# Security
USERS_PASSWORD_ENCRYPTION_ROUNDS=10

# JWT
JWT_SECRET=hear_my_roar
JWT_REFRESH_SECRET=this_the_way
# Human-readable durations, look at the lib on npm named "ms"
JWT_ACCESS_TOKEN_EXPIRES_IN='1h'
JWT_REFRESH_TOKEN_EXPIRES_IN='7d'

# Session cookies
COOKIE_ACCESS_TOKEN_MAX_AGE=1 # Hours
COOKIE_REFRESH_TOKEN_MAX_AGE=7 # Days
```

#### Front-end Environment

Create a `.env` file in the `front-end` directory:

```bash
cd front-end
# Create .env file manually
```

Add the following environment variables:

```env
VITE_API_URL=http://localhost:3000
```

### 4. Database Migration

Set up the database schema using Prisma:

```bash
# Navigate to back-end directory
cd back-end

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) View database in Prisma Studio
npx prisma studio
```

### 5. Build the Back-end

```bash
# In the back-end directory
npm run build
```

## 🚀 Running the Applications

### Development Mode

From the root directory (`02-better-auth`), run both applications simultaneously:

```bash
npm run dev
```

This will start:

- **Back-end**: http://localhost:3000
- **Front-end**: http://localhost:5173

### Individual Commands

#### Back-end Only

```bash
cd back-end
npm run dev
```

#### Front-end Only

```bash
cd front-end
npm run dev
```

### Production Build

```bash
# Build both applications
npm run build

# Start the back-end server
npm start
```

## 📁 Project Structure

```
02-better-auth/
├── back-end/                 # Express.js API
│   ├── src/
│   │   ├── modules/         # Feature modules
│   │   │   ├── auth/        # Authentication routes & controllers
│   │   │   └── user/        # User management
│   │   ├── shared/          # Shared utilities
│   │   │   ├── config/      # Environment configuration
│   │   │   ├── prisma.ts    # Database connection
│   │   │   └── utils/       # Utility functions
│   │   └── app.ts           # Express app setup
│   ├── lib/
│   │   └── auth.ts          # Better-Auth configuration
│   ├── prisma/
│   │   └── schema.prisma    # Database schema
│   ├── docker-compose.yml   # PostgreSQL container
│   └── package.json
├── front-end/               # React application
│   ├── src/
│   │   ├── modules/         # Feature modules
│   │   │   ├── auth/        # Authentication components
│   │   │   ├── home/        # Home page components
│   │   │   └── user/        # User management
│   │   ├── shared/          # Shared components
│   │   │   ├── auth/        # Auth context & providers
│   │   │   ├── components/  # Reusable components
│   │   │   └── services/    # API services
│   │   └── App.tsx          # Main app component
│   └── package.json
└── package.json             # Root package.json for scripts
```

## 🔧 Available Scripts

### Root Directory Scripts

- `npm run install:all` - Install dependencies for all applications
- `npm run dev` - Start both front-end and back-end in development mode
- `npm run build` - Build both applications
- `npm start` - Start the back-end server

### Back-end Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Check for linting errors
- `npm run format` - Format code with Prettier

### Front-end Scripts

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🗄️ Database Management

### Prisma Commands

```bash
cd back-end

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Reset database (⚠️ Destructive)
npx prisma migrate reset

# View database in browser
npx prisma studio

# Push schema changes (for development)
npx prisma db push
```

### Docker Database Commands

```bash
cd back-end

# Start database
docker-compose up -d

# Stop database
docker-compose down

# View logs
docker-compose logs postgres

# Remove database volume (⚠️ Destructive)
docker-compose down -v
```

## 🔒 Authentication Flow

This project uses Better-Auth for authentication with the following features:

- **Email/Password Authentication**: Traditional login with email and password
- **Session Management**: Secure session handling with configurable expiration
- **User Profiles**: Extended user model with firstName, lastName, and username
- **CORS Protection**: Configured for secure cross-origin requests
- **Environment-based Configuration**: All auth settings configurable via environment variables

### Authentication Endpoints

- `POST /api/auth//sign-up/email` - User registration
- `POST /api/auth//sign-in/email` - User login
- `POST /api/auth/sign-out` - User logout
- `GET /api/auth/get-session` - Get current session
- `GET /api/user/me` - Get user profile

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection Failed**

   - Ensure Docker is running
   - Check if PostgreSQL container is up: `docker-compose ps`
   - Verify DATABASE_URL in `.env` file

2. **Prisma Client Not Generated**

   - Run: `npx prisma generate`
   - Ensure all dependencies are installed

3. **CORS Errors**

   - Check CORS_ORIGINS in back-end `.env`
   - Ensure front-end URL matches the configuration

4. **Better-Auth Secret Issues**
   - Generate a strong secret for BETTER_AUTH_SECRET
   - Ensure the secret is at least 32 characters long

### Development Tips

- Use `npm run dev` from the root directory to start both applications
- Use Prisma Studio for database inspection: `npx prisma studio`

## 📝 Environment Variables Reference

### Back-end (.env)

| Variable                         | Description                       | Default                 |
| -------------------------------- | --------------------------------- | ----------------------- |
| `NODE_ENV`                       | Environment mode                  | `development`           |
| `PORT`                           | Server port                       | `3000`                  |
| `DATABASE_URL`                   | PostgreSQL connection string      | Required                |
| `BETTER_AUTH_SECRET`             | Secret for auth encryption        | Required                |
| `CORS_ORIGINS`                   | Allowed origins (comma-separated) | `http://localhost:5173` |
| `BETTER_AUTH_SESSION_EXPIRES_IN` | Session expiration (days)         | `7`                     |
| `BETTER_AUTH_SESSION_UPDATE_AGE` | Session update age (days)         | `1`                     |

### Front-end (.env)

| Variable       | Description      | Default                 |
| -------------- | ---------------- | ----------------------- |
| `VITE_API_URL` | Back-end API URL | `http://localhost:3000` |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- [Better-Auth](https://better-auth.com/) for the authentication library
- [Prisma](https://prisma.io/) for the database ORM
- [Express.js](https://expressjs.com/) for the web framework
- [React](https://reactjs.org/) for the front-end framework
- [Material-UI](https://mui.com/) for the UI components
