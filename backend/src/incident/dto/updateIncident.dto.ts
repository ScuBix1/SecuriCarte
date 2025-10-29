import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateIncidentDto {
  @IsNotEmpty()
  id: number;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  location?: { lat: number; lng: number };

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  date?: Date;
}
