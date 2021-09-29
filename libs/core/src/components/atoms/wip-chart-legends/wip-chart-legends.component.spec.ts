/* 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RenderLabelPipe } from 'libs/core/src/pipe/render-label/render-label.pipe';

import { WipChartLegendsComponent } from './wip-chart-legends.component';

describe('WipChartLegendsComponent', () => {
  let component: WipChartLegendsComponent;
  let fixture: ComponentFixture<WipChartLegendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WipChartLegendsComponent, RenderLabelPipe],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WipChartLegendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
