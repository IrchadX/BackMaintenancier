import { Controller, Post } from '@nestjs/common';
import { DeviceService } from './device.service';

@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Post('check-status')
  async checkDeviceStatus() {
    return this.deviceService.checkDeviceStatus();
  }
}
