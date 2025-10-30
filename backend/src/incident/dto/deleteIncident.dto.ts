import { IsNotEmpty } from 'class-validator';
import * as errors from '../messages/errors.json';

export class DeleteIncidentDto {
  @IsNotEmpty({ message: errors.REQUIRED })
  id: number;
}
