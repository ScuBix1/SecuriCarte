import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface CreateIncidentDto {
  type: string;
  description: string;
  location: {
    lat: number;
    lng: number;
  };
  date: string;
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
}
