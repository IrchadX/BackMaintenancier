import { Module } from '@nestjs/common';
import { AlertController } from './alert.controller';
import { AlertService } from './alert.service';
import { PrismaService } from '../prisma/prisma.service';
import {PrismaModule} from '../prisma/prisma.module';
import {NotificationModule} from '../notification/notification.module';

@Module({
  imports: [PrismaModule, NotificationModule],
  controllers: [AlertController],
  providers: [AlertService, PrismaService],
})
export class AlertModule {}