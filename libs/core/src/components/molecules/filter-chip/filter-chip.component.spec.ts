// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { ChipComponent } from './../../atoms/chip/chip.component';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterChipComponent } from './filter-chip.component';
import { RenderLabelPipe } from '../../../pipe/render-label/render-label.pipe';
import { SimpleChange } from '@angular/core';
import { MULTI_SELECT_ALL } from './../../../constants/global.constant';

describe('FilterChipComponent', () => {
  let component: FilterChipComponent;
  let fixture: ComponentFixture<FilterChipComponent>;
  let chipFixture: ComponentFixture<ChipComponent>;
  let defaultFilters = {
    createdOn: {
      key: 'createdOn',
      label: 'lbl_shipments_filter_createdOn',
      value: 'Last 7 days',
      startDate: null,
      endDate: null,
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [RenderLabelPipe],
      declarations: [FilterChipComponent, RenderLabelPipe, ChipComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterChipComponent);
    chipFixture = TestBed.createComponent(ChipComponent);
    component = fixture.componentInstance;
    component.defaultFilters = defaultFilters;
    fixture.detectChanges();
    chipFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call clearAllFilters', () => {
    component.selectedFilters = [
      {
        key: 'createdOn',
        label: 'Created On',
        value: 'LAST 14 DAYS',
        startDate: '1/19/2021',
        endDate: '1/12/2021',
      },
    ];
    spyOn(component, 'clearAllFilters').and.callThrough();
    fixture.detectChanges();
    component.clearAllFilters();
    expect(component).toBeTruthy();
  });

  it('should call getRemovedItem', () => {
    const selectedFilter = [
      {
        key: 'scheduledDelivery',
        label: 'Scheduled Delivery',
        value: '12/17/2021-12/20/2021',
        startDate: '12/17/2021',
        endDate: '12/20/2021',
      },
    ];
    const removedItem = {
      label: 'Scheduled Delivery',
      value: '12/17/2021-12/20/2021',
      isDefault: false,
      filterKey: 'scheduledDelivery',
    };
    component.selectedFilters = selectedFilter;
    component.ngOnChanges({
      selectedFilters: new SimpleChange([], selectedFilter, false),
    });
    spyOn(component, 'getRemovedItem').and.callThrough();
    fixture.detectChanges();
    component.getRemovedItem(removedItem);
    expect(component).toBeTruthy();
  });

  it('should call with default selected filters', () => {
    const selectedFilter = [
      {
        key: 'createdOn',
        label: 'Created On',
        value: 'LAST 14 DAYS',
        startDate: '1/19/2021',
        endDate: '1/12/2021',
      },
      {
        key: 'scheduledDelivery',
        label: 'Scheduled Delivery',
        value: '12/17/2021-12/20/2021',
        startDate: '12/17/2021',
        endDate: '12/20/2021',
      },
    ];
    const removedItem = {
      label: 'Scheduled Delivery',
      value: '12/17/2021-12/20/2021',
      isDefault: false,
      filterKey: 'scheduledDelivery',
    };
    component.selectedFilters = selectedFilter;
    component.ngOnChanges({
      selectedFilters: new SimpleChange([], selectedFilter, false),
    });
    spyOn(component, 'getRemovedItem').and.callThrough();
    fixture.detectChanges();
    component.getRemovedItem(removedItem);
    expect(component).toBeTruthy();
  });

  it('should find if a filter is default', () => {
    component.defaultFilters = {
      warehouse: {
        key: 'warehouse',
        label: 'warehouse',
        value: MULTI_SELECT_ALL,
        startDate: null,
        endDate: null,
      },
    };
    fixture.detectChanges();
    chipFixture.detectChanges();
    const selectedFilter = [
      {
        key: 'warehouse',
        label: 'Warehouse',
        value: [MULTI_SELECT_ALL],
        startDate: null,
        endDate: null,
      },
    ];
    component.selectedFilters = selectedFilter;
    component.ngOnChanges({
      selectedFilters: new SimpleChange([], selectedFilter, false),
    });
    spyOn(component, 'isDefaultFilter').and.callThrough();
    fixture.detectChanges();
    expect(
      component.isDefaultFilter('warehouse', MULTI_SELECT_ALL)
    ).toBeTruthy();
  });

  it('should show clear a filter is default', () => {
    component.defaultFilters = {
      warehouse: {
        key: 'warehouse',
        label: 'warehouse',
        value: MULTI_SELECT_ALL,
        startDate: null,
        endDate: null,
      },
    };
    fixture.detectChanges();
    chipFixture.detectChanges();
    const selectedFilter = [
      {
        key: 'warehouse',
        label: 'Warehouse',
        value: ['123'],
        startDate: null,
        endDate: null,
      },
    ];
    component.selectedFilters = selectedFilter;
    component.ngOnChanges({
      selectedFilters: new SimpleChange([], selectedFilter, false),
    });
    spyOn(component, 'checkIfClearVisible').and.callThrough();
    fixture.detectChanges();
    component.checkIfClearVisible();
    expect(component.isClearVisible).toBeTruthy();
  });

  it('should make two child components', () => {
    const selectedFilter = [
      {
        key: 'createdOn',
        label: 'Created On',
        value: 'LAST 14 DAYS',
        startDate: '1/19/2021',
        endDate: '1/12/2021',
      },
      {
        key: 'scheduledDelivery',
        label: 'Scheduled Delivery',
        value: '12/17/2021-12/20/2021',
        startDate: '12/17/2021',
        endDate: '12/20/2021',
      },
    ];
    component.selectedFilters = selectedFilter;
    component.ngOnChanges({
      selectedFilters: new SimpleChange([], selectedFilter, false),
    });
    fixture.detectChanges();
    chipFixture.detectChanges();
    expect(component).toBeTruthy();
    let chips = fixture.debugElement.queryAll(By.css('.chip-value'));
    expect(chips.length).toBe(2);
    chips.forEach((chip, index) => {
      expect(chip.nativeElement.textContent).toContain(
        component.selectedFilters[index].value
      );
    });
  });
});
