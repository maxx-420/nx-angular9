// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';

import { PopoverDirective } from './popover.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  template: ` <a [libPopoverDirective]="popoverTemplate">
    <ng-template #popoverTemplate>
      <span class="hello">Hello</span>
    </ng-template></a
  >`,
})
class PopoverDirectiveTestComponent {}

describe('PopoverDirective', () => {
  let component: PopoverDirectiveTestComponent;
  let fixture: ComponentFixture<PopoverDirectiveTestComponent>;
  let inputEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopoverDirectiveTestComponent, PopoverDirective],
      imports: [MatDialogModule, BrowserAnimationsModule],
    }).compileComponents();
    fixture = TestBed.createComponent(PopoverDirectiveTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    inputEl = fixture.debugElement.query(By.css('a'));
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('opening and closing popover', () => {
    inputEl.nativeElement.dispatchEvent(new MouseEvent('mouseenter', null));
    fixture.detectChanges();
    expect(document.querySelector('.hello')).toBeTruthy();
    inputEl.nativeElement.dispatchEvent(new MouseEvent('mouseleave', null));
    fixture.detectChanges();
    expect(document.querySelector('.hello')).toBeFalsy();
  });
});
