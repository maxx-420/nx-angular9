// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { Directive, Input, TemplateRef } from '@angular/core';

// This directive is used to map a templateRef with a name, so we can get the templateRef by name.
@Directive({
  selector: '[libTemplateSelector]',
})
export class TemplateSelectorDirective {
  @Input('libTemplateSelector') name: string;
  constructor(public template: TemplateRef<any>) {}
}
