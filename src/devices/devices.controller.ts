import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post()
  create(@Body() createDeviceDto: CreateDeviceDto) {
    return this.devicesService.create(createDeviceDto);
  }

  @Get()
  findAll(@Query('status') status?: string) {
    if (status) {
      return this.devicesService.findByStatus(status);
    }
    return this.devicesService.findAll();
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.devicesService.findByUser(+userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.devicesService.findOne(+id);
  }

  @Get(':id/diagnostic')
  runDiagnostic(@Param('id') id: string) {
    return this.devicesService.runDiagnostic(+id);
  }

  @Patch(':id')
update(@Param('id') id: string, @Body() updateDeviceDto: UpdateDeviceDto) {
  return this.devicesService.update(+id, updateDeviceDto);
}

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.devicesService.remove(+id);
  }
  
}