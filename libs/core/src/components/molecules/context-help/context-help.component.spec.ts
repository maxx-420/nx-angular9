// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextHelpComponent } from './context-help.component';
import { RenderLabelPipe } from 'libs/core/src/pipe/render-label/render-label.pipe';
import { SimpleChange } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

describe('ContextHelpComponent', () => {
  let component: ContextHelpComponent;
  let fixture: ComponentFixture<ContextHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContextHelpComponent, RenderLabelPipe],
      providers: [RenderLabelPipe, {
        provide: DomSanitizer,
        useValue: {
          bypassSecurityTrustHtml: () => 'safeString',
          sanitize: () => 'safeString',
        }
      },],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onPopUpClose', () => {
    spyOn(component, 'onPopUpClose').and.callThrough();
    fixture.detectChanges();
    component.onPopUpClose({});
    expect(component).toBeTruthy();
  });

  it('should set sanitizedHtml value only when contentHtmlKey value has changed', () => {
    component.sanitizedHtml = 'abc';
    component.ngOnChanges({
      contentHtmlKey: new SimpleChange(null, null, false)
    });
    expect(component.sanitizedHtml).toBe('abc');

    component.ngOnChanges({
      contentHtmlKey: new SimpleChange(null, 'test', false)
    });
    expect(component.sanitizedHtml).toBe('safeString');

    component.sanitizedHtml = 'abc';
    component.ngOnChanges({
      test: new SimpleChange('test', null, false)
    });
    expect(component.sanitizedHtml).toBe('abc');

  });
});
