import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Incident } from './incident.entity';
import { IncidentService } from './incident.service';

@Module({
  imports: [TypeOrmModule.forFeature([Incident])],
  providers: [IncidentService],
})
export class IncidentModule {}
