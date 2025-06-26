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

- Node.js (v16 or higher)
- npm or yarn
- Supabase account and project
- PostgreSQL database (via Supabase)

## Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="your_supabase_database_url"

# JWT Secret
JWT_SECRET="your_jwt_secret_key"

# Supabase Configuration
SUPABASE_URL="your_supabase_project_url"
SUPABASE_ANON_KEY="your_supabase_anon_key"
SUPABASE_SERVICE_ROLE_KEY="your_supabase_service_role_key"

# Application
PORT=3000
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
```

## Database Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Get your database URL from the Supabase dashboard
3. Update your `.env` file with the correct database URL
4. Run migrations to set up your database schema:

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

The application will start on `http://localhost:3000` (or the PORT specified in your .env file).

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

## CORS Configuration

The application is configured to accept requests from:
- `http://localhost:3000`
- `http://localhost:3001`

Update the CORS configuration in `src/main.ts` if you need to add additional origins.

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

### Environment Variables for Production

Make sure to set the following environment variables in your production environment:
- `DATABASE_URL`
- `JWT_SECRET`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `PORT`

### Build for Production

```bash
# Build the application
$ npm run build

# Start production server
$ npm run start:prod
```

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

## Troubleshooting

### Common Issues

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

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs/)
- [Supabase Documentation](https://supabase.com/docs)
- [JWT Documentation](https://jwt.io/)
- [Socket.IO Documentation](https://socket.io/docs/)

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in Touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
