import { Controller, Get, Post, Body, Param, Patch, Query } from '@nestjs/common';
import { InterventionsService } from './interventions.service';
import { CreateInterventionDto } from './dto/create-intervention.dto';
import { UpdateInterventionDto } from './dto/update-intervention.dto';

@Controller('interventions')
export class InterventionsController {
  constructor(private readonly interventionsService: InterventionsService) {}

  @Post()
  create(@Body() createInterventionDto: CreateInterventionDto) {
    return this.interventionsService.create(createInterventionDto);
  }

  @Get()
  findAll(@Query('status') status?: string) {
    if (status === 'pending') {
      return this.interventionsService.findPending();
    } else if (status === 'completed') {
      return this.interventionsService.findCompleted();
    }
    return this.interventionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.interventionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInterventionDto: UpdateInterventionDto) {
    return this.interventionsService.update(+id, updateInterventionDto);
  }

  @Post(':id/complete')
  complete(@Param('id') id: string) {
    return this.interventionsService.complete(+id);
  }
}