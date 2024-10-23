import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import Mapboxgl from 'mapbox-gl';
import { environment } from './environments/environment';
Mapboxgl.accessToken = environment.MAPBOX_API_KEY;

if(!navigator.geolocation) {
  alert('Geolocation is not supported by your browser');
  throw new Error('Geolocation is not supported by your browser');
}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
