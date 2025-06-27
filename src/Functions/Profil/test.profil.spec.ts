/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
 
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
 
 
 
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { ProfilService } from './profil.service';

const prismaMock = {
  user: {
    findUnique: jest.fn(),
    update: jest.fn(),
  },
} ;

describe('ProfilService', () => {
  let service: ProfilService;

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfilService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<ProfilService>(ProfilService);
  });
  describe('getUserData', () => {
    it('should return name from database', async () => {
      const name = 'Tom Tom';
  
      prismaMock.user.findUnique.mockResolvedValueOnce({first_name:'Tom',family_name:'Tom'});
  
      const result = await service.getUserData('66');
      expect(result).toEqual(name);
    });
  
    it('should return null and log error when first query fails', async () => {
      const mockError = new Error('Database error');
      console.error = jest.fn();
  
      prismaMock.user.findUnique.mockRejectedValueOnce(mockError);
  
      const result = await service.getUserData('90');
      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalledWith('Error in getUserData:', mockError);
    });
  
    it('should return null if id does not exist in database', async () => {
      console.error = jest.fn();
      prismaMock.user.findUnique.mockRejectedValueOnce(null);
  
      const result = await service.getUserData('6');
      expect(result).toBeNull();
    });
    it('should return (Invaid Id Format) if id  not integer', async () => {

      const result = await service.getUserData('9A');
      expect(result).toBe("Invalid ID format")
    });
  });
  
  describe('changeUserData', () => {
    it('should return succesful name update message ', async () => {
      const mes = 'User data for Tom Tom has been successfully updated.';
  
      prismaMock.user.update.mockResolvedValueOnce({
        first_name: 'Tom',
        family_name: 'Tom',
      });
  
      const result = await service.changeUserData('66','Tom','Tom');
      expect(result).toEqual(mes);
    });
  
    it('should return null and log error when updating fails', async () => {
      const mockError = new Error('Database error');
      console.error = jest.fn();
  
      prismaMock.user.update.mockRejectedValueOnce(mockError);
  
      const result = await service.changeUserData('90','','');
      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalledWith('Error updating user data:', mockError);
    });
    it('should return (Invaid Id Format) if id  not integer', async () => {

      const result = await service.changeUserData('9A','','');
      expect(result).toBe("Invalid ID format")
    });
  
  });
  
  describe('changeUserPassword', () => {
    it('should return succesful password update message ', async () => {
      const mes = 'Password has been successfully updated.';
  
      prismaMock.user.update.mockResolvedValueOnce({
        mes: 'Password has been successfully updated.',
      });
  
      const result = await service.changeUserPassword('66','Tom123');
      expect(result).toEqual(mes);
    });
  
    it('should return null and log error when updating fails', async () => {
      const mockError = new Error('Database error');
      console.error = jest.fn();
  
      prismaMock.user.update.mockRejectedValueOnce(mockError);
  
      const result = await service.changeUserPassword('90','');
      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalledWith('Error updating user password:', mockError);
    });
    it('should return (Invaid Id Format) if id  not integer', async () => {

      const result = await service.changeUserPassword('9A','');
      expect(result).toBe("Invalid ID format")
    });

})
   
describe('checkUserPassword', () => {
  it('should return true if the password is correct ', async () => {

    const result = await service.checkUserPassword('66','Alice123');
    expect(result).toEqual(true);
  });

  it('should return false if password incorrect', async () => {
    const mockError = new Error('Database error');
    console.error = jest.fn();

    prismaMock.user.update.mockRejectedValueOnce(mockError);

    const result = await service.checkUserPassword('66','Alice');
    expect(result).toEqual(false);
  });
  it('should return (Invaid Id Format) if id  not integer', async () => {

    const result = await service.checkUserPassword('9A','');
    expect(result).toBe("Invalid ID format")
  });
  it('should return (User not found) if id not found', async () => {
    console.error = jest.fn();

    const result = await service.checkUserPassword('90','');
    expect(result).toBe('User not found');
  });
  
}
)});
