import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateIncidentDto } from './dto/createIncident.dto';
import { UpdateIncidentDto } from './dto/updateIncident.dto';
import { Incident } from './incident.entity';
import * as incident from './messages/incident.json';

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

  async updateIncidentData(dto: UpdateIncidentDto): Promise<Incident | null> {
    const incident = await this.incidentRepository.findOne({
      where: { id: dto.id },
    });
    if (!incident) return null;

    Object.assign(incident, dto);
    if (dto.location) {
      incident.location = JSON.stringify(dto.location);
    }

    return await this.incidentRepository.save(incident);
  }

  async deleteIncident(id: number): Promise<{ message: string }> {
    await this.incidentRepository.delete(id);

    return { message: incident.deleted };
  }

  async getAllIncidents() {
    const incidents = await this.incidentRepository.find({
      order: { created_at: 'DESC' },
    });

    return incidents.map((incident) => ({
      id: incident.id,
      type: incident.type,
      location: JSON.parse(incident.location),
      title: incident.title,
      description: incident.description,
      date: incident.date,
      created_at: incident.created_at,
    }));
  }

  async getUserIncidents(userId: string) {
    const incidents = await this.incidentRepository.find({
      where: { user_id: userId },
      order: { created_at: 'DESC' },
    });

    return incidents.map((incident) => ({
      type: incident.type,
      location: JSON.parse(incident.location),
      description: incident.description,
      date: incident.date,
      created_at: incident.created_at,
    }));
  }
}
