import { Module } from '@nestjs/common';
import { AppelService } from './appel.service';
import { AppelController } from './appel.controller';

import { PrismaService } from '../../prisma/prisma.service';

@Module({
  providers: [AppelService, PrismaService],
  controllers: [AppelController],
})
export class AppelModule {}
