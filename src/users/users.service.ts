import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        family_name: true,
        first_name: true,
        email: true,
        phone_number: true,
        userTypeId: true,
        user_type: true,
      },
    });
  }

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const user = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        family_name: createUserDto.family_name,
        first_name: createUserDto.first_name,
        phone_number: createUserDto.phone_number,
        password: createUserDto.password, // À hasher en production
        userTypeId: createUserDto.userTypeId,
      },
      select: {
        id: true,
        family_name: true,
        first_name: true,
        email: true,
        phone_number: true,
        userTypeId: true,
        user_type: true,
      },
    });
  
    return user;
  }
  async findOne(id: number): Promise<UserDto> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        family_name: true,
        first_name: true,
        email: true,
        phone_number: true,
        userTypeId: true,
        user_type: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findByEmail(email: string): Promise<UserDto | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        family_name: true,
        first_name: true,
        email: true,
        phone_number: true,
        userTypeId: true,
        user_type: true,
      },
    });

    return user;
  }
}