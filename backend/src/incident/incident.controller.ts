import {
  Body,
  Controller,
  ForbiddenException,
  NotFoundException,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { type AuthenticatedRequest } from 'src/common/types/authenticated-request';
import { CreateIncidentDto } from './dto/createIncident.dto';
import { UpdateIncidentDto } from './dto/updateIncident.dto';
import { IncidentService } from './incident.service';
import * as errors from './messages/errors.json';

@Controller('incident')
export class IncidentController {
  constructor(private readonly incidentService: IncidentService) {}

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
    console.log(incident);

    if (!incident) throw new NotFoundException(errors.INCIDENT_NOT_FOUND);
    if (incident.user_id !== userId)
      throw new ForbiddenException(errors.INCIDENT_FORBIDDEN);

    return this.incidentService.updateIncidentData(dto.id, dto);
  }

  @Post('token')
  generateToken(@Body() payload: { id: string; email: string }): string {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  }
}
