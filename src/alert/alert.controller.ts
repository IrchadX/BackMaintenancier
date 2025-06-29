import { Controller, Get } from '@nestjs/common';
import { AlertService } from './alert.service';

@Controller()
export class AlertController {
  constructor(private readonly alertService: AlertService) {}

  @Get('alerts')
  async getAlerts() {
    console.log("called")
    return this.alertService.getAllAlerts();
    
  }
}
