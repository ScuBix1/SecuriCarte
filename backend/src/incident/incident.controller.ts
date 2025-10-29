import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { type AuthenticatedRequest } from 'src/common/types/authenticated-request';
import { CreateIncidentDto } from './dto/createIncident.dto';
import { IncidentService } from './incident.service';

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

  @Post('token')
  generateToken(@Body() payload: { id: string; email: string }): string {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  }
}
