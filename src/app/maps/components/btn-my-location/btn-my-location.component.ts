import { Component, inject } from '@angular/core';
import { MapService } from '@services/map.service';
import { PlacesService } from '@services/places.service';

@Component({
  selector: 'app-btn-my-location',
  standalone: true,
  imports: [],
  templateUrl: './btn-my-location.component.html',
  styles: `
    button {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 999;
    }
  `
})
export class BtnMyLocationComponent {

  private placesSrv = inject(PlacesService);
  private mapSrv = inject(MapService);

  goToMyLocation(): void {
    if(!this.placesSrv.isUserLocationReady){ throw new Error('User location is not ready'); }
    if(!this.mapSrv.isMapReady){ throw new Error('Map is not ready'); }
    this.mapSrv.flyTo(this.placesSrv.userLocation!);
  }

}
