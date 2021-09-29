// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ButtonComponent } from '../../atoms/button/button.component';
import { FilterComponent } from './filter.component';
import { Pipe, SimpleChange } from '@angular/core';
import { FILTER_CONFIGURATIONS } from '../../../global-config/config';

let dateFilterOptions = FILTER_CONFIGURATIONS.dateFilterOptions.map((elem) => ({
  value: elem.value,
  label: elem.viewValue,
  isCmsLabel: true,
}));

let filtersConfiguration = [
  {
    key: 'createdOn',
    label: 'lbl_filter_CreatedOn',
    options: dateFilterOptions,
    filterType: 'dateRange',
    errorMessage: '',
    defaultValue: 7,
    defaultStartDate: null,
    defaultEndDate: null,
    minDateRange: 90,
    maxDateRangeDiff: 59,
    showSelection: true,
    clearSelection: false,
    allowFutureDates: false,
  },
];

let selectedFilterItems = {
  createdOn: {
    value: -1,
    startDate: '2021/01/01',
    endDate: '2021/01/22',
  },
};

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

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;
  let buttonFixture: ComponentFixture<ButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FilterComponent,
        ButtonComponent,
        mockPipe({ name: 'content' }),
      ],
      providers: [FormBuilder],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    buttonFixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    component.filtersConfiguration = filtersConfiguration;
    component.selectedFilterItems = selectedFilterItems;
    component.ngOnChanges({
      openFilterPanel: new SimpleChange(undefined, false, false),
      filtersConfiguration: new SimpleChange(
        undefined,
        filtersConfiguration,
        false
      ),
    });
    fixture.detectChanges();
    buttonFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update after onChanges', () => {
    const selectedFilterItems = {
      createdOn: {
        value: 14,
        startDate: null,
        endDate: null,
      },
    };
    component.selectedFilterItems = selectedFilterItems;
    component.ngOnChanges({
      openFilterPanel: new SimpleChange(undefined, false, false),
      filtersConfiguration: new SimpleChange(
        undefined,
        filtersConfiguration,
        false
      ),
    });
    fixture.detectChanges();
    expect(component).toBeDefined();
  });

  it('should open filter component on clicking filter button', () => {
    let button = fixture.debugElement.nativeElement.querySelector(
      '.filters-cta'
    );
    let filter = fixture.debugElement.nativeElement.querySelector(
      '.filters-wrapper'
    );
    expect(filter).toBeNull();
    button.click();
    fixture.detectChanges();
    filter = fixture.debugElement.nativeElement.querySelector(
      '.filters-wrapper'
    );
    expect(filter).toBeDefined();
  });

  it('should reset all filters', () => {
    let spy = spyOn(component, 'resetFilters').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelector(
      '.filters-cta'
    );
    button.click();
    fixture.detectChanges();
    let clearAllButton = fixture.debugElement.nativeElement.querySelector(
      '.link-button-sm'
    );
    clearAllButton.click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should reset first filters', () => {
    let spy = spyOn(component, 'resetFilters').and.callThrough();
    component.resetFilters(new MouseEvent('click'), 0);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should apply filter and close filter component', () => {
    let button = fixture.debugElement.nativeElement.querySelector(
      '.filters-cta'
    );
    button.click();
    fixture.detectChanges();
    let applybutton = fixture.debugElement.nativeElement.querySelector(
      '.filters-footer button'
    );
    let filter = fixture.debugElement.nativeElement.querySelector(
      '.filters-wrapper'
    );
    expect(filter).toBeDefined();
    applybutton.click();
    fixture.detectChanges();
    filter = fixture.debugElement.nativeElement.querySelector(
      '.filters-wrapper'
    );
    expect(filter).toBeNull();
  });
});
