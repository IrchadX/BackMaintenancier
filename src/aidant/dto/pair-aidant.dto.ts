import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class PairAidantDto {
  @IsNumber()
  user_id: number;

  @IsNotEmpty()
  @IsString()
  aidant_identifier: string;
}
