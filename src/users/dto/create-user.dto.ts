<<<<<<< HEAD
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  family_name?: string;

  @IsOptional()
  @IsString()
  first_name?: string;

  @IsOptional()
  @IsString()
  phone_number?: string;

  @IsString()
  password: string;

  @IsOptional()
  userTypeId?: number;
}
=======
/* eslint-disable @typescript-eslint/no-unsafe-call */
// src/users/dto/create-user.dto.ts
import { IsDateString, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  firstName?: string;

  @IsOptional()
  @IsString()
  familyName?: string;

  @IsOptional()
  @IsString()
  email?: string;
  //testets
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsDateString()
  @IsOptional()
  birthDate?: string;

  @IsString()
  @IsOptional()
  sex?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  street?: string;
  @IsOptional()
  userTypeId?: number;
}
>>>>>>> dina
