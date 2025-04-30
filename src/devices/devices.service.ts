import { Injectable, NotFoundException,BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { DeviceDiagnosticDto } from './dto/device-diagnostic.dto';

@Injectable()
export class DevicesService {
  constructor(private prisma: PrismaService) {}
  async create(createDeviceDto: CreateDeviceDto) {
    const stateType = await this.prisma.state_type.findUnique({
      where: { id: createDeviceDto.state_type_id },
    });
  
    if (!stateType) {
      throw new BadRequestException(`State type with ID ${createDeviceDto.state_type_id} not found`);
    }
  
    
    if (createDeviceDto.user_id) {
      const user = await this.prisma.user.findUnique({
        where: { id: createDeviceDto.user_id },
      });
  
      if (!user) {
        throw new BadRequestException(`User with ID ${createDeviceDto.user_id} not found`);
      }
    }
  
   
    return this.prisma.device.create({
      data: createDeviceDto,
    });
  }

  async findAll() {
    return this.prisma.device.findMany({
      include: {
        device_type: true,
        state_type: true,
        user: true,
      },
    });
  }

  async findByUser(userId: number) {
    return this.prisma.device.findMany({
      where: {
        user_id: userId,
      },
      include: {
        device_type: true,
        state_type: true,
      },
    });
  }

  async findOne(id: number) {
    const device = await this.prisma.device.findUnique({
      where: { id },
      include: {
        device_type: true,
        state_type: true,
        user: true,
        alert: true,
      },
    });

    if (!device) {
      throw new NotFoundException(`Device with ID ${id} not found`);
    }

    return device;
  }

  async update(id: number, updateDeviceDto: UpdateDeviceDto) {
    const device = await this.prisma.device.findUnique({ where: { id } });
    
    if (!device) {
      throw new NotFoundException(`Device with ID ${id} not found`);
    }

    return this.prisma.device.update({
      where: { id },
      data: updateDeviceDto,
    });
  }
  async remove(id: number) {
    const device = await this.prisma.device.findUnique({ where: { id } });
    
    if (!device) {
      throw new NotFoundException(`Device with ID ${id} not found`);
    }
  
    return this.prisma.device.delete({
      where: { id },
    });
  }
  async runDiagnostic(id: number): Promise<DeviceDiagnosticDto> {
    const device = await this.prisma.device.findUnique({ where: { id } });
    
    if (!device) {
      throw new NotFoundException(`Device with ID ${id} not found`);
    }

   
    const batteryLevel = device.battery_capacity;
    
    
    const temperature = batteryLevel > 60 ? 33 : 56;
    
    
    const connectivity = device.connection_state ? 'Bon réseau' : 'Faible signal';
    
    
    const signalStrength = device.comm_state ? 'allowed' : 'Blocked';
    
    
   

    return {
      batteryLevel,
      temperature,
      connectivity,
      signalStrength,
    };
  }

  async findByStatus(status: string) {
    return this.prisma.device.findMany({
      where: {
        state_type: {
          state: status,
        },
      },
      include: {
        device_type: true,
        state_type: true,
      },
    });
  }
}