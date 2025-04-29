export class UpdateInterventionDto {
    device_id?: number;
    maintenancier_id?: number;
    scheduled_date?: Date;
    completion_date?: Date;
    description?: string;
    status?: string;
    type?: 'technique' | 'Non_technique';
  }