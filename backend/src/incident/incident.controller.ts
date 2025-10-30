import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { type AuthenticatedRequest } from '../common/types/authenticated-request';
import { CreateIncidentDto } from './dto/createIncident.dto';
import { DeleteIncidentDto } from './dto/deleteIncident.dto';
import { UpdateIncidentDto } from './dto/updateIncident.dto';
import { IncidentService } from './incident.service';
import * as errors from './messages/errors.json';

@Controller('incident')
export class IncidentController {
  constructor(private readonly incidentService: IncidentService) {}

  @Get('all')
  async getAllIncidents() {
    return this.incidentService.getAllIncidents();
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getUserIncidents(@Req() req: AuthenticatedRequest) {
    const userId = req.user.id;

    return this.incidentService.getUserIncidents(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createIncident(
    @Body() dto: CreateIncidentDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.id;

    return this.incidentService.createIncident(dto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateIncident(
    @Body() dto: UpdateIncidentDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.id;
    const incident = await this.incidentService.getIncidentById(dto.id);

    if (!incident) throw new NotFoundException(errors.INCIDENT_NOT_FOUND);
    if (incident.user_id !== userId)
      throw new ForbiddenException(errors.INCIDENT_FORBIDDEN);

    return this.incidentService.updateIncidentData(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteIncident(
    @Body() dto: DeleteIncidentDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.id;
    const incident = await this.incidentService.getIncidentById(dto.id);

    if (!incident) throw new NotFoundException(errors.INCIDENT_NOT_FOUND);
    if (incident.user_id !== userId)
      throw new ForbiddenException(errors.INCIDENT_FORBIDDEN);

    return this.incidentService.deleteIncident(incident.id);
  }
}
