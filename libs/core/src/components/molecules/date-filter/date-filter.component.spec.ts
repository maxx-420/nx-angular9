/* 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DateFilterComponent} from './date-filter.component';
import {FormGroup, FormControl} from '@angular/forms';
import {Pipe} from '@angular/core';
import {RenderLabelPipe} from '../../../pipe/render-label/render-label.pipe';
import {FILTER_CONFIGURATIONS} from '../../../global-config/config';

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

describe('DateFilterComponent', () => {
  let component: DateFilterComponent;
  let fixture: ComponentFixture<DateFilterComponent>;
  let filterConfiguration = {
    key: 'createdOn',
    label: 'lbl_filter_CreatedOn',
    options: FILTER_CONFIGURATIONS.dateFilterOptions.map((elem) => ({
      value: elem.value,
      label: elem.viewValue,
      isCmsLabel: true,
    })),
    filterType: 'dateRange',
    errorMessage: '',
    defaultValue: 7,
    defaultStartDate: null,
    defaultEndDate: null,
    minDateRange: 90,
    maxDateRangeDiff: 59,
    showSelection: true,
    clearSelection: false,
    allowFutureDates: false
  };

  let filterForm = new FormGroup({
    filterValue: new FormControl(null),
    startDate: new FormControl(null),
    endDate: new FormControl(null),
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DateFilterComponent, mockPipe({name: 'content'})],
      providers: [RenderLabelPipe],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateFilterComponent);
    component = fixture.componentInstance;
    component.filterConfiguration = filterConfiguration;
    component.filterForm = filterForm;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update start and end date formcontrols when custom date is selected', () => {
    component.filterForm.patchValue({
      startDate: new Date(),
      endDate: new Date(),
    });
    component.setLimits(true);
    component.setLimits(false);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
