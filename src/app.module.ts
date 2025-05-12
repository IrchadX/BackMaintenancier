<<<<<<< HEAD
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { DevicesModule } from './devices/devices.module';
import { InterventionsModule } from './interventions/interventions.module';
import { UsersModule } from './users/users.module';
=======
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
>>>>>>> dina

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
<<<<<<< HEAD
    DevicesModule,

    InterventionsModule,
    UsersModule,
=======
    UsersModule,
    AuthModule,
    AidantModule,
    AppelModule,
    ProfilModule,
    DeviceModule,
    AlertModule,
>>>>>>> dina
  ],
  controllers: [AppController],
  providers: [AppService],
})
<<<<<<< HEAD
export class AppModule {}
=======
export class AppModule {}
>>>>>>> dina
