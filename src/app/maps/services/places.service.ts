import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Feature, PlacesResponse } from '../interfaces/places';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation?: [number, number];
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  constructor(
    private http: HttpClient
  ) {
    this.getUserLocation();
  }

  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  public async getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation = [coords.longitude, coords.latitude];
          resolve(this.userLocation);
        },
        (error) => {
          alert('Error getting user location');
          console.log(error);
          reject(error);
        }
      );
    });
  }

  getPlacesByQuery(query: string = '') {

    this.isLoadingPlaces = true;
    const params = new HttpParams()
      .set('q', query)
      .set('country', 'co')
      .set('proximity', this.userLocation!.join(','))
      .set('language', 'es')
      .set('access_token', environment.MAPBOX_API_KEY);

    const url = `https://api.mapbox.com/search/geocode/v6/forward`;

    this.http.get<PlacesResponse>(url, { params })
      .subscribe((res) => {
        this.isLoadingPlaces = false;
        this.places = res.features;
      });
  }

}
