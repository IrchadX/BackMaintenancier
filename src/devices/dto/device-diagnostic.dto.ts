import { IsInt, IsString, IsDate, IsBoolean, IsOptional, IsNumber, IsArray } from 'class-validator';


export class DeviceDiagnosticDto {
  batteryLevel: number;
  temperature: number;
  connectivity: string;
  signalStrength: string;
  img_url?: string[]; // Added img_url field
}