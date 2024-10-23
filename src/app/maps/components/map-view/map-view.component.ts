import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { PlacesService } from '@services/places.service';

import { Map, Popup, Marker } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"


@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [],
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css'
})
export class MapViewComponent implements AfterViewInit {

  private placesSrv = inject(PlacesService);

  @ViewChild('mapDiv')
  public mapDivElement!: ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {
    if(!this.placesSrv.userLocation){
      throw new Error('User location is not ready');
    }
    const map = new Map({
      container: this.mapDivElement.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.placesSrv.userLocation, // starting position [lng, lat]
      zoom: 14, // starting zoom
    });

    const popup = new Popup()
      .setHTML(`
        <h6>Aquí estoy</h6>
        <span>Estoy en este lugar del mundo</span>
      `);

    const marker = new Marker({ color: 'red' })
      .setLngLat(this.placesSrv.userLocation)
      .setPopup(popup)
      .addTo(map);
  }

}
