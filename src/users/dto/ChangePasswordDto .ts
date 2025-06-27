import { IsNumber, IsString } from 'class-validator';

export class ChangePasswordDto {
@IsNumber()
  userId: number;
  @IsString()
  currentPassword: string;
  @IsString()
  newPassword: string;
  @IsString()
  confirmNewPassword: string;
}
