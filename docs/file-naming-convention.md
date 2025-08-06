# Express/TypeScript File Naming Conventions

## Table of Contents

- [Express/TypeScript File Naming Conventions](#expresstypescript-file-naming-conventions)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [File Categories and Patterns](#file-categories-and-patterns)
    - [Routes](#routes)
    - [Data](#data)
    - [Types](#types)
    - [Controllers](#controllers)
    - [Services](#services)
    - [Middleware](#middleware)
    - [Configuration](#configuration)
    - [Tests](#tests)
    - [Utils](#utils)
    - [Validation](#validation)
  - [Implementation Examples](#implementation-examples)
    - [Route Definitions](#route-definitions)
    - [Route Registration](#route-registration)
    - [Nested Routes Structure](#nested-routes-structure)
  - [Pluralization Rules](#pluralization-rules)
  - [Anti-Patterns to Avoid](#anti-patterns-to-avoid)
  - [Recommended Directory Structure](#recommended-directory-structure)
  - [Environment Variable Configuration](#environment-variable-configuration)
    - [File Naming \& Structure](#file-naming--structure)
    - [Recommended Implementation](#recommended-implementation)
    - [Best Practices](#best-practices)

## Overview

This document outlines the standard naming conventions for Express/TypeScript projects, organized by file categories and their specific patterns.

## File Categories and Patterns

### Routes

| File Type        | Pattern                     | Example            | Separator  | Plurality | Description                         |
| ---------------- | --------------------------- | ------------------ | ---------- | --------- | ----------------------------------- |
| Route Definition | [feature].routes.ts         | user.routes.ts     | Dot (.)    | Plural    | Entry point for all feature routes  |
| Route Handler    | [action]-[entity].routes.ts | get-user.routes.ts | Hyphen (-) | Singular  | Single-route handlers (less common) |

### Data

| File Type            | Pattern                  | Example            | Separator  | Plurality | Description                 |
| -------------------- | ------------------------ | ------------------ | ---------- | --------- | --------------------------- |
| Model Definition     | [entity].model.ts        | product.model.ts   | Dot (.)    | Singular  | Domain models/DB schemas    |
| Data Transfer Object | [action]-[entity].dto.ts | create-user.dto.ts | Hyphen (-) | Singular  | API request/response shapes |

### Types

| File Type            | Pattern                | Example                   | Separator | Plurality | Description                   |
| -------------------- | ---------------------- | ------------------------- | --------- | --------- | ----------------------------- |
| Type Aggregation     | [feature].types.ts     | auth.types.ts             | Dot (.)   | Singular  | Interfaces/enums/type aliases |
| Standalone Interface | [purpose].interface.ts | user-profile.interface.ts | Dot (.)   | Singular  | Single complex interfaces     |
| Enum Definition      | [domain].enum.ts       | http-status.enum.ts       | Dot (.)   | Singular  | Enumerated value collections  |

### Controllers

| File Type       | Pattern                           | Example                     | Separator  | Plurality | Description             |
| --------------- | --------------------------------- | --------------------------- | ---------- | --------- | ----------------------- |
| Main Controller | [feature].controller.ts           | order.controller.ts         | Dot (.)    | Singular  | Primary business logic  |
| Sub-Controller  | [feature]-[context].controller.ts | payment-email.controller.ts | Hyphen (-) | Singular  | Specialized controllers |

### Services

| File Type       | Pattern              | Example                | Separator  | Plurality | Description         |
| --------------- | -------------------- | ---------------------- | ---------- | --------- | ------------------- |
| Core Service    | [feature].service.ts | logger.service.ts      | Dot (.)    | Singular  | Main business logic |
| Utility Service | [purpose].service.ts | date-format.service.ts | Hyphen (-) | Singular  | Reusable utilities  |

### Middleware

| File Type          | Pattern                 | Example                     | Separator | Plurality | Description                 |
| ------------------ | ----------------------- | --------------------------- | --------- | --------- | --------------------------- |
| Global Middleware  | [purpose].middleware.ts | error-handler.middleware.ts | Dot (.)   | Singular  | App-wide middleware         |
| Feature Middleware | [feature].middleware.ts | auth.middleware.ts          | Dot (.)   | Singular  | Feature-specific middleware |

### Configuration

| File Type    | Pattern   | Example   | Separator | Plurality | Description           |
| ------------ | --------- | --------- | --------- | --------- | --------------------- |
| App Config   | config.ts | config.ts | None      | N/A       | Main configuration    |
| Env Settings | .env      | .env      | None      | N/A       | Environment variables |

### Tests

| File Type  | Pattern               | Example              | Separator | Plurality | Description      |
| ---------- | --------------------- | -------------------- | --------- | --------- | ---------------- |
| Unit Tests | [file].spec.ts        | user.service.spec.ts | Dot (.)   | Singular  | Test files       |
| E2E Tests  | [feature].e2e-spec.ts | checkout.e2e-spec.ts | Dot (.)   | Singular  | End-to-end tests |

### Utils

| File Type         | Pattern           | Example        | Separator  | Plurality | Description                  |
| ----------------- | ----------------- | -------------- | ---------- | --------- | ---------------------------- |
| Pure Functions    | [domain]-utils.ts | array-utils.ts | Hyphen (-) | Plural    | Helper functions (non-class) |
| Class-based Utils | [domain].util.ts  | string.util.ts | Dot (.)    | Singular  | Class-based utilities        |

### Validation

| File Type    | Pattern            | Example        | Separator | Plurality | Description        |
| ------------ | ------------------ | -------------- | --------- | --------- | ------------------ |
| Schema Files | [entity].schema.ts | user.schema.ts | Dot (.)   | Singular  | Validation schemas |

## Implementation Examples

### Route Definitions

```typescript
// user.routes.ts
import { Router } from "express";
const router = Router();

router.get("/", getUserController);
router.post("/", createUserController);

export default router;
```

### Route Registration

```typescript
// routes.ts (top-level aggregation)
import userRoutes from "./user.routes";
import productRoutes from "./product.routes";

const routes = (app: Express) => {
  app.use("/api/users", userRoutes);
  app.use("/api/products", productRoutes);
};
```

### Nested Routes Structure

```
orders/
  ├── orders.routes.ts
  └── order-items/
      ├── order-items.routes.ts         # GET /orders/:id/items
      └── order-items.controller.ts
```

## Pluralization Rules

| File Type           | Plurality | Reason                                              |
| ------------------- | --------- | --------------------------------------------------- |
| Route Collections   | Plural    | Manages multiple endpoints (user.routes.ts)         |
| Model Definitions   | Singular  | Represents single entity (product.model.ts)         |
| DTO Files           | Singular  | Defines shape of single object (create-user.dto.ts) |
| Utility Collections | Plural    | Contains multiple helpers (array-utils.ts)          |
| Test Suites         | Singular  | Tests one file (user.service.spec.ts)               |

## Anti-Patterns to Avoid

| Anti-Pattern          | Correct Version         | Problem                             |
| --------------------- | ----------------------- | ----------------------------------- |
| userRoute.ts          | user.routes.ts          | Missing plural for route collection |
| UserController.ts     | user.controller.ts      | PascalCase breaks conventions       |
| auth_controller.ts    | auth.controller.ts      | Underscore not standard             |
| registerInputModel.ts | register-input.model.ts | CamelCase in filename               |

## Recommended Directory Structure

```
src/
├── modules/                      # Feature modules
│   ├── users/                    # User module
│   │   ├── user.controller.ts    # User controller
│   │   ├── user.service.ts       # User business logic
│   │   ├── user.routes.ts        # User routes
│   │   ├── user.model.ts         # User data model
│   │   ├── user.types.ts         # User type definitions
│   │   └── user.schema.ts        # User validation schema
│   │
│   └── products/                 # Product module
│       ├── product.controller.ts # Product controller
│       ├── product.service.ts    # Product business logic
│       ├── product.routes.ts     # Product routes
│       ├── product.model.ts      # Product data model
│       ├── product.types.ts      # Product type definitions
│       └── product.schema.ts     # Product validation schema
│
├── shared/                      # Shared resources
│   ├── middleware/              # Global middleware
│   │   ├── error-handler.middleware.ts
│   │   └── auth.middleware.ts
│   ├── utils/                   # Utility functions
│   │   ├── date-utils.ts
│   │   ├── logger.util.ts
│   │   └── validation-utils.ts
│   └── types/                   # Shared types
│       └── common.types.ts
│
├── config/                      # Configuration
│   ├── config.ts
│   └── env.ts
│
└── main.ts                      # Application entry point
```

This structure follows the principles of:

- Module-based organization: Each feature is self-contained
- Simple and flat structure: Easy to navigate and maintain
- Clear file naming: Consistent with the naming conventions
- Shared resources: Common utilities and middleware

## Environment Variable Configuration

### File Naming & Structure

```
config/
├── env.config.ts      # Main configuration (recommended)
# OR
├── app-config.ts      # Alternative convention
# OR
├── env.ts             # Simple projects
```

### Recommended Implementation

```typescript
// env.config.ts
import dotenv from "dotenv";
import { cleanEnv, str, num, bool } from "envalid";

dotenv.config();

const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ["development", "production", "test"] }),
  PORT: num({ default: 3000 }),
  DATABASE_URL: str(),
  JWT_SECRET: str(),
  AWS_ACCESS_KEY: str(),
  AWS_SECRET: str(),
  ENABLE_CACHE: bool({ default: false }),
  API_TIMEOUT: num({ default: 5000 }),
});

export default {
  environment: env.NODE_ENV,
  port: env.PORT,
  dbUrl: env.DATABASE_URL,
  jwtSecret: env.JWT_SECRET,
  aws: {
    accessKey: env.AWS_ACCESS_KEY,
    secret: env.AWS_SECRET,
  },
  features: {
    caching: env.ENABLE_CACHE,
  },
  timeout: env.API_TIMEOUT,
};
```

### Best Practices

1. Use `envalid` for type-safe environment variable validation
2. Group related configuration values into nested objects
3. Provide sensible defaults where appropriate
4. Use clear, descriptive variable names
5. Document any non-obvious configuration options
