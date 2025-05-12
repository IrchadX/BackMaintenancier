/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
 
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
 
 
 
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { AppelService } from './appel.service';

const prismaMock = {
  helper_user: {
    findFirst: jest.fn(),
  },
  user: {
    findUnique: jest.fn(),
  },
  emergency_contact: {
    findMany: jest.fn(),
  },
} ;

describe('AppelService', () => {
  let service: AppelService;

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppelService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<AppelService>(AppelService);
  });

  describe('getUserPhoneNumber', () => {
    it('should return phone number when both queries succeed', async () => {
      const mockHelperUser = { helper_id: 'helper123' };
      const mockHelper = { phone_number: '0778443252' };

      prismaMock.helper_user.findFirst.mockResolvedValueOnce({
        helper_id: 'helper123',
      });
      prismaMock.user.findUnique.mockResolvedValueOnce({
        phone_number: '0778443252',
      });

      const result = await service.getUserPhoneNumber('4');
      expect(result).toEqual("0778443252");
    });

    it('should return null and log error when first query fails', async () => {
      const mockError = new Error('Database error');
      console.error = jest.fn();

      prismaMock.helper_user.findFirst.mockRejectedValueOnce(mockError);

      const result = await service.getUserPhoneNumber('5');
      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalledWith('Error in getUserPhoneNumber:', mockError);
    });

    it('should return null and log error when second query fails', async () => {
      const mockHelperUser = { helper_id: 'helper123' };
      const mockError = new Error('Phone number error');
      console.error = jest.fn();

      prismaMock.helper_user.findFirst.mockResolvedValueOnce(mockHelperUser);
      prismaMock.user.findUnique.mockRejectedValueOnce(mockError);

      const result = await service.getUserPhoneNumber('6');
      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalledWith('Error in getUserPhoneNumber:', mockError);
    });
  });

  describe('getEmergencyContacts', () => {
    it('should fetch emergency contacts', async () => {
      const mockContacts = [{ label: 'John Doe', number: '12345' }];
      prismaMock.emergency_contact.findMany.mockResolvedValueOnce(mockContacts);

      const result = await service.getListEmergencyContacts();
      expect(result).toEqual(mockContacts);
      expect(prismaMock.emergency_contact.findMany).toHaveBeenCalled();
    });

    it('should log an error when fetching emergency contacts fails', async () => {
      const mockError = new Error('Database error');
      console.error = jest.fn();

      prismaMock.emergency_contact.findMany.mockRejectedValueOnce(mockError);

      await service.getListEmergencyContacts();
      expect(console.error).toHaveBeenCalledWith('Error fetching emergency contacts:', mockError);
    });
  });
});
