<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript application with JWT authentication, Prisma ORM, Supabase integration, and real-time WebSocket notifications.

## Features

- **JWT Authentication** - Secure token-based authentication with Passport.js
- **Prisma ORM** - Type-safe database access with Supabase PostgreSQL
- **WebSocket Support** - Real-time notifications using Socket.IO
- **Device Management** - Device monitoring and alert system
- **User Management** - User registration and profile management
- **Alert System** - Real-time alert notifications

## Project Structure

```
src/
├── auth/           # JWT authentication module
├── users/          # User management
├── device/         # Device operations
├── devices/        # Device management
├── alert/          # Alert system
├── interventions/  # Intervention management
├── notification/   # WebSocket notifications
├── prisma/         # Prisma service
├── supabase/       # Supabase integration
└── app.module.ts   # Main application module
```

## Prerequisites

- Node.js
- npm or yarn
- Supabase 
- PostgreSQL database (via Supabase)

## Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

#DATABASE_URL="postgresql://safa:safa@localhost:5432/xceed?schema=public"
#DIRECT_URL="postgresql://safa:safa@localhost:5432/xceed"
DATABASE_URL="postgresql://postgres.rsctlmexmrtoamsucnsp:kitxiV-0gofce-henboq@aws-0-eu-west-3.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.rsctlmexmrtoamsucnsp:kitxiV-0gofce-henboq@aws-0-eu-west-3.pooler.supabase.com:5432/postgres"
JWT_SECRET="9b33622f0fe0486cff5f5bc4bee3716f9652db6d9d86e953a25c75b8694be71b666d106eaf65bc637213a4d21aed2f232e414c1fab34ba4447b3250d83dd4079d5b31762a9c809b335a1fa7f1253488afeed06a09973092fc7d424e185224ac2bac97a9ec5f263794a05f670d7f84899eb4d995d93c10a9c34c015948fa7869aac6e6b4d476cda4b7164d4db54e1708fddcbcd86016955c19afb949801cb466a83045005d744530a5fed7d45cee9b0d209d548ed3f891e3f399e8198a692f28e25d93cad2529ea5f066c306b79c97f2b28942b8982c6344765f6c4ed347bb3c68ba76682015f8616c10f75745a9006593865429ebdbd97b0e33243810749b7f0"    
```

## Project Setup

```bash
# Install dependencies
$ npm install

# Generate Prisma client
$ npx prisma generate

# Run database migrations
$ npx prisma migrate dev --name init

# Regenerate Prisma client (if needed)
$ npx prisma generate
#Core NestJS Dependencies
$ npm install @nestjs/core @nestjs/common @nestjs/platform-express
# Authentication Dependencies
$ npm install @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt
$ npm install --save-dev @types/passport-jwt @types/bcrypt
# Database Dependencies
$ npm install prisma @prisma/client @supabase/supabase-js
# WebSocket Dependencies
$ npm install @nestjs/websockets @nestjs/platform-socket.io socket.io
# Configuration & Validation
$ npm install @nestjs/config class-validator class-transformer
# Development Dependencies
$ npm install --save-dev @types/passport-jwt @types/bcrypt @types/node typescript ts-node
```


```bash
$ npx prisma migrate dev
```

## Compile and Run the Project

```bash
# Development mode
$ npm run start

# Watch mode (recommended for development)
$ npm run start:dev

# Production mode
$ npm run start:prod
```

The application will start on `http://localhost:3000` .

## API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/validate-token` - Token validation

### Users
- `GET /users` - Get all users
- `POST /users` - Create new user
- `GET /users/:id` - Get user by ID

### Devices
- `GET /devices` - Get all devices
- `POST /devices` - Create new device
- `PUT /devices/:id` - Update device

### Alerts
- `GET /alerts` - Get all alerts
- `POST /alerts` - Create new alert

## WebSocket Events

The application supports real-time notifications via WebSocket:

- Connect to: `ws://localhost:3000`
- Listen for `alert` events for real-time notifications

## Run Tests

```bash
# Unit tests
$ npm run test

# End-to-end tests
$ npm run test:e2e

# Test coverage
$ npm run test:cov
```

## Development Tools

### Prisma Studio
Access your database with a visual editor:
```bash
$ npx prisma studio
```

### Database Reset
Reset your database and run migrations:
```bash
$ npx prisma migrate reset
```

### View Database Schema
```bash
$ npx prisma db pull
```




### Build for Production

```bash
# Build the application
$ npm run build


```

1. **Prisma Client not generated**: Run `npx prisma generate`
2. **Database connection issues**: Check your `DATABASE_URL` in `.env`
3. **JWT errors**: Ensure `JWT_SECRET` is set in your environment
4. **CORS issues**: Update CORS origins in `src/main.ts`

### Database Issues

If you encounter database-related issues:
```bash
# Reset and migrate
$ npx prisma migrate reset

# Check database status
$ npx prisma migrate status
```
