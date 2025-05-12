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

type EmergencyContact = {
  label: string;
  number: string;
};

@Injectable()
export class AppelService {
  constructor(private readonly prisma: PrismaService) {}

  // Function to get the helper phone number
  async getUserPhoneNumber(userId: string): Promise<string | null> {
    try {
      const helperUser = await this.prisma.helper_user.findFirst({
        where: { user_id: parseInt(userId, 10) },
        select: { helper_id: true },
      });

      if (!helperUser) {
        console.error('Helper user not found for user_id:', userId);
        return null;
      }
      if (helperUser?.helper_id == null) {
        console.error('helper_id is null');
        return null;
      }
      const helper = await this.prisma.user.findUnique({
        where: { id: helperUser.helper_id },
        select: { phone_number: true },
      });

      if (!helper) {
        console.error('Helper not found with id:', helperUser.helper_id);
        return null;
      }

      return helper.phone_number;
    } catch (error) {
      console.error('Error in getUserPhoneNumber:', error);
      return null;
    }
  }

  // Function to get list of emergency contacts
  async getListEmergencyContacts(): Promise<EmergencyContact[] | null> {
    try {
      const contacts = await this.prisma.emergency_contact.findMany({
        select: {
          label: true,
          number: true,
        },
      });

      return contacts.map(c => ({
        label: c.label ?? '',
        number: c.number ?? '',
      }));
    } catch (error) {
      console.error('Error fetching emergency contacts:', error);
      return null;
    }
  }
}
