/* 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MultiCheckboxFilterComponent} from './multi-select-checkbox-filter.component';
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

describe('MultiCheckboxFilterComponent', () => {
  let component: MultiCheckboxFilterComponent;
  let fixture: ComponentFixture<MultiCheckboxFilterComponent>;
  let filterConfiguration = {
    key: 'claims',
    label: 'lbl_shipment_l2_filterLabel_claims',
    options: ['With Claims', 'Without Claims'],
    filterType: 'multi-select-checkbox',
    errorMessage: '',
    defaultValue: [],
    defaultStartDate: null,
    defaultEndDate: null,
    minDateRange: null,
    maxDateRangeDiff: null,
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
      declarations: [MultiCheckboxFilterComponent, mockPipe({name: 'content'})],
      providers: [RenderLabelPipe],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiCheckboxFilterComponent);
    component = fixture.componentInstance;
    component.filterConfiguration = filterConfiguration;
    component.filterForm = filterForm;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check one option', () => {
    let spy = spyOn(component, 'updateSelectedValue').and.callThrough();
    component.listChange();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should update claims form when filter chip is changed', () => {
    let spy = spyOn(component, 'listChange').and.callThrough();
    component.filterForm.patchValue({
      filterValue: ['With Claims'],
    });
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
