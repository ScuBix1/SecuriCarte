import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateIncident } from '../models/incident.model';

interface CreateIncidentDto {
  type: string;
  title: string;
  description: string;
  location: {
    lat: number;
    lng: number;
  };
  date: string;
}

interface DeleteIncidentDto {
  id: number;
}

@Injectable({ providedIn: 'root' })
export class IncidentService {
  private readonly API_URL = '/api';

  constructor(private http: HttpClient) {}

  createIncident(dto: CreateIncidentDto): Observable<any> {
    return this.http.post(`${this.API_URL}/incident`, dto);
  }

  getAllIncidents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/incident/all`);
  }

  updateIncident(dto: UpdateIncident): Observable<any> {
    return this.http.patch(`${this.API_URL}/incident`, dto);
  }

  deleteIncident(dto: DeleteIncidentDto): Observable<any> {
    return this.http.delete(`${this.API_URL}/incident`, {
      body: dto,
    });
  }
}
