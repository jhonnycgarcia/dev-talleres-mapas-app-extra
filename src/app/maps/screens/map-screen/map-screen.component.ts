import { Component, inject } from '@angular/core';
import { PlacesService } from '@services/places.service';
import { LoadingComponent } from '../../components/loading/loading.component';
import { CommonModule } from '@angular/common';
import { MapViewComponent } from "../../components/map-view/map-view.component";
import { AngularLogoComponent } from "../../components/angular-logo/angular-logo.component";
import { BtnMyLocationComponent } from '../../components/btn-my-location/btn-my-location.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    LoadingComponent,
    MapViewComponent,
    AngularLogoComponent,
    BtnMyLocationComponent,
    SearchBarComponent,
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
