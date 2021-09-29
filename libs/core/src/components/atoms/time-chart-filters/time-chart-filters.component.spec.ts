/* 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RenderLabelPipe } from 'libs/core/src/pipe/render-label/render-label.pipe';

import { TimeChartFiltersComponent } from './time-chart-filters.component';

describe('TimeChartFiltersComponent', () => {
  let component: TimeChartFiltersComponent;
  let fixture: ComponentFixture<TimeChartFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TimeChartFiltersComponent, RenderLabelPipe],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeChartFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Should call trackDateFilterChange', () => {
    spyOn(component, 'trackDateFilterChange').and.callThrough();
    component.isDateFiltertracked = false;
    component.trackDateFilterChange();
    expect(component.trackDateFilterChange).toHaveBeenCalled();
  });
});
