import { Component, inject } from '@angular/core';

import { PlacesService } from '@services/places.service';

import { SearchResultsComponent } from '../search-results/search-results.component';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [ SearchResultsComponent ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  private debounceTimer?: NodeJS.Timeout;
  private placesSrv = inject(PlacesService);

  onQueryChange(query: string = ''): void {
    if(this.debounceTimer){ clearTimeout(this.debounceTimer); }
    this.debounceTimer = setTimeout(() => {
      this.placesSrv.getPlacesByQuery(query);
    }, 350);
  }

}
