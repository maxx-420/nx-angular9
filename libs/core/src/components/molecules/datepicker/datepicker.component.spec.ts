// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerComponent } from './datepicker.component';

describe('DatepickerComponent', () => {
  let component: DatepickerComponent;
  let fixture: ComponentFixture<DatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DatepickerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit datePickerFocused', () => {
    let spy = spyOn(component.datePickerFocused, 'emit')
    component.datePickerOpened();
    expect(spy).toHaveBeenCalled();
  });

  it('should emit setTodaysDate and emit datePickerFocused only once', () => {
    let spy = spyOn(component.setTodaysDate, 'emit')
    let spy2 = spyOn(component.datePickerFocused, 'emit')
    component.trackButtonClick('controlName');
    component.datePickerOpened();

    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalledTimes(1);
  });
});
