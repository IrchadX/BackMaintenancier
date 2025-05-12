/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  //InternalServerErrorException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateAidantDto } from './dto/create-aidant.dto';
import { PairAidantDto } from './dto/pair-aidant.dto';
import * as bcrypt from 'bcrypt';

function generateRandomIdentifier(length = 10): string {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from(
    { length },
    () => chars[Math.floor(Math.random() * chars.length)],
  ).join('');
}

@Injectable()
export class AidantService {
  constructor(private prisma: PrismaService) {}
  async signupAidant(dto: CreateAidantDto) {
    const { first_name, family_name, email, password, confirmPassword } = dto;

    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const aidant = await this.prisma.user.create({
      data: {
        first_name,
        family_name,
        email,
        password: hashedPassword,
        userTypeId: 5,
        Identifier: generateRandomIdentifier(),
      },
    });

    return { message: 'Aidant user created', userId: aidant.id };
  }

  async pairWithAidant(dto: PairAidantDto) {
    try {
      console.log('Received DTO:', dto);

      const { user_id, aidant_identifier } = dto;

      const aidant = await this.prisma.user.findFirst({
        where: {
          Identifier: aidant_identifier,
        },
      });

      if (!aidant) {
        throw new Error('Aidant not found');
      }

      const existingPairing = await this.prisma.helper_user.findFirst({
        where: {
          user_id: user_id,
          state: 'Pending',
        },
      });

      if (existingPairing) {
        throw new Error(
          'User has already sent a pairing request to another helper',
        );
      }

      await this.prisma.helper_user.create({
        data: {
          user_id: user_id,
          helper_id: aidant.id,
          state: 'Pending',
        },
      });

      return { message: 'Pairing request sent successfully' };
    } catch (error) {
      console.error('Error in pairWithAidant:', error);
      throw new Error('An error occurred while processing the pairing request');
    }
  }

  async acceptPairingRequest(id: number) {
    const pairing = await this.prisma.helper_user.findUnique({ where: { id } });

    if (!pairing) {
      throw new NotFoundException('Pairing request not found');
    }

    const updated = await this.prisma.helper_user.update({
      where: { id },
      data: { state: 'Accepted' },
    });

    return {
      message: 'Pairing request accepted',
      data: updated,
    };
  }

  async declinePairingRequest(id: number) {
    const pairing = await this.prisma.helper_user.findUnique({ where: { id } });

    if (!pairing) {
      throw new NotFoundException('Pairing request not found');
    }

    const updated = await this.prisma.helper_user.update({
      where: { id },
      data: { state: 'Declined' },
    });

    return {
      message: 'Pairing request declined',
      data: updated,
    };
  }
  async getPendingRequestsForHelper(helperIdParam: string) {
    const helper_id = parseInt(helperIdParam);

    if (isNaN(helper_id)) {
      throw new BadRequestException('Helper ID must be a valid number');
    }

    const pendingRequests = await this.prisma.helper_user.findMany({
      where: {
        helper_id,
        state: 'Pending',
      },
      include: {
        user_helper_user_user_idTouser: true,
      },
    });

    return {
      message: 'Pending requests retrieved successfully',
      data: pendingRequests,
    };
  }

  async getUsersForHelper(helperIdParam: string) {
    const helper_id = parseInt(helperIdParam);

    if (isNaN(helper_id)) {
      throw new BadRequestException('Helper ID must be a valid number');
    }

    const pendingRequests = await this.prisma.helper_user.findMany({
      where: {
        helper_id,
        state: 'Accepted',
      },
      include: {
        user_helper_user_user_idTouser: true,
      },
    });

    return {
      message: 'Users retrieved successfully',
      data: pendingRequests,
    };
  }
}
