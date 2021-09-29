// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import {
  AfterViewInit,
  Component,
  QueryList,
  ViewChildren,
} from '@angular/core';

import { TemplateSelectorDirective } from '../../../directives/template-selector.directive';
import { TemplateSelectorService } from '../../../service/template-selector-service/template-selector.service';

@Component({
  selector: 'lib-cell-templates',
  templateUrl: './cell-templates.component.html',
})
export class CellTemplatesComponent implements AfterViewInit {
  // Using the TemplateSelectorDirective to get all templateRefs and corresponding names
  // to store in map in TemplateSelectorService.
  @ViewChildren(TemplateSelectorDirective) templateRefs: QueryList<TemplateSelectorDirective>;

  constructor(private readonly service: TemplateSelectorService) { }

  /**
   * ngAfterViewInit lifecycle method
   */
  ngAfterViewInit() {
    // If you want to add any new template, just add ng-template with [libTemplateSelector]="'name'" in html and
    // inject TemplateSelectorService wherever the template needs to be used
    this.templateRefs.forEach((templateRef) => {
      this.service.templates.set(templateRef.name, templateRef.template);
    });
  }
}
