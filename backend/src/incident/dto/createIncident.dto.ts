import { IsDateString, IsNotEmpty, IsObject } from 'class-validator';
import * as errors from '../messages/errors.json';

export class CreateIncidentDto {
  @IsNotEmpty({ message: errors.INCIDENT_TYPE_REQUIRED })
  type: string;

  @IsNotEmpty({ message: errors.INCIDENT_LOCATION_REQUIRED })
  @IsObject()
  location: { lat: number; lng: number };

  @IsNotEmpty({ message: errors.INCIDENT_DESCRIPTION_REQUIRED })
  description: string;

  @IsNotEmpty({ message: errors.INCIDENT_DATE_REQUIRED })
  @IsDateString()
  date: string;
}
