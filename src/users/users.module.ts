<<<<<<< HEAD
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
=======
// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
>>>>>>> dina
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
<<<<<<< HEAD
export class UsersModule {}
=======
export class UsersModule {}
>>>>>>> dina
