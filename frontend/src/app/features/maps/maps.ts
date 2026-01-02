import { AfterViewInit, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import maplibregl, { LngLatBounds, Map, Marker } from 'maplibre-gl';
import { IncidentDialog } from '../../common/incident-dialog/incident-dialog';
import { IncidentModal } from '../../common/incident-modal/incident-modal';
import { Incident } from '../../models/incident.model';
import { IncidentService } from '../../services/incident.service';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.html',
  styleUrl: './maps.scss',
})
export class Maps implements AfterViewInit {
  map!: Map;
  isReporting = false;

  constructor(private dialog: MatDialog, private incidentService: IncidentService) {}

  ngAfterViewInit(): void {
    const center = new maplibregl.LngLat(4.8357, 45.762);
    const radiusMeters = 6000;

    const bounds = LngLatBounds.fromLngLat(center, radiusMeters);

    this.map = new Map({
      container: 'map',
      style: 'https://tiles.stadiamaps.com/styles/osm_bright.json',
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

    new Marker({ color })
      .setLngLat([Number(loc.lng), Number(loc.lat)])
      .addTo(this.map)
      .getElement()
      .addEventListener('click', () => {
        this.openIncident(incident);
      });
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

        new Marker({ color })
          .setLngLat([Number(loc.lng), Number(loc.lat)])
          .addTo(this.map)
          .getElement()
          .addEventListener('click', () => {
            this.openIncident(incident);
          });
      });
    });
  }

  openIncident(incident: Incident) {
    const dialogRef = this.dialog.open(IncidentDialog, {
      width: '420px',
      panelClass: 'incident-dialog-panel',
      data: {
        incident,
        isOwner: true, //condition pour vérifier l'utilisateur a ajouter
      },
    });

    dialogRef.afterClosed().subscribe((result: Incident) => {
      if (!result) return;
    });
  }
}
