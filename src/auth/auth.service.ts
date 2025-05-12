/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: loginDto.email,
      },
      include: {
        userType: true,
      },
    });

    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      userType: user.userType?.type,
    };

    const token = this.jwtService.sign(payload);

    console.log(`User ${user.email} logged in successfully.`);

    return {
      token: token,
      user: {
        id: user.id,
        firstName: user.first_name,
        familyName: user.family_name,
        email: user.email,
        phoneNumber: user.phone_number,
        userType: user.userType?.type,
      },
    };
  }

  async validateToken(token: string) {
    try {
      const decoded = await this.jwtService.verifyAsync(token);
      console.log('✅ Token valid for user:', decoded);
      return {
        valid: true,
        user: decoded, // Return the entire decoded object like in Express
      };
    } catch (error) {
      console.error('❌ Token validation failed:', error.message);
      return {
        valid: false,
        error: 'Invalid or expired token',
      };
    }
  }
}
