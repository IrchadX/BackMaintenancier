/* eslint-disable prettier/prettier */
 
 
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ProfilService } from './profil.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('ProfilService (Integration Test)', () => {
  let service: ProfilService;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfilService, PrismaService],
    }).compile();

    service = module.get<ProfilService>(ProfilService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should return the correct name from the database', async () => {
    const name = await service.getUserData('66');

    expect(name).toBeDefined();
    expect(name).toBe('Alice Cruz');
  });
  it('should return null if data not found', async () => {
    const name = await service.getUserData('50');

    expect(name).toBeNull();
  });
  it('should return Invalid ID format if id not an integer', async () => {
    const mes = await service.getUserData('9A');
    expect(mes).toBe("Invalid ID format");
  });

  it('should return success massage if data updated correctly', async () => {
    const mes = await service.changeUserData('66','Alice','Cruz');

    expect(mes).toBeDefined();
    expect(mes).toBe('User data for Alice Cruz has been successfully updated.');
  });

  it('should return success massage if password updated correctly', async () => {
    const mes = await service.changeUserPassword('66','Alice123');

    expect(mes).toBeDefined();
    expect(mes).toBe('Password has been successfully updated.');
  });
  it('should return Invalid ID format if id not an integer', async () => {
    const mes = await service.changeUserPassword('9A','Alice');
    expect(mes).toBe("Invalid ID format");
  });

  //Checking Password
  it('should return true  if password is correct', async () => {
    const mes = await service.checkUserPassword('66','Alice123');

    expect(mes).toBe(true);
  });
  it('should return false if password is incorrect', async () => {
    const mes = await service.checkUserPassword('66','Alice');

    expect(mes).toBeDefined();
    expect(mes).toBe(false);
  });
  it('should return (User not found) if id doee not exist', async () => {
    const mes = await service.checkUserPassword('90','Alice');
    expect(mes).toBe('User not found');
  });
  it('should return Invalid ID format if id not an integer', async () => {
    const mes = await service.checkUserPassword('9A','Alice');
    expect(mes).toBe("Invalid ID format");
  });
  
  
  

  
});
