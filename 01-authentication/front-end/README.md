# Authentication Frontend

A modern React application built with TypeScript and Vite, featuring a robust authentication system and Material-UI components.

## 🚀 Features

- ⚡️ Built with React 19 and TypeScript
- 🎨 Material-UI (MUI) for beautiful, responsive components
- 🔄 React Query for efficient data fetching and caching
- 📝 React Hook Form with Zod validation
- 🛣️ React Router for navigation
- 📅 Day.js for date manipulation
- 🛠️ ESLint and TypeScript for code quality

## 📦 Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

## ⚙️ Requirements

- Node.js version 20.x or higher
- npm (comes with Node.js)

To check your Node.js version:
```bash
node --version
```

If you need to install or update Node.js, visit [nodejs.org](https://nodejs.org/)

## 🔐 Environment Variables

This project uses environment variables for configuration. Create a `.env` file in the root directory with the following variables:

```env
# API Configuration
VITE_API_URL=http://localhost:3000
```

Copy the `.env.example` file (if available) to create your `.env` file:
```bash
cp .env.example .env
```

⚠️ **Important**: Never commit the `.env` file to version control. It's already included in `.gitignore`.

## 🏃‍♂️ Development

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🏗️ Building for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## 🧪 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run serve` - Serve the app on port 4173

## 🛠️ Tech Stack

- **Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **UI Library**: Material-UI (MUI)
- **State Management**: React Query
- **Form Handling**: React Hook Form + Zod
- **Routing**: React Router DOM
- **Date Handling**: Day.js
- **Code Quality**: ESLint, TypeScript

## 📁 Project Structure

```
src/
├── assets/        # Static assets
├── modules/       # Feature modules
├── shared/        # Shared components and utilities
├── App.tsx        # Main application component
└── main.tsx       # Application entry point
```

## 🔧 Configuration Files

- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `.eslintrc.json` - ESLint configuration
- `package.json` - Project dependencies and scripts

## 📝 License

This project is open source and available under the MIT License. However, if you use this code in your project, you must:

1. Include a visible attribution to the original author
2. Link back to this repository
3. Include the following text in your project's documentation or README:

```
This project uses code from [Authentication Frontend](https://github.com/yourusername/authentication-frontend) by [Your Name].
```

For more details, see the [LICENSE](LICENSE) file.
