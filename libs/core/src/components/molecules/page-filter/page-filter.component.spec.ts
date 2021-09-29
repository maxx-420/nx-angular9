import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RenderLabelPipe } from '../../../pipe/render-label/render-label.pipe';
import ViewportUtility from '../../../utils/viewport';
import { VIEWPORT_NAMES } from '../../../constants/viewport.constant';
import { PageFilterComponent } from './page-filter.component';
import { SessionStorageUtility } from '../../../utils/sessionStorage';
import { DEFAULT_SELECTED_DATE_RANGE } from '../../../global-config/config';
import DateUtility from '../../../utils/date';

const selectedDateRange = {
  dateRange: 7,
};
const selectedCustomDateRange = {
  startDate: '2020-09-22',
  endDate: '2020-10-21',
  dateRange: -1,
};

describe('PageFilterComponentWithCustomDate', () => {
  let component: PageFilterComponent;
  let fixture: ComponentFixture<PageFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [RenderLabelPipe, FormBuilder],
      declarations: [PageFilterComponent, RenderLabelPipe],
    }).compileComponents();
  }));

  beforeEach(() => {
    spyOn(SessionStorageUtility, 'get')
      .withArgs('selectedDateRange')
      .and.returnValue(selectedCustomDateRange);
    fixture = TestBed.createComponent(PageFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onApplyClick when chartFilter and apply button is tracked', () => {
    let spy = spyOn(SessionStorageUtility, 'set');
    let spy2 = spyOn(component, 'trackApplyButtonClick');
    component.isChartFilter = true;
    component.isPageFilter = false;
    component.isApplyButtonTracked = true;
    component.onApplyClick();
    expect(spy).not.toHaveBeenCalled();
    expect(spy2).not.toHaveBeenCalled();
    expect(component).toBeTruthy();
  });

  it('should call isMobile', () => {
    spyOn(ViewportUtility, 'checkViewport')
      .withArgs(VIEWPORT_NAMES.desktop)
      .and.returnValue(false)
      .withArgs(VIEWPORT_NAMES.mobile)
      .and.returnValue(true)
      .withArgs(VIEWPORT_NAMES.tablet)
      .and.returnValue(false);
    fixture = TestBed.createComponent(PageFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.isMobile).toEqual(true);
  });

  it('default filter form date range value', () => {
    component.filterForm.get('dateRange').setValue(-1);
    expect(component.filterForm.get('dateRange').value).toEqual(-1);
  });

  it('should call initFilters', () => {
    spyOn(DateUtility, 'getDateRange').and.returnValue({
      startDate: '2020-09-22',
      endDate: '2020-10-21',
    });
    component.isChartFilter = true;
    component.isPageFilter = false;
    component.initFilters();
    expect(component.filterForm.get('dateRange').value).toEqual(
      DEFAULT_SELECTED_DATE_RANGE
    );
    expect(component.filterForm.get('startDate').value).toEqual('2020-09-22');
    expect(component.filterForm.get('endDate').value).toEqual('2020-10-21');
    component.defaultRangeDays = 0;
    component.initFilters();
    expect(component.filterForm.get('dateRange').value).toEqual(0);
    expect(component.filterForm.get('startDate').value).toEqual('');
    expect(component.filterForm.get('endDate').value).toEqual('');
  });

  it('should test setCustomDateRange when filter is neither chart or page filter', () => {
    spyOn(DateUtility, 'getDateRange').and.returnValue({
      startDate: '2020-09-22',
      endDate: '2020-10-21',
    });
    component.isChartFilter = false;
    component.isPageFilter = false;
    component.setCustomDateRange();
    expect(component.filterForm.get('startDate').value).toEqual(new Date('2020-09-22').toISOString());
    expect(component.filterForm.get('endDate').value).toEqual(new Date('2020-10-21').toISOString());
  });

  it('should call ngAfterViewInit', () => {
    component.allowFutureDates = true;
    component.showNoDate = true;
    component.isChartFilter = true;
    component.ngAfterViewInit();
    expect(component.maxRangeDate).toBeTruthy();
    expect(component.dateFilterList).toBeTruthy();
    expect(component.selectBoxStyle['min-width']).toEqual('100px');
  });
});

describe('PageFilterComponentWithOutCustomDate', () => {
  let component: PageFilterComponent;
  let fixture: ComponentFixture<PageFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [RenderLabelPipe, FormBuilder],
      declarations: [PageFilterComponent, RenderLabelPipe],
    }).compileComponents();
  }));

  beforeEach(() => {
    spyOn(SessionStorageUtility, 'get')
      .withArgs('selectedDateRange')
      .and.returnValue(selectedDateRange);
    fixture = TestBed.createComponent(PageFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('default filter form date range value', () => {
    component.filterForm.get('dateRange').setValue(7);
    expect(component.filterForm.get('dateRange').value).toEqual(7);
  });
});

describe('PageFilterComponent', () => {
  let component: PageFilterComponent;
  let fixture: ComponentFixture<PageFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [RenderLabelPipe, FormBuilder],
      declarations: [PageFilterComponent, RenderLabelPipe],
    }).compileComponents();
    fixture = TestBed.createComponent(PageFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('Check trackApplyButtonClick is called from onApplyClick changes', () => {
    const spy = spyOn(component, 'trackApplyButtonClick').and.callThrough();
    component.onApplyClick();
    expect(spy).toHaveBeenCalled();
  });
});
