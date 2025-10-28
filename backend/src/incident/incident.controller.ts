import { Body, Controller, Post, Req } from '@nestjs/common';
import { type AuthenticatedRequest } from 'src/common/types/authenticated-request';
import { CreateIncidentDto } from './dto/createIncident.dto';
import { IncidentService } from './incident.service';

@Controller('incident')
export class IncidentController {
  constructor(private readonly incidentService: IncidentService) {}

  @Post()
  async createIncident(
    @Body() dto: CreateIncidentDto,
    @Req() req: AuthenticatedRequest,
  ) {
    console.log(req);
    const userId = req.user.id;

    return this.incidentService.createIncident(dto, userId);
  }
}
