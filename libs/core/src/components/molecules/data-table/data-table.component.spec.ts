// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableComponent } from './data-table.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Pipe, SimpleChange } from '@angular/core';
import { SymphonyDatePipe } from '../../../pipe/symphony-date.pipe';
import { RenderLabelPipe } from '../../../pipe/render-label/render-label.pipe';
import * as moment from 'moment';
import { SelectionModel } from '@angular/cdk/collections';

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

const mockTableData = [
  {
    upsShipmentNo: '4966297',
    referenceNo: '0083633874',
    reason: null,
    cancelledDate: '2020-09-21 16:26:33.06',
  },
  {
    upsShipmentNo: '4966297',
    referenceNo: '0083633874',
    reason: null,
    cancelledDate: '2020-09-21 16:26:33.06',
  },
  {
    upsShipmentNo: '4969226',
    referenceNo: '0083634438',
    reason: null,
    cancelledDate: '2020-09-21 16:26:18.893',
  },
];

const mockTableColumnInfo = {
  upsShipmentNo: {
    displayLabel: 'lbl_shipment_upsShipmentNumber',
    transformLabel: true,
  },
  carrier: {
    displayLabel: 'lbl_hld_dashboard_carrierService',
    transformLabel: true,
  },
  status: {
    displayLabel: 'lbl_shipment_milestoneStatus',
    transformLabel: true,
  },
};

const pageSizePerViewport = { desktop: 6, mobile: 12, tablet: 12 };

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DataTableComponent,
        MatPaginator,
        MatSort,
        mockPipe({ name: 'content' }),
        mockPipe({ name: 'dateFormatter' }),
      ],
      imports: [MatPaginatorModule],
      providers: [
        {
          provide: SymphonyDatePipe,
          useClass: mockPipe({ name: 'dateFormatter' }),
        },
        {
          provide: RenderLabelPipe,
          useClass: mockPipe({ name: 'content' }),
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
  });
  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should call onRowSelection', () => {
    spyOn(component, 'onRowSelection').and.callThrough();
    const data = {};
    component.onRowSelection(data);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('should assert that ngOnChanges works as expected', () => {
    let newData = [
      ...mockTableData,
      {
        upsShipmentNo: '12',
        referenceNo: '123123',
        reason: null,
        cancelledDate: '2020-09-21 16:26:18.893',
      },
    ];
    component.tableData = newData;
    component.ngOnChanges({
      tableData: new SimpleChange(mockTableData, newData, false),
    });
    expect(component.dataSource.data).toEqual(newData);
  });

  it('should call selectPartialRows', () => {
    component.columnInfo = {
      shipmentNumber: { type: 'number' },
      select: {
        selection: new SelectionModel<any>(true, []),
      },
    };
    component.partialSelection = {
      warehouseCode: ['all'],
      batchNumber: ['all'],
    };
    component.showAllSelected = true;
    spyOn(component, 'selectPartialRows').and.callThrough();
    component.selectPartialRows();
    component.partialSelection = {
      warehouseCode: ['abc'],
      batchNumber: ['def'],
    };
    component.selectPartialRows();
    component.filterPredicate = true;
    component.partialSelection = undefined;
    component.extraTitle = 'AWESOME';
    component.ngOnInit();

    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('should test ngAfterViewInit', () => {
    component.viewportMinWidthToShowScroll = '1200';
    spyOn(component, 'matchViewPort').and.returnValue(true);
    component.ngAfterContentInit();
    expect(component.isTableScrollable).toBe(true);
  });
  it('test formatTableDate', () => {
    let result = component.formatTableDate('nodate', {});
    expect(result).toEqual({});
    result = component.formatTableDate('date', moment());
    expect(result).not.toBe(moment());
  });
  it('should test sortingDataAccessor', () => {
    let data = {
      shipmentNumber: 10,
      date: moment(),
      dimension: { length: 10 },
      size: { size: 20 },
      weight: { weight: 100 },
    };
    component.columnInfo = {
      shipmentNumber: { type: 'number' },
      date: { type: 'date' },
      dimension: { type: 'dimension' },
      size: { type: 'dataSize' },
      weight: { type: 'weight' },
    };
    let res = component.sortingDataAccessor(data, 'shipmentNumber');
    expect(res).toBe(10);
    res = component.sortingDataAccessor(data, 'date');
    expect(res).toBe(moment().format('X'));
    res = component.sortingDataAccessor(data, 'dimension');
    expect(res).toBe(10);
    res = component.sortingDataAccessor(data, 'size');
    expect(res).toBe(20);
    res = component.sortingDataAccessor(data, 'weight');
    expect(res).toBe(100);
  });
  it('should call initViewportVariables when window resize happens', () => {
    let spy = spyOn(component, 'initViewportVariables');
    window.resizeTo(330, 300);
    window.dispatchEvent(new Event('orientationchange'));
    expect(spy).toHaveBeenCalled();
  });
  it('should test setPageSizePerViewport and set the value of paginatorPageSize', () => {
    component.pageSizePerViewport = pageSizePerViewport;
    component.setPageSizePerViewport();
    expect(component.paginatorPageSize).toBe(12);
  });
  it('should test getTableHeaderCaption', () => {
    component.tableHeaderCaption = 'shipment (1-20)';
    expect(component.getTableHeaderCaption()).toBe('shipment 1to20');
    component.tableHeaderCaption = null;
    expect(component.getTableHeaderCaption()).toBe('');
  });

  it('should set filter to datasource when filterValue passed from parent changes', () => {
    component.filterValue = 'abc';
    component.ngOnChanges({
      filterValue: new SimpleChange('', 'abc', false),
    });
    expect(component.dataSource.filter).toBe('abc');
  });

  it('should call applyDefaultSorting', () => {
    spyOn(component, 'applyDefaultSorting').and.callThrough();
    fixture.detectChanges();
    component.applyDefaultSorting({ defaultSortingColumn: 'outboundVolume' });
    expect(component).toBeTruthy();
  });

  it('should assert mat-paginator works as expected', () => {
    component.pageSizePerViewport = { mobile: 2, tablet: 3, desktop: 5 };
    component.tableData = mockTableData;
    component.filterValue = '';
    component.defaultSortingColumn = 'outboundVolume';
    fixture.detectChanges();
    let newData = [
      ...mockTableData,
      {
        upsShipmentNo: '12',
        referenceNo: '123123',
        reason: null,
        cancelledDate: '2020-09-21 16:26:18.893',
      },
    ];
    component.ngOnChanges({
      tableData: new SimpleChange(mockTableData, newData, false),
    });
    component.ngAfterContentInit();
    expect(component.matPaginator).toBeDefined();
    expect(component.matSort).toBeDefined();
  });

  it('should transform columnInfo labels with content pipe', () => {
    component.columnInfo = mockTableColumnInfo;
    fixture.detectChanges();
    Object.keys(component.columnInfo).forEach((key) => {
      expect(component.columnInfo[key].transformLabel).toBeFalsy();
    });
  });

  it('should call exportTableAsExcel', () => {
    component.exportTableAsExcel();
    expect(component.excelXml).not.toBeUndefined();
  });
});
