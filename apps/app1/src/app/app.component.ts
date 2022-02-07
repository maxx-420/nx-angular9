import { Component } from '@angular/core';
import { testLib1 } from '@nx-angular9/lib1';

@Component({
  selector: 'nx-angular9-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'app1';

  test = testLib1;
}
