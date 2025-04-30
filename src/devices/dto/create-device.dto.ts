import { Type } from 'class-transformer';
// In create-device.dto.ts
import { IsInt, IsString, IsDate, IsBoolean, IsOptional, IsNumber, IsArray } from 'class-validator';

export class CreateDeviceDto {
    @IsInt()
    type_id: number;
    
    @IsInt()
    state_type_id: number;
    
    @IsOptional()
    @IsInt()
    user_id?: number;
    
    @IsString()
    mac_address: string;
    
    @IsString()
    software_version: string;
    
    @IsDate()
    date_of_service: Date;
    
    @IsBoolean()
    comm_state: boolean;
    
    @IsOptional()
    @IsBoolean()
    connection_state?: boolean;
    @IsOptional()
    @IsOptional()
    @IsArray()
    img_url?: string[];
    @IsInt()
    battery_capacity: number;
    
    @IsOptional()
    @IsNumber()
    price?: number;
    @IsOptional()
    @IsInt()
    temperature?: number;
}