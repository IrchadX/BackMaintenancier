import { IsDate, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateInterventionDto {
    @IsOptional()
    @IsNumber()
    device_id?: number;
    
    @IsOptional()
    @IsNumber()
    maintenancier_id?: number;
    
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    scheduled_date?: Date;
    
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    completion_date?: Date;
    
    @IsOptional()
    @IsString()
    description?: string;
    
    @IsOptional()
    @IsString()
    status?: string;
    
    @IsOptional()
    @IsEnum(['technique', 'Non_technique'])
    type?: 'technique' | 'Non_technique';
     @IsOptional()
    @IsString()
    title?: string;  
    
    @IsOptional()
    @IsString()
    location?: string;
}