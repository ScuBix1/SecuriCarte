import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import * as errors from '../messages/errors.json';

export class UpdateIncidentDto {
  @IsNotEmpty({ message: errors.REQUIRED })
  id: number;

  @IsOptional()
  @IsString({ message: errors.COMMON_FORMAT })
  type?: string;

  @IsOptional()
  location?: { lat: number; lng: number };

  @IsOptional()
  @IsString({ message: errors.COMMON_FORMAT })
  description?: string;

  @IsOptional()
  @IsDateString({}, { message: errors.DATE_FORMAT })
  date?: Date;
}
