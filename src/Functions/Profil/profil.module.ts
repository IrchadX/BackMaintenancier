import { Module } from '@nestjs/common';
import { ProfilService } from './profil.service';
import { ProfilController } from './profil.controller';

import { PrismaService } from '../../prisma/prisma.service';

@Module({
  providers: [ProfilService, PrismaService],
  controllers: [ProfilController],
})
export class ProfilModule {}
