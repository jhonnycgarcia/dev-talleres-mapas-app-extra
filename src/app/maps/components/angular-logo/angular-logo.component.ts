import { Component } from '@angular/core';

@Component({
  selector: 'app-angular-logo',
  standalone: true,
  imports: [],
  templateUrl: './angular-logo.component.html',
  styles: `
    img {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 999;
    }
  `
})
export class AngularLogoComponent {
  /** https://gist.github.com/Klerith/772f616ac0c6f24aaee08082fcba7342 */

}
