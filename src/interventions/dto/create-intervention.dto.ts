export class CreateInterventionDto {
  device_id?: number;
  maintenancier_id: number;
  scheduled_date: Date;
  completion_date?: Date;
  description?: string;
  status?: string = 'pending';
  type?: 'technique' | 'Non_technique';
  title?: string;
  location?: string;
}