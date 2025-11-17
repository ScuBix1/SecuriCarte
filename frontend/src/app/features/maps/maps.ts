import { AfterViewInit, Component } from '@angular/core';
import { Map } from 'maplibre-gl';

@Component({
  selector: 'app-maps',
  imports: [],
  templateUrl: './maps.html',
  styleUrl: './maps.scss',
})
export class Maps implements AfterViewInit {
  ngAfterViewInit(): void {
    const map = new Map({
      container: 'map',
      style: 'https://tiles.stadiamaps.com/styles/osm_bright.json',
      center: [4.8357, 45.764],
      zoom: 12,
    });
  }
}
