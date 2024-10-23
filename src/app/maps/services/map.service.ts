import { Injectable } from '@angular/core';
import { LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { Feature } from '../interfaces/places';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map?: Map;
  private markers: Marker[] = [];

  constructor() { }

  get isMapReady(): boolean {
    return !!this.map;
  }

  setMap(map: Map): void {
    this.map = map;
  }

  flyTo( coords: LngLatLike ): void {
    if(!this.isMapReady){ throw new Error('Map is not ready'); }
    this.map!.flyTo({
      center: coords,
      zoom: 14,
    });
  }

  createMarkerFromPlaces(places: Feature[], userLocation: [number, number]) {
    if(!this.isMapReady){ throw new Error('Map is not ready'); }

    this.markers.forEach(marker => marker.remove());

    const newMarkers = [];

    for (const place of places) {
      const [ lng, lat ] = place.geometry.coordinates;

      const popup = new Popup()
        .setHTML(`
          <h6>${place.properties.name}</h6>
          <span>${place.properties.full_address}</span>
        `);

      const newMarker = new Marker()
          .setLngLat([lng, lat])
          .setPopup(popup)
          .addTo(this.map!);

      newMarkers.push(newMarker);
    }

    this.markers = newMarkers;

    if(!places.length){ return; }

    // limites del mapa
    const bounds = new LngLatBounds();

    // añadir posicion del usuario
    bounds.extend(userLocation);

    for (const market of this.markers) {
      bounds.extend(market.getLngLat());
    }

    this.map?.fitBounds(bounds, {
      padding: 200
    });
  }

}
