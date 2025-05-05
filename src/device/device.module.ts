import { Module } from '@nestjs/common';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';
import { PrismaModule } from '../prisma/prisma.module';  
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [
    PrismaModule,  
    NotificationModule,  
  ],
  controllers: [DeviceController], 
  providers: [DeviceService], 
})
export class DeviceModule {}
