import { Component } from '@angular/core';
import { testLib1 } from '@nx-angular9/lib1';
import { testLib2 } from '@nx-angular9/lib2';

@Component({
  selector: 'nx-angular9-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'app3';
  test1 = testLib1;
  test2 = testLib2;
}
