import { Component } from '@angular/core';

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

  goToMyLocation(): void {
    console.log('go to my location');
  }

}
