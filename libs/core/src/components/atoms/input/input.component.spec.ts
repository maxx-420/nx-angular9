// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';
import { SimpleChange } from '@angular/core';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test onChanges', () => {
    component.ngOnChanges({
      placeholderText: new SimpleChange('text', 'new text', false),
    });
    expect(component.placeholderText).toBe('new text');
    component.placeholderText = 'text';
    component.ngOnChanges({
      text: new SimpleChange('text', 'new text', false),
    });
    expect(component.placeholderText).toBe('text');
  });
});
