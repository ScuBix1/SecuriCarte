import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Incident, UpdateIncident } from '../models/incident.model';

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
  private markerDeletedSource = new Subject<number>();
  markerDeleted$ = this.markerDeletedSource.asObservable();

  constructor(private http: HttpClient) {}

  createIncident(dto: CreateIncidentDto): Observable<CreateIncidentDto> {
    return this.http.post<CreateIncidentDto>(`${this.API_URL}/incident`, dto);
  }

  getAllIncidents(): Observable<Incident[]> {
    return this.http.get<Incident[]>(`${this.API_URL}/incident/all`);
  }

  updateIncident(dto: UpdateIncident): Observable<UpdateIncident> {
    return this.http.patch<UpdateIncident>(`${this.API_URL}/incident`, dto);
  }

  deleteIncident(dto: DeleteIncidentDto): Observable<DeleteIncidentDto> {
    return this.http.delete<DeleteIncidentDto>(`${this.API_URL}/incident`, {
      body: dto,
    });
  }

  notifyMarkerDeleted(id: number) {
    this.markerDeletedSource.next(id);
  }
}
