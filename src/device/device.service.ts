import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationGateway } from '../notification/notification.gateway';

@Injectable()
export class DeviceService {
  constructor(
    private prisma: PrismaService,
    private notificationGateway: NotificationGateway
  ) {}

  async checkDeviceStatus() {
    const devices = await this.prisma.device.findMany({});

    for (const device of devices) {
      const stateType = await this.prisma.state_type.findUnique({
        where: { id: device.state_type_id },
      });

      let alertLevel: 'mineur' | 'modere' | 'critique' | null = null;
      let type = '';
      let message = '';

      if (device.battery_capacity < 10) {
        alertLevel = 'modere';
        type = 'Batterie';
        message = `Batterie très faible (${device.battery_capacity}%)`;
      } else if (device.battery_capacity < 20) {
        alertLevel = 'mineur';
        type = 'Batterie';
        message = `Batterie faible (${device.battery_capacity}%)`;
      } else if (!device.connection_state) {
        alertLevel = 'modere';
        type = 'Connexion perdue';
        message = `Le dispositif ${device.id} est hors ligne.`;
      }

      if (stateType?.state === 'défectueux' || stateType?.state === 'en panne') {
        alertLevel = 'critique';
        type = 'État en panne ou defectueux';
        message = `Le dispositif est ${stateType?.state}.`;
      }

      if (alertLevel) {
        const alert = await this.prisma.alert.create({
          data: {
            device_id: device.id,
            zone: 'Zone par défaut',
            time: new Date(),
            date: new Date(),
            status: 'En cours',
            level: alertLevel,
            type: type,
          },
        });

        const notification = {
          id: alert.id.toString(),
          deviceId: device.id.toString(),
          title: type,
          message: message,
          timestamp: new Date().toISOString(),
          alertType: type,
          isHandled: false,
          severity:
            alertLevel === 'mineur'
              ? 'mineur'
              : alertLevel === 'modere'
              ? 'modere'
              : 'critique',
        };

        this.notificationGateway.sendAlertNotification(notification);
      }
    }
  }
}
