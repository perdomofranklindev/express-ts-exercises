# Express TypeScript Starter

A robust and production-ready starter template for building Express.js applications with TypeScript.

## 📚 Documentation

- [API Documentation](docs/API.md) - Detailed API endpoints documentation, including request/response formats, error codes, and authentication flows.

## 🚀 Technologies

- **Node.js** (>=20.0.0) - JavaScript runtime
- **Express.js** (^4.18.2) - Web framework
- **TypeScript** (^5.3.3) - Type-safe JavaScript
- **Jest** (^29.7.0) - Testing framework
- **ESLint** (^8.57.0) - Code linting
- **Prettier** (^3.5.3) - Code formatter
- **Nodemon** (^3.1.0) - Development server with hot reload
- **Helmet** (^7.1.0) - Security middleware
- **CORS** (^2.8.5) - Cross-origin resource sharing
- **dotenv** (^16.5.0) - Environment variables management

## 📋 Prerequisites

- Node.js >= 20.0.0
- npm (comes with Node.js)

## 🛠️ Installation

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the root directory:

```bash
cp .env.example .env  # if you have an example file
# or create it manually
```

3. Set up the database:

```bash
# Generate Prisma Client
npx prisma generate

# Create and apply database migrations
npx prisma migrate dev

# (Optional) If you need to reset the database
npx prisma migrate reset
```

## 🚀 Usage

### Development

Start the development server with hot reload:

```bash
npm run dev
```

This will:

- Watch for TypeScript file changes
- Automatically restart the server
- Enable hot reloading

### Production

Build the project:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

### Testing

Run tests:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Generate test coverage:

```bash
npm run test:coverage
```

## 📁 Project Structure

```
express-ts-starter/
├── src/                    # Source files
│   ├── __tests__/         # Test files
│   ├── app.ts             # Express application setup
│   └── index.ts           # Application entry point
├── .eslintrc.json        # ESLint configuration
├── .gitignore            # Git ignore rules
├── tsconfig.json         # TypeScript configuration
├── jest.config.js        # Jest configuration
└── package.json          # Project dependencies and scripts

# Ignored directories (not tracked in git)
├── node_modules/         # Dependencies (ignored)
├── dist/                 # Build output (ignored)
└── coverage/            # Test coverage reports (ignored)
```

## Cookie Lifetimes

The project uses two types of cookies for authentication:

1. **Access Token Cookie**

   - Default lifetime: 1 hour
   - Used for regular API access
   - Automatically refreshed when valid

2. **Refresh Token Cookie**
   - Default lifetime: 7 days
   - Used to obtain new access tokens
   - Provides long-term authentication

### Configuring Cookie Lifetimes

You can customize the cookie lifetimes by setting the following environment variables:

```env
# Access Token Configuration
ACCESS_TOKEN_EXPIRES_IN=1h  # Default: 1 hour
COOKIE_ACCESS_TOKEN_MAX_AGE=3600000  # Default: 3600000 (1 hour in milliseconds)

# Refresh Token Configuration
REFRESH_TOKEN_EXPIRES_IN=7d  # Default: 7 days
COOKIE_REFRESH_TOKEN_MAX_AGE=604800000  # Default: 604800000 (7 days in milliseconds)
```

Note: Both string format (e.g., '1h', '7d') and millisecond values are supported. The string format is used for JWT token expiration, while the millisecond values are used for cookie expiration.

If you configure the cookie lifetimes through environment variables make sure to check this file [auth-session-constants](src/modules/auth-session/auth-session-constants.ts)

## 🔧 Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project
- `npm run clean` - Clean the build directory
- `npm run clean:install` - Clean node_modules, package-lock.json, npm cache and reinstall dependencies
- `npm run lint` - Check for linting errors
- `npm run lint:fix` - Automatically fix linting errors
- `npm run lint:check` - Check for linting errors and fail if any warnings are found
- `npm run format` - Format code using Prettier
- `npm run format:check` - Check code formatting using Prettier
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage

## 🔒 Security Features

- **Helmet**: Sets various HTTP headers for security
- **CORS**: Configures Cross-Origin Resource Sharing
- **Environment Variables**: Secure configuration management

## 🧪 Testing

The project uses Jest for testing. Tests are located in the `src/__tests__` directory.

Example test structure:

```typescript
describe('Your Test Suite', () => {
  it('should do something', () => {
    expect(true).toBe(true);
  });
});
```
