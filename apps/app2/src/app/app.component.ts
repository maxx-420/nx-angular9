import { Component } from '@angular/core';
import { testLib2 } from '@nx-angular9/lib2';

@Component({
  selector: 'nx-angular9-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'app2';
  test = testLib2;
}
