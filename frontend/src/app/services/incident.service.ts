import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
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
  private readonly API_URL = environment.apiUrl;
  private markerDeletedSource = new Subject<number>();
  public markerDeleted$ = this.markerDeletedSource.asObservable();

  public constructor(private http: HttpClient) {}

  public createIncident(dto: CreateIncidentDto): Observable<CreateIncidentDto> {
    return this.http.post<CreateIncidentDto>(`${this.API_URL}/incident`, dto, {
      withCredentials: true,
    });
  }

  public getAllIncidents(): Observable<Incident[]> {
    return this.http.get<Incident[]>(`${this.API_URL}/incident/all`, {
      withCredentials: true,
    });
  }

  public updateIncident(dto: UpdateIncident): Observable<UpdateIncident> {
    return this.http.patch<UpdateIncident>(`${this.API_URL}/incident`, dto, {
      withCredentials: true,
    });
  }

  public deleteIncident(dto: DeleteIncidentDto): Observable<DeleteIncidentDto> {
    return this.http.delete<DeleteIncidentDto>(`${this.API_URL}/incident`, {
      body: dto,
      withCredentials: true,
    });
  }

  public notifyMarkerDeleted(id: number) {
    this.markerDeletedSource.next(id);
  }
}
