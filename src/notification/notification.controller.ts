import { Controller, Post, Body } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationGateway: NotificationGateway) {}

  @Post('notify')
  notifyClients(@Body() data: any) {
    this.notificationGateway.sendAlertNotification(data);
    return { success: true };
  }
}
