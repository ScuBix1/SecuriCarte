import { AfterViewInit, Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import maplibregl, { LngLatBounds, Map as MapLibreMap, Marker } from 'maplibre-gl';
import { Incident } from '../../../models/incident.model';
import { AuthService } from '../../../services/auth.service';
import { IncidentService } from '../../../services/incident.service';
import { IncidentDialog } from '../../common/incident-dialog/incident-dialog';
import { IncidentModal } from '../../common/incident-modal/incident-modal';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.html',
  styleUrl: './maps.scss',
  imports: [MatButton],
})
export class Maps implements AfterViewInit {
  map!: MapLibreMap;
  isReporting = false;
  markers = new Map<number, Marker>();

  constructor(
    private dialog: MatDialog,
    private incidentService: IncidentService,
    private authService: AuthService
  ) {}

  private getMapStyle(): string {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    return isDark
      ? 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json'
      : 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';
  }

  ngAfterViewInit(): void {
    const center = new maplibregl.LngLat(4.8357, 45.762);
    const radiusMeters = 6000;

    const bounds = LngLatBounds.fromLngLat(center, radiusMeters);

    this.map = new maplibregl.Map({
      container: 'map',
      style: this.getMapStyle(),
      center,
      zoom: 12,
      minZoom: 12,
      maxBounds: bounds,
    });

    this.loadMarkers();

    this.map.on('click', (e) => {
      if (!this.isReporting) return;

      const dialogRef = this.dialog.open(IncidentModal, {
        width: '420px',
        disableClose: true,
        data: {
          lat: e.lngLat.lat,
          lng: e.lngLat.lng,
        },
      });

      dialogRef.afterClosed().subscribe((incident) => {
        if (incident) {
          this.addMarker(incident);
        }
        this.isReporting = false;
      });
    });

    this.incidentService.markerDeleted$.subscribe((id) => {
      this.deleteMarkerById(id);
    });
  }

  startReporting() {
    this.isReporting = true;
  }

  addMarker(incident: Incident) {
    let loc: { lat: number; lng: number };

    if (typeof incident.location === 'string') {
      try {
        loc = JSON.parse(incident.location);
      } catch {
        console.warn('Coordonnées invalides', incident.location);
        return;
      }
    } else {
      loc = incident.location;
    }

    const color =
      {
        physique: 'red',
        verbale: 'orange',
        sexuelle: 'purple',
      }[incident.type] ?? 'blue';

    const marker = new Marker({ color })
      .setLngLat([Number(loc.lng), Number(loc.lat)])
      .addTo(this.map);

    marker.getElement().addEventListener('click', () => {
      this.openIncident(incident);
    });

    this.markers.set(Number(incident.id), marker);
  }

  loadMarkers() {
    this.incidentService.getAllIncidents().subscribe((incidents: any) => {
      incidents.forEach((incident: Incident) => {
        let loc: { lat: number; lng: number };

        if (typeof incident.location === 'string') {
          try {
            loc = JSON.parse(incident.location) as { lat: number; lng: number };
          } catch {
            return;
          }
        } else {
          loc = incident.location;
        }

        if (loc.lat == null || loc.lng == null) return;

        const color =
          {
            physique: 'red',
            verbale: 'orange',
            sexuelle: 'purple',
          }[incident.type] ?? 'blue';

        const marker = new Marker({ color })
          .setLngLat([Number(loc.lng), Number(loc.lat)])
          .addTo(this.map);

        marker.getElement().addEventListener('click', () => {
          this.openIncident(incident);
        });

        this.markers.set(Number(incident.id), marker);
      });
    });
  }

  deleteMarkerById(id: number) {
    const marker = this.markers.get(Number(id));

    if (!marker) return;

    marker.remove();
    this.markers.delete(Number(id));
  }

  openIncident(incident: Incident) {
    const dialogRef = this.dialog.open(IncidentDialog, {
      width: '420px',
      data: {
        incident,
        isOwner: true, //condition pour vérifier l'utilisateur a ajouter
      },
    });

    dialogRef.afterClosed().subscribe((result: Incident) => {
      if (!result) return;
    });
  }

  logout() {
    this.authService.logout();
  }
}
