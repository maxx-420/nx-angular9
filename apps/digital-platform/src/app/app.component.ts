import { Component } from '@angular/core';
import { sampleExport } from '@nx-angular9/lib1';
import { sampleExport as sampleExport2 } from '@nx-angular9/lib2';

@Component({
  selector: 'nx-angular9-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'digital-platform';

  lib1 = sampleExport;
  lib2 = sampleExport2;
}
