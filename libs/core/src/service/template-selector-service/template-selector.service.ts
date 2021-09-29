// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { Injectable, TemplateRef } from '@angular/core';

// This service is used as a store for common templates
@Injectable({
  providedIn: 'platform',
})
export class TemplateSelectorService {
  templates = new Map<string, TemplateRef<any>>();
}
