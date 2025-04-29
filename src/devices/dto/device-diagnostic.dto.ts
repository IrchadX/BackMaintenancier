export class DeviceDiagnosticDto {
    batteryLevel: number;
    temperature: number;
    connectivity: string;
    signalStrength: string;
    status: 'ok' | 'warning' | 'error';
  }