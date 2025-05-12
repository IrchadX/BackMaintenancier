import { Module } from '@nestjs/common';
import { AidantService } from './aidant.service';
import { AidantController } from './aidant.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AidantController],
  providers: [AidantService],
})
export class AidantModule {}
