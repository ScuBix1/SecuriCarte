import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Incident } from './incident.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Incident])],
})
export class IncidentModule {}
