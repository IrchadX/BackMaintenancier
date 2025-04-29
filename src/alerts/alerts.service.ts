import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';

@Injectable()
export class AlertsService {
  constructor(private prisma: PrismaService) {}

  async create(createAlertDto: CreateAlertDto) {
    return this.prisma.alert.create({
      data: createAlertDto,
    });
  }

  async findAll() {
    return this.prisma.alert.findMany({
      include: {
        device: {
          include: {
            device_type: true,
          },
        },
      },
    });
  }

  async findByDevice(deviceId: number) {
    return this.prisma.alert.findMany({
      where: {
        device_id: deviceId,
      },
      include: {
        device: true,
      },
    });
  }

  async findOne(id: number) {
    const alert = await this.prisma.alert.findUnique({
      where: { id },
      include: {
        device: true,
      },
    });

    if (!alert) {
      throw new NotFoundException(`Alert with ID ${id} not found`);
    }

    return alert;
  }

  async update(id: number, updateAlertDto: UpdateAlertDto) {
    const alert = await this.prisma.alert.findUnique({ where: { id } });
    
    if (!alert) {
      throw new NotFoundException(`Alert with ID ${id} not found`);
    }

    return this.prisma.alert.update({
      where: { id },
      data: updateAlertDto,
    });
  }

  async createPanneHistory(alertId: number) {
    const alert = await this.prisma.alert.findUnique({ where: { id: alertId } });
    
    if (!alert) {
      throw new NotFoundException(`Alert with ID ${alertId} not found`);
    }

    return this.prisma.panne_history.create({
      data: {
        alert_id: alertId,
      },
    });
  }
}