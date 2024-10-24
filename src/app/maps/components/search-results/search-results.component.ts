import { Component, inject } from '@angular/core';
import { PlacesService } from '@services/places.service';
import { Feature } from '../../interfaces/places';
import { MapService } from '@services/map.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent {

  public selectedId?: string;

  private placesSrv = inject(PlacesService);
  private mapSrv = inject(MapService);

  get isLoadingPlaces(): boolean {
    return this.placesSrv.isLoadingPlaces;
  }

  get places(): Feature[] {
    return this.placesSrv.places;
  }

  flyTo(place: Feature): void {
    this.selectedId = place.id;
    const [ lng, lat ] = place.geometry.coordinates;
    this.mapSrv.flyTo([lng, lat]);
  }

  getDirections(place: Feature): void {
    if(!this.placesSrv.userLocation){ throw new Error('User location is not ready'); }
    const start = this.placesSrv.userLocation;
    const end = place.geometry.coordinates as [number, number];
    this.mapSrv.getRouteBetweenPoints(start, end);

    this.placesSrv.deletePlaces();
  }

}
