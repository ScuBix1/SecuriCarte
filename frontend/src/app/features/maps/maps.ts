import { AfterViewInit, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import maplibregl, { LngLatBounds, Map, Marker, Popup } from 'maplibre-gl';
import { IncidentDialog } from '../../common/incident-dialog/incident-dialog';
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

    console.log(this.map.getMaxBounds());

    this.loadMarkers();

    this.map.on('click', (e) => {
      if (!this.isReporting) return;

      const dialogRef = this.dialog.open(IncidentDialog, {
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

  addMarker(incident: {
    type: string;
    title: string;
    description: string;
    date: Date;
    location: string | { lat: number; lng: number };
  }) {
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

    const popup = new Popup({ closeOnClick: true }).setHTML(`
    <strong>${incident.title}</strong><br />
    ${incident.description}<br />
    <small>${new Date(incident.date).toLocaleDateString()}</small>
  `);

    new Marker({ color })
      .setLngLat([Number(loc.lng), Number(loc.lat)])
      .setPopup(popup)
      .addTo(this.map);
  }

  loadMarkers() {
    this.incidentService.getAllIncidents().subscribe((incidents: any) => {
      incidents.forEach(
        (incident: {
          type: string;
          title: string;
          description: string;
          date: Date;
          location: { lat: number; lng: number };
        }) => {
          let loc = incident.location;
          if (typeof loc === 'string') {
            try {
              loc = JSON.parse(loc);
            } catch {
              return;
            }
          }

          if (loc.lat == null || loc.lng == null) return;

          const color =
            {
              physique: 'red',
              verbale: 'orange',
              sexuelle: 'purple',
            }[incident.type] ?? 'blue';

          const popup = new Popup({ closeOnClick: true }).setHTML(`
        <strong>${incident.title}</strong><br />
        ${incident.description}<br />
        <small>${new Date(incident.date).toLocaleDateString()}</small>
      `);

          new Marker({ color })
            .setLngLat([Number(loc.lng), Number(loc.lat)])
            .setPopup(popup)
            .addTo(this.map);
        }
      );
    });
  }
}
