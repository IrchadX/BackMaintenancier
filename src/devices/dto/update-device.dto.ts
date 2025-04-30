import { Type } from 'class-transformer';
import { IsOptional, IsString, IsInt, IsBoolean, IsNumber, IsArray } from 'class-validator';

export class UpdateDeviceDto {
    @IsOptional()
    @IsInt()
    type_id?: number;
    
    @IsOptional()
    @IsInt()
    state_type_id?: number;
    
    @IsOptional()
    @IsInt()
    user_id?: number;
    
    @IsOptional()
    @IsString()
    mac_address?: string;
    
    @IsOptional()
    @IsString()
    software_version?: string;
    
    @IsOptional()
    @Type(() => Date)
    date_of_service?: Date;
    
    @IsOptional()
    @IsBoolean()
    comm_state?: boolean;
    
    @IsOptional()
    @IsBoolean()
    connection_state?: boolean;
    
    @IsOptional()
    @IsInt()
    battery_capacity?: number;
    
    @IsOptional()
    @IsNumber()
    price?: number;
    
    @IsOptional()
    @IsArray()
    img_url?: string[]; // Updated from image_url to img_url and make it array
    
    @IsOptional()
    @IsInt()
    temperature?: number; // Updated from string to number
}