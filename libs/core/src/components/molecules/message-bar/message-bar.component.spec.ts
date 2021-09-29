// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageBarComponent } from './message-bar.component';
import { SimpleChange } from '@angular/core';

describe('MessageBarComponent', () => {
  let component: MessageBarComponent;
  let fixture: ComponentFixture<MessageBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessageBarComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call closeMessageBar', () => {
    spyOn(component, 'closeMessageBar').and.callThrough();
    fixture.detectChanges();
    component.closeMessageBar();
    expect(component).toBeTruthy();
  });

  it('should call ngOnChanges', () => {
    spyOn(component, 'ngOnChanges').and.callThrough();
    fixture.detectChanges();
    component.ngOnChanges({
      isMessageBarVisible: new SimpleChange([], [true], false),
    });
    expect(component).toBeTruthy();
  });

  it('should call ngOnChanges', () => {
    let spy1 = spyOn(window, 'setTimeout').and.callThrough();
    let spy2 = spyOn(window, 'clearTimeout');

    component.ngOnChanges({
      isMessageBarVisible: new SimpleChange(false, true, false),
    });
    expect(component.timer).not.toBeNull();
    component.ngOnChanges({
      isMessageBarVisible: new SimpleChange(false, true, false),
    });
    expect(spy2).toHaveBeenCalled();
    expect(spy1).toHaveBeenCalled();
  });
});
