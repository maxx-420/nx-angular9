/* 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY */
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RenderLabelPipe } from '../../../pipe/render-label/render-label.pipe';

import { LateDeliveryChartDrillDownComponent } from './late-delivery-chart-drilldown.component';

describe('LateDeliveryChartDrillDownComponent', () => {
  let component: LateDeliveryChartDrillDownComponent;
  let fixture: ComponentFixture<LateDeliveryChartDrillDownComponent>;
  let parentFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LateDeliveryChartDrillDownComponent,
        TestHostComponent,
        RenderLabelPipe,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LateDeliveryChartDrillDownComponent);
    component = fixture.componentInstance;
    parentFixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    parentFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  @Component({
    template: `<lib-late-delivery-chart-drilldown
      [chartData]="chartData"
      [label]="label"
    ></lib-late-delivery-chart-drilldown>`,
  })
  class TestHostComponent {
    chartData = {
      dataArr: [
        {
          name: 'test',
          count: 0,
        },
      ],
    };
    label = ['test'];
  }
});
