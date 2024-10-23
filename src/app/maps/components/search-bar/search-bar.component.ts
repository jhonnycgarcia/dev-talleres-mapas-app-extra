import { Component } from '@angular/core';
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

  onQueryChange(query: string = ''): void {
    if(this.debounceTimer){ clearTimeout(this.debounceTimer); }
    this.debounceTimer = setTimeout(() => {
      console.log('query', query);
    }, 350);
  }

}
