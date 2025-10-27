export class CreateIncidentDto {
  type: string;
  location: { lat: number; lng: number };
  description: string;
  date: Date;
}
