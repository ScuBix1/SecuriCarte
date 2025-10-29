import { Injectable } from '@nestjs/common';
import { CreateIncidentDto } from './dto/createIncident.dto';

@Injectable()
export class IncidentService {
  async createIncident(dto: CreateIncidentDto, userId: string) {
    console.log('dto ====>', dto, 'userId ======>', userId);
  }
}
