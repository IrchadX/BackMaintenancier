
import { Type } from 'class-transformer';
export class UpdateAlertDto {
    type?: string;
    @Type(() => Date)
    time: Date;
    @Type(() => Date)
    date: Date;
    zone?: string;
    status?: string;
    device_id?: number;
    level?: 'mod_r_' | 'critique' | 'mineur';
  }