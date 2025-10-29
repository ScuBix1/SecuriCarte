import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateIncidentDto } from './dto/createIncident.dto';
import { UpdateIncidentDto } from './dto/updateIncident.dto';
import { Incident } from './incident.entity';

@Injectable()
export class IncidentService {
  constructor(
    @InjectRepository(Incident)
    private readonly incidentRepository: Repository<Incident>,
  ) {}

  async getIncidentById(id: number) {
    return this.incidentRepository.findOneBy({ id });
  }

  async createIncident(dto: CreateIncidentDto, userId: string) {
    const incident = this.incidentRepository.create({
      ...dto,
      location: JSON.stringify(dto.location),
      user_id: userId,
    });

    return await this.incidentRepository.save(incident);
  }

  async updateIncidentData(
    id: number,
    dto: UpdateIncidentDto,
  ): Promise<Incident | null> {
    const incident = await this.incidentRepository.findOne({ where: { id } });
    if (!incident) return null;

    Object.assign(incident, dto);
    if (dto.location) {
      incident.location = JSON.stringify(dto.location);
    }

    return await this.incidentRepository.save(incident);
  }
}
