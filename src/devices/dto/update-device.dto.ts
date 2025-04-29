
import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
export class UpdateDeviceDto {
    type_id?: number;
    state_type_id?: number;
    user_id?: number;
    mac_address?: string;
    software_version?: string;
    
    comm_state?: boolean;
    connection_state?: boolean;
    battery_capacity?: number;
    price?: number;
    @IsOptional()
    @IsString()
    image_url?: string;
        @Type(() => Date)
        date_of_service: Date;
  }