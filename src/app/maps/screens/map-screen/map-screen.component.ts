import { Component, inject } from '@angular/core';
import { PlacesService } from '@services/places.service';
import { LoadingComponent } from '../../components/loading/loading.component';
import { CommonModule } from '@angular/common';
import { MapViewComponent } from "../../components/map-view/map-view.component";

@Component({
  standalone: true,
  imports: [
    CommonModule,
    LoadingComponent,
    MapViewComponent
],
  selector: 'app-map-screen',
  templateUrl: './map-screen.component.html',
  styleUrl: './map-screen.component.css'
})
export class MapScreenComponent {

  private placesSrv = inject(PlacesService);

  get isUserLocationReady(): boolean {
    return this.placesSrv.isUserLocationReady;
  }

}
