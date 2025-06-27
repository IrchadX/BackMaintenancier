import { Test, TestingModule } from '@nestjs/testing';
import { AlertService } from './alert.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationGateway } from '../notification/notification.gateway';

describe('AlertService', () => {
  let service: AlertService;
  let prisma: PrismaService;
  let gateway: NotificationGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlertService,
        {
          provide: PrismaService,
          useValue: {
            alert: {
              findMany: jest.fn(),
              create: jest.fn(),
            },
          },
        },
        {
          provide: NotificationGateway,
          useValue: {
            sendAlertNotification: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AlertService>(AlertService);
    prisma = module.get<PrismaService>(PrismaService);
    gateway = module.get<NotificationGateway>(NotificationGateway);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return mapped alerts', async () => {
    const alertMock = {
      id: 1,
      device_id: 2,
      zone: 'A',
      date: new Date(),
      time: new Date(),
      status: 'En cours',
      type: 'Test',
      level: 1,
    };

    prisma.alert.findMany = jest.fn().mockResolvedValue([alertMock]);

   
    const result = await service.getAllAlerts();

   
    expect(result).toHaveLength(1);
    expect(result[0].deviceId).toEqual(alertMock.device_id);
  });

  it('should create alert and notify', async () => {

    const alertData = {
      device_id: 1,
      zone: 'Z',
      time: new Date(),
      date: new Date(),
      status: 'En cours',
      level: 1,
      type: 'Batterie',
    };

    const createdAlert = { ...alertData, id: 10 };

    prisma.alert.create = jest.fn().mockResolvedValue(createdAlert);

   
    const result = await service.createAlert(alertData);

    
    expect(result.deviceId).toBe('1');
    expect(gateway.sendAlertNotification).toHaveBeenCalled();
  });
});
