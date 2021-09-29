// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { Component, DebugElement } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';

import { ModalDirective } from './modal.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  template: ` <a libModalDirective [modalTemplate]="modalTemplate">
    <ng-template #modalTemplate>
      <span class="hello">Hello</span>
    </ng-template></a
  >`,
})
class ModalDirectiveTestComponent {}

describe('ModalDirective', () => {
  let component: ModalDirectiveTestComponent;
  let fixture: ComponentFixture<ModalDirectiveTestComponent>;
  let inputEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalDirectiveTestComponent, ModalDirective],
      imports: [MatDialogModule, BrowserAnimationsModule],
    }).compileComponents();
    fixture = TestBed.createComponent(ModalDirectiveTestComponent);
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

  it('opening and closing modal', fakeAsync(() => {
    inputEl.nativeElement.dispatchEvent(new MouseEvent('click', null));
    fixture.detectChanges();
    expect(document.querySelector('.hello')).toBeTruthy();
    document
      .querySelector('.cdk-overlay-backdrop')
      .dispatchEvent(new MouseEvent('click', null));
    fixture.detectChanges();
    tick(1000);
    expect(document.querySelector('.hello')).toBeFalsy();
  }));
});
