// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AidantModule } from './aidant/aidant.module';
import { ProfilModule } from './Functions/Profil/profil.module';
import { AppelModule } from './Functions/appel/appel.module';
import { DeviceModule } from './device/device.module'; 
import { AlertModule } from './alert/alert.module'; 

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    AidantModule,
    AppelModule,
    ProfilModule,
    DeviceModule,
    AlertModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
