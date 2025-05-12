/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
// src/auth/auth.controller.ts
import {
  Body,
  Controller,
  Post,
  Get,
  Headers,
  // UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('')
  // eslint-disable-next-line @typescript-eslint/require-await
  async login(@Body() loginDto: LoginDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return this.authService.login(loginDto);
  }

  @Get('validate')
  async validateToken(@Headers('authorization') authHeader: string) {
    try {
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return {
          valid: false,
          error: 'No token provided',
        };
      }
      const token = authHeader.split(' ')[1];
      return this.authService.validateToken(token);
    } catch (error) {
      console.error('❌ Token validation failed:', error.message);
      return { valid: false, error: 'Invalid or expired token' };
    }
  }
}
