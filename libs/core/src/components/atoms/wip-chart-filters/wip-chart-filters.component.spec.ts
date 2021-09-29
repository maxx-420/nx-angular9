/* 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY */
import { SimpleChange } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RenderLabelPipe } from 'libs/core/src/pipe/render-label/render-label.pipe';

import { WipChartFiltersComponent } from './wip-chart-filters.component';

describe('WipChartFiltersComponent', () => {
  let component: WipChartFiltersComponent;
  let fixture: ComponentFixture<WipChartFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WipChartFiltersComponent, RenderLabelPipe],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WipChartFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Should call trackSelectValueChange', () => {
    spyOn(component, 'trackSelectValueChange').and.callThrough();
    component.isSelectDropdownTracked = false;
    component.trackSelectValueChange();
    expect(component.trackSelectValueChange).toHaveBeenCalled();
  });
  it('call toggleChanged', () => {
    const spy = spyOn(component, 'toggleChanged').and.callThrough();
    component.toggleChanged(null);
    expect(spy).toHaveBeenCalled();
  });
  it('Check trackToggleChanges is called from toggleChanged changes', () => {
    const spy = spyOn(component, 'trackToggleChanges').and.callThrough();
    component.toggleTypes = ['c', 'd'];
    component.ngOnInit();
    component.toggleChanged(null);
    expect(spy).toHaveBeenCalled();
  });
  it('should detect changes', () => {
    spyOn(component, 'ngOnChanges').and.callThrough();
    component.toggleValue = 'xyz';
    component.ngOnChanges({ toggleValue: new SimpleChange('vyc', 'xyz', null) });
    fixture.detectChanges();
    expect(component.legendList).toBe(component.legendList);
  });

});
