import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Get,
} from '@nestjs/common';
import { AidantService } from './aidant.service';
import { CreateAidantDto } from './dto/create-aidant.dto';
import { PairAidantDto } from './dto/pair-aidant.dto';

@Controller('aidant')
export class AidantController {
  constructor(private readonly aidantService: AidantService) {}

  @Post('signup')
  async signupAidant(@Body() dto: CreateAidantDto) {
    return this.aidantService.signupAidant(dto);
  }

  @Post('pair')
  pairWithAidant(@Body() dto: PairAidantDto) {
    return this.aidantService.pairWithAidant(dto);
  }

  @Post('acceptpairing/:id')
  accept(@Param('id', ParseIntPipe) id: number) {
    return this.aidantService.acceptPairingRequest(id);
  }

  @Post('declinepairing/:id')
  decline(@Param('id', ParseIntPipe) id: number) {
    return this.aidantService.declinePairingRequest(id);
  }

  @Get('pending-requests/:helper_id')
  getPendingRequests(@Param('helper_id') helper_id: string) {
    return this.aidantService.getPendingRequestsForHelper(helper_id);
  }

  @Get('UsersForHelper/:helper_id')
  getUsers(@Param('helper_id') helper_id: string) {
    return this.aidantService.getUsersForHelper(helper_id);
  }
}
