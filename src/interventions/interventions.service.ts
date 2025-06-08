import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInterventionDto } from './dto/create-intervention.dto';
import { UpdateInterventionDto } from './dto/update-intervention.dto';
import { user as User } from '@prisma/client';
@Injectable()
export class InterventionsService {
  constructor(private prisma: PrismaService) {}
  async create(createInterventionDto: CreateInterventionDto) {
    const data = {
      ...createInterventionDto,
      scheduled_date: new Date(createInterventionDto.scheduled_date), 
      
    };
    return this.prisma.intervention_history.create({
      data,
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
async remove(id: number) {
  const intervention = await this.prisma.intervention_history.findUnique({
    where: { id },
  });

  if (!intervention) {
    throw new NotFoundException(`Intervention with ID ${id} not found`);
  }

  await this.prisma.intervention_history.delete({
    where: { id },
  });

  return { message: `Intervention with ID ${id} has been deleted` };
}

  async findOne(id: number) {
  const intervention = await this.prisma.intervention_history.findUnique({
    where: { id },
  });

  if (!intervention) {
    throw new NotFoundException(`Intervention with ID ${id} not found`);
  }

  let user: User | null = null;

  if (intervention.device_id) {
    const device = await this.prisma.device.findUnique({
      where: { id: intervention.device_id },
      include: { user: true },
    });

    if (device?.user) {
      const { password, ...safeUser } = device.user; // hide password
      user = safeUser as User;
    }
  }

  return {
    ...intervention,
    user,
  };
}
  async update(id: number, updateInterventionDto: UpdateInterventionDto) {
    const intervention = await this.prisma.intervention_history.findUnique({
      where: { id },
    });
    
    if (!intervention) {
      throw new NotFoundException(`Intervention with ID ${id} not found`);
    }

    // Handle date conversion if scheduled_date is being updated
    const data = { ...updateInterventionDto };
    if (data.scheduled_date) {
      data.scheduled_date = new Date(data.scheduled_date);
    }

    return this.prisma.intervention_history.update({
      where: { id },
      data,
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
    });
  }
}