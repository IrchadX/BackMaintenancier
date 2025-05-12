import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateAidantDto {
  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  family_name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @MinLength(6)
  confirmPassword: string;
}
