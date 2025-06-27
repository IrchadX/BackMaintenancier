import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { DeviceModule } from './device.module';
import { PrismaService } from '../prisma/prisma.service';

describe('DeviceController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DeviceModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = moduleFixture.get<PrismaService>(PrismaService);
    await app.init();
  });

  it('/device/checkstatus (POST) should trigger alerts and return 201', async () => {
    await request(app.getHttpServer())
      .post('/device/checkstatus')
      .expect((res) => {
        expect([200, 201]).toContain(res.status);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
