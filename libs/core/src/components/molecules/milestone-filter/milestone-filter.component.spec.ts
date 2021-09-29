/* 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MilestoneFilterComponent} from './milestone-filter.component';
import {FormGroup, FormControl} from '@angular/forms';
import {Pipe} from '@angular/core';
import {RenderLabelPipe} from '../../../pipe/render-label/render-label.pipe';

function mockPipe(options: Pipe): Pipe {
  const metadata: Pipe = {
    name: options.name,
  };

  return <any>Pipe(metadata)(
    class MockPipe {
      transform() {}
    }
  );
}

describe('MilestoneFilterComponent', () => {
  let component: MilestoneFilterComponent;
  let fixture: ComponentFixture<MilestoneFilterComponent>;
  let filterConfiguration = {
    key: 'milestone',
    label: 'lbl_shipment_milestone',
    options: ['Created', 'Booking', 'Departure', 'Customs', 'Delivery'],
    filterType: 'milestone',
    errorMessage: '',
    defaultValue: ['Created', 'Booking', 'Departure', 'Customs', 'Delivery'],
    defaultStartDate: null,
    defaultEndDate: null,
    minDateRange: 90,
    maxDateRangeDiff: 59,
    showSelection: false,
    clearSelection: false,
  };

  let filterForm = new FormGroup({
    filterValue: new FormControl(null),
    startDate: new FormControl(null),
    endDate: new FormControl(null),
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MilestoneFilterComponent, mockPipe({name: 'content'})],
      providers: [RenderLabelPipe],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MilestoneFilterComponent);
    component = fixture.componentInstance;
    component.filterConfiguration = filterConfiguration;
    component.filterForm = filterForm;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check all when all is checked', () => {
    let spy = spyOn(component, 'updateSelectedValue').and.callThrough();
    component.masterChange();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should check one option', () => {
    let spy = spyOn(component, 'updateSelectedValue').and.callThrough();
    component.listChange();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should update milestone form when filter chip is changed', () => {
    let spy = spyOn(component, 'listChange').and.callThrough();
    component.filterForm.patchValue({
      filterValue: ['Booking', 'Departure'],
    });
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should set masterCheck to true when all items in the checkbox list are checked', () => {
    component.filterForm.patchValue({filterValue: 'ALL'});
    fixture.detectChanges();
    expect(component.masterChecked).toBeTruthy();
  });

  it('should set viewValue to empty when showSelection is true', () => {
    component.filterConfiguration.showSelection = true;
    component.updateSelectedValue()
    fixture.detectChanges();
    expect(component.viewValue).toBe('');
  });
});
