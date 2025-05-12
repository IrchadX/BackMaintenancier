import { Test, TestingModule } from '@nestjs/testing';
import { DeviceService } from './device.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationGateway } from '../notification/notification.gateway';

describe('DeviceService', () => {
  let service: DeviceService;
  let prisma: PrismaService;
  let gateway: NotificationGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeviceService,
        {
          provide: PrismaService,
          useValue: {
            device: { findMany: jest.fn() },
            state_type: { findUnique: jest.fn() },
            alert: { create: jest.fn() },
          },
        },
        {
          provide: NotificationGateway,
          useValue: { sendAlertNotification: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<DeviceService>(DeviceService);
    prisma = module.get<PrismaService>(PrismaService);
    gateway = module.get<NotificationGateway>(NotificationGateway);
  });

  it('should trigger alert for low battery', async () => {
    const mockDevices = [
      { id: 1, battery_capacity: 5, state_type_id: 10, connection_state: true },
    ];

    prisma.device.findMany = jest.fn().mockResolvedValue(mockDevices);
    prisma.state_type.findUnique = jest.fn().mockResolvedValue({ state: 'normal' });


    await service.checkDeviceStatus();


    expect(prisma.alert.create).toHaveBeenCalled();
    expect(gateway.sendAlertNotification).toHaveBeenCalled();
  });
});
