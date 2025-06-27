/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { ChangePasswordDto } from './dto/ChangePasswordDto ';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}


  async remove(id: number) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      await this.prisma.user.delete({ where: { id } });

      return { message: `User with ID ${id} successfully deleted` };
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new InternalServerErrorException(
        'Failed to delete user: ' + error.message,
      );
    }
  }


  async findOne(id: number) {
    try {
      console.log(`Fetching user with ID: ${id}`);

      const user = await this.prisma.user.findUnique({
        where: { id },
        include: {
          userType: true,
        },
      });

      if (user) {
        console.log(`User found:`, user); 
      } else {
        console.log(`User with ID ${id} not found`); 
      }

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      
      const { password, birth_date, userType, ...result } = user;

    
      console.log(`Formatted user data:`, {
        ...result,
        userType: userType?.type ?? null,
        birthDate: birth_date ? birth_date.toISOString().split('T')[0] : null,
      });

      return {
        ...result,
        userType: userType?.type ?? null,
        birthDate: birth_date ? birth_date.toISOString().split('T')[0] : null,
      };
    } catch (error) {
      console.error(`Error fetching user with ID ${id}:`, error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch user');
    }
  }

  async changePassword(dto: ChangePasswordDto) {
    console.log('DTO:', dto);

    const { userId, currentPassword, newPassword, confirmNewPassword } = dto;

    if (newPassword !== confirmNewPassword) {
      throw new BadRequestException('New passwords do not match');
    }
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    if (!user || !user.password) {
      throw new BadRequestException('Invalid user or missing password');
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch)
      throw new BadRequestException('Current password is incorrect');

    const hashed = await bcrypt.hash(newPassword, 10);

    await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashed },
    });

    return { message: 'Password updated successfully' };
  }

  async updateUser(id: number, data: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }
}
