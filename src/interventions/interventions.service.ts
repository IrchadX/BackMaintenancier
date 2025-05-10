import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInterventionDto } from './dto/create-intervention.dto';
import { UpdateInterventionDto } from './dto/update-intervention.dto';

@Injectable()
export class InterventionsService {
  constructor(private prisma: PrismaService) {}

  async create(createInterventionDto: CreateInterventionDto) {
    const { maintenancier_id, device_id, ...otherData } = createInterventionDto;
    
    // Prepare creation data
    const createData: any = {
      ...otherData,
      // Connect to the maintenance user
      user: maintenancier_id ? {
        connect: { id: maintenancier_id }
      } : undefined
    };

    // Only add device connection if device_id is provided
    if (device_id !== undefined) {
      createData.device_id = device_id;
    }

    return this.prisma.intervention_history.create({
      data: createData,
      include: {
        user: true
      }
    });
  }

  async findAll() {
    return this.prisma.intervention_history.findMany({
      include: {
        user: true,
      },
    });
  }

  async findPending() {
    return this.prisma.intervention_history.findMany({
      where: {
        status: 'pending',
      },
      include: {
        user: true,
      },
    });
  }

  async findCompleted() {
    return this.prisma.intervention_history.findMany({
      where: {
        status: 'completed',
      },
      include: {
        user: true,
      },
    });
  }

  async findOne(id: number) {
    const intervention = await this.prisma.intervention_history.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });

    if (!intervention) {
      throw new NotFoundException(`Intervention with ID ${id} not found`);
    }

    return intervention;
  }

  async update(id: number, updateInterventionDto: UpdateInterventionDto) {
    const intervention = await this.prisma.intervention_history.findUnique({
      where: { id },
    });
    
    if (!intervention) {
      throw new NotFoundException(`Intervention with ID ${id} not found`);
    }

    const { maintenancier_id, device_id, ...otherData } = updateInterventionDto;
    
    // Prepare update data
    const updateData: any = { ...otherData };
    
    // Only add user connection if maintenancier_id is provided
    if (maintenancier_id !== undefined) {
      updateData.user = {
        connect: { id: maintenancier_id }
      };
    }

    // Explicitly set device_id if provided
    if (device_id !== undefined) {
      updateData.device_id = device_id;
    }

    return this.prisma.intervention_history.update({
      where: { id },
      data: updateData,
      include: {
        user: true
      }
    });
  }

  async complete(id: number) {
    const intervention = await this.prisma.intervention_history.findUnique({
      where: { id },
    });
    
    if (!intervention) {
      throw new NotFoundException(`Intervention with ID ${id} not found`);
    }

    return this.prisma.intervention_history.update({
      where: { id },
      data: {
        status: 'completed',
        completion_date: new Date(),
      },
      include: {
        user: true
      }
    });
  }
}