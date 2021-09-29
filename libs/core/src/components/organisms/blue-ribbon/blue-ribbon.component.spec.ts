/* 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueRibbonComponent } from './blue-ribbon.component';

describe('BlueRibbonComponent', () => {
  let component: BlueRibbonComponent;
  let fixture: ComponentFixture<BlueRibbonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BlueRibbonComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlueRibbonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
