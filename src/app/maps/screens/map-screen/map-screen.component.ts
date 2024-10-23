import { Component, inject } from '@angular/core';
import { PlacesService } from '@services/places.service';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-map-screen',
  templateUrl: './map-screen.component.html',
  styleUrl: './map-screen.component.css'
})
export class MapScreenComponent {

  private placesSrv = inject(PlacesService);

}
