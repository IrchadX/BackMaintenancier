/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
 
 
/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
// src/example/example.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { AppelService } from './appel.service';

@Controller('')
export class AppelController {
  constructor(private readonly exampleService: AppelService) {}

  @Get('api/appel/:id') // Accepts 'id' as a parameter
  async getData(@Param('id') userId: string) {
    const tel = await this.exampleService.getUserPhoneNumber(userId);
    return { 
        phone: tel,
      };
  }
  @Get('api/emergencyappel/')
  async getEmergencyList() {
    const emergencyNumbers = await this.exampleService.getListEmergencyContacts();
    return emergencyNumbers;
  }

}