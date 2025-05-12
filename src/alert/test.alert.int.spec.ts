import { Test, TestingModule } from '@nestjs/testing';
import { AlertService } from './alert.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationGateway } from '../notification/notification.gateway';

describe('AlertService Integration', () => {
  let service: AlertService;
  let prisma: PrismaService;
  let gateway: NotificationGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlertService,
        PrismaService,
        NotificationGateway,
      ],
    }).compile();

    service = module.get<AlertService>(AlertService);
    prisma = module.get<PrismaService>(PrismaService);
    gateway = module.get<NotificationGateway>(NotificationGateway);
  });

  it('should create alert and emit via WebSocket', async () => {
    const data = {
      device_id: 42,
      zone: 'Zone A',
      time: new Date(),
      date: new Date(),
      status: 'En cours',
      level: 'modere',
      type: 'Connexion perdue',
    };

    const spy = jest.spyOn(gateway, 'sendAlertNotification');

    const alert = await service.createAlert(data);

    expect(alert).toBeDefined();
    expect(spy).toHaveBeenCalled();
  });
});
