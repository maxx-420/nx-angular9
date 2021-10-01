import { Component } from '@angular/core';
import { lib1 } from 'dist/libs/';

@Component({
  selector: 'nx-angular9-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'mfe1';
  lib1 = lib1
}
