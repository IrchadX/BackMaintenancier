/* eslint-disable @typescript-eslint/no-floating-promises */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // CORS configuration - add your Railway domain
  app.enableCors({
    origin: [
      'http://localhost:3001', 
      'http://localhost:3000',
      // Add your Railway frontend URL here when you deploy
      // 'https://your-frontend-app.railway.app'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  const port = process.env.PORT ?? 3000;
  
  // THIS IS THE KEY FIX - bind to 0.0.0.0
  await app.listen(port, '0.0.0.0');
  
  console.log(`🚀 Application running on port ${port}`);
}

bootstrap().catch(err => {
  console.error('❌ Application failed to start:', err);
  process.exit(1);
});