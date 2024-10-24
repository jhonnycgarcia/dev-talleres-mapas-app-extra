import { inject, Injectable } from '@angular/core';
import { AnySourceData, LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { Feature } from '../interfaces/places';
import { DirectionsApiClient } from '../api';
import { DirectionsResponse, Route } from '../interfaces/directions';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map?: Map;
  private markers: Marker[] = [];

  private directionSrv = inject(DirectionsApiClient);

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

  getRouteBetweenPoints(start: [number, number], end: [number, number]) {
    this.directionSrv.get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`)
      .subscribe((res) => {
        console.log('res', res);
        this.drawPolyline(res.routes[0]);
      });
  }

  drawPolyline( route: Route ): void {
    console.log({
      kms: route.distance / 1000,
      duration: route.duration / 60,
    });

    if(!this.map){ throw new Error('Map is not ready'); }

    const coords = route.geometry.coordinates;
    const start = coords[0] as [number, number];

    const bounds = new LngLatBounds();
    bounds.extend(start);

    for (const coord of coords) {
      bounds.extend(coord as [number, number]);
    }

    this.map?.fitBounds(bounds, { padding: 200 });

    // Polyline - LineString
    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords
            }
          }
        ]
      }
    };

    if(this.map?.getSource('RouteString')){
      this.map?.removeSource('RouteString');
      this.map?.removeLayer('RouteString');
    }

    this.map?.addSource('RouteString', sourceData);

    this.map?.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#ff41f8',
        'line-width': 8
      }
    });

  }

}
