/* 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RenderLabelPipe } from 'libs/core/src/pipe/render-label/render-label.pipe';

import { DonutChartLegendsComponent } from './donut-chart-legends.component';

describe('DonutChartLegendsComponent', () => {
  let component: DonutChartLegendsComponent;
  let fixture: ComponentFixture<DonutChartLegendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DonutChartLegendsComponent, RenderLabelPipe],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonutChartLegendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
