import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapsModule } from './maps/maps.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MapsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mapas-app';
}
