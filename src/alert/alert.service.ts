import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AlertService {
  constructor(private prisma: PrismaService) {}

  private mapAlertToNotification(alert: any) {
    return {
      id: alert.id,
      deviceId: alert.device_id,
      title: alert.type, 
      message: `${alert.type} alert in zone ${alert.zone}`,
      timestamp: `${alert.date.toISOString().split('T')[0]} ${alert.time.toISOString().split('T')[1].split('.')[0]}`,
      zone: alert.zone,
      status: alert.status,
      alertType: alert.type,
      isHandled: alert.status == 'Resolu',
      severity: alert.level?.toString()
    };
  }

  async getAllAlerts(skip?: number, take?: number) {
    const alerts = await this.prisma.alert.findMany({
      skip,
      take,
      orderBy: {
        date: 'desc',
      },
      include: {
        device: true, 
      },
    });

    return alerts.map(this.mapAlertToNotification);
  }
}
