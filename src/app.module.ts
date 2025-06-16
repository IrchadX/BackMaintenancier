import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { DevicesModule } from './devices/devices.module';
import { InterventionsModule } from './interventions/interventions.module';
import { UsersModule } from './users/users.module';
import { DeviceModule } from './device/device.module'; 
import { AlertModule } from './alert/alert.module'; 
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UsersModule,
    DeviceModule,
    AlertModule,
    DevicesModule,
AuthModule,
    InterventionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
