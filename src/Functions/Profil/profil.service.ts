/* eslint-disable prettier/prettier */
 
 
/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

type ProfilData = {
  fullName: string;
};
type ProfilError= {
  error: string;
};
@Injectable()
export class ProfilService {
  constructor(private readonly prisma: PrismaService) {}

  // Function to get User informations
  async getUserData(userId: string): Promise<ProfilData | ProfilError | null> {
    try {
      if (!/^\d+$/.test(userId)) {
        return{ error: 'Invalid ID format'};
      }
      const data = await this.prisma.user.findUnique({
        where: { id: parseInt(userId, 10) },
        select: { family_name: true, first_name: true },
      });

      if (!data) {
        console.error('Data user not found for user_id:', userId);
        return null;
      }
    
      // Return structured JSON response
      return {
        fullName: `${data.first_name} ${data.family_name}`.trim()
      };
    } catch (error) {
      console.error('Error in getUserData:', error);
      return null;
    }
  }
  // Function to Change User informations
  async changeUserData(userId: string, first: string, last: string): Promise<string | null> {
    try {
      if (!/^\d+$/.test(userId)) {
        return 'Invalid ID format';
      }
      const updatedUser = await this.prisma.user.update({
        where: {
          id: parseInt(userId, 10), 
        },
        data: {
          first_name: first,
          family_name: last,
        },
      });
  
      // Return a message confirming the update
      return `User data for ${updatedUser.first_name} ${updatedUser.family_name} has been successfully updated.`;
    } catch (error) {
      console.error('Error updating user data:', error);
      return null; 
    }
  }
  // Function to Change User password
  async changeUserPassword(userId: string, pwd: string): Promise<string | null> {
    try {
      if (!/^\d+$/.test(userId)) {
        return 'Invalid ID format';
      }
       await this.prisma.user.update({
        where: {
          id: parseInt(userId, 10), 
        },
        data: {
          password: pwd,
        },
      });
  
      // Return a message confirming the update
      return `Password has been successfully updated.`;
    } catch (error) {
      console.error('Error updating user password:', error);
      return null; 
    }
  }
  // Function to Check the User password
  async checkUserPassword(userId: string, pwd: string): Promise< null| string> {
    try {
      if (!/^\d+$/.test(userId)) {
        return 'Invalid ID format';
      }
      const user = await this.prisma.user.findUnique({
        where: {
          id: parseInt(userId, 10),
        },
      });
  
      if (!user) {
        return 'User not found';
      }
      if(user.password === pwd) {return "true"}
      else{ return "false"}
    } catch (error) {
      console.error('Error checking user password:', error);
      return null;
    }
  }
  
}
