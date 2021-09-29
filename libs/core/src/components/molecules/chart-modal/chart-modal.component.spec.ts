// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RenderLabelPipe } from 'libs/core/src/pipe/render-label/render-label.pipe';
import { ChartModalComponent } from './chart-modal.component';
import { SimpleChanges, SimpleChange } from '@angular/core';

describe('ChartModalComponent', () => {
  let component: ChartModalComponent;
  let fixture: ComponentFixture<ChartModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChartModalComponent],
      providers: [RenderLabelPipe],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onPopUpClose', () => {
    spyOn(component, 'onPopUpClose').and.callThrough();
    fixture.detectChanges();
    component.onPopUpClose({});
    expect(component).toBeTruthy();
  });

  it('should call getTableHeader', () => {
    spyOn(component, 'getTableHeader').and.callThrough();
    fixture.detectChanges();
    component.getTableHeader();
    expect(component).toBeTruthy();
  });

  it('should call onRowSelection', () => {
    spyOn(component, 'onRowSelection').and.callThrough();
    fixture.detectChanges();
    component.getTableHeader();
    expect(component).toBeTruthy();
  });
  it('getTableHeader should calculate count', () => {
    component.isMultiColumnOrTableLayout = false;

    component.modalData = [{ count: '100' }, { count: '1000' }];
    component.attrToFetchData = ['', 'count'];
    component.modalTitle = 'XYZ - Test';
    let tableHeader = component.getTableHeader();
    expect(tableHeader).toEqual('XYZ (1100 Total)');

    component.modalData = null;
    tableHeader = component.getTableHeader();
    expect(tableHeader).toEqual('XYZ (0 Total)');
  });
  it('getTableHeader returns same title as tableTitle', () => {
    component.tableTitle = 'XYZ (7,123.25 Total)';
    const tableHeader = component.getTableHeader();
    expect(tableHeader).toEqual('XYZ (7,123.25 Total)');
  });
  it('getTableHeader returns undefined when showTableTitle is set to false', () => {
    component.showTableTitle = false;
    const tableHeader = component.getTableHeader();
    expect(tableHeader).toBeUndefined();
  });

  it('getTableHeader returns tabletitle when toggleType is provided', () => {
    spyOn(RenderLabelPipe.prototype, 'transform').and.returnValue('By xyz');
    component.modalTitle = 'Test';
    component.isMultiColumnOrTableLayout = true;
    const tableHeader = component.getTableHeader('xyz');
    expect(tableHeader).toEqual('Test By xyz');
  });
  it('should call getColumnData', () => {
    let data = [{ name: 'xyz', modes: [{ name: 'abcd', count: '10' }] }];
    let colData = component.getColumnData(data, 'xyz', 'abcd');
    expect(colData).toEqual('10');

    data = [{ name: 'xyz', modes: [{ name: 'efgh', count: '10' }] }];
    component.customLabelMapping = { efgh: 'abcd' };
    colData = component.getColumnData(data, 'xyz', 'abcd');
    expect(colData).toEqual('10');

    colData = component.getColumnData(data, 'x', 'abcd');
    expect(colData).toEqual(0);

    colData = component.getColumnData(data, 'xyz', 'a');
    expect(colData).toEqual(0);
  });

  it('should call ngOnChanges', () => {
    component.ngOnChanges(<SimpleChanges>{
      contentHtmlKey: new SimpleChange(undefined, '<p>xyz</p>', false),
    });
    expect(component.sanitizedHtml).toBeDefined();
  });
  it('onRowSelection should emit', () => {
    let returnVal = false;
    component.tableRowClicked.subscribe(() => (returnVal = true));
    component.isTableRowClickable = true;
    component.onRowSelection('20-Jul-2021', 0, { date: '20-Jul-2021' });
    expect(returnVal).toBeTrue();

    returnVal = false;
    component.onRowSelection('xyz', 0, { modes: 'xyz' });
    expect(returnVal).toBeTrue();
  });
  it('onColumnSelection should emit', () => {
    let returnVal = false;
    component.tableRowClicked.subscribe(() => (returnVal = true));
    component.isTableRowClickable = true;
    component.isTableColumnClickable = true;
    component.onColumnSelection('20-Jul-2021', 'xyz');
    expect(returnVal).toBeTrue();
  });
});
