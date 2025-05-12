/* eslint-disable prettier/prettier */
 
 
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { AppelService } from './appel.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('AppelService (Integration Test)', () => {
  let service: AppelService;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppelService, PrismaService],
    }).compile();

    service = module.get<AppelService>(AppelService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should return the correct phone number from the database', async () => {
    const phoneNumber = await service.getUserPhoneNumber('66');

    expect(phoneNumber).toBeDefined();
    expect(phoneNumber).toBe('0778443252');
  });

  it('should return emergency contact information correctly', async () => {
  
    const EmergencyContact = [
      { label: "Gendarme", number: "1055" },
      { label: "Fire", number: "0778443252" },
      { label: "Police", number: "0778443252" }
    ];

    
    const emergencyContacts = await service.getListEmergencyContacts();

    expect(emergencyContacts).toBeDefined();
    expect(emergencyContacts).toEqual(
      EmergencyContact
    );
  });
});
