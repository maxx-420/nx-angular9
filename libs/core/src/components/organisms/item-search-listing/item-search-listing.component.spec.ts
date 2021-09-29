// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSearchListingComponent } from './item-search-listing.component';
import { RouterTestingModule } from '@angular/router/testing';
import { RenderLabelPipe } from '../../../pipe/render-label/render-label.pipe';
import NavigationUtility from './../../../utils/navigationUtil';

describe('ItemSearchListingComponent', () => {
  let component: ItemSearchListingComponent;
  let fixture: ComponentFixture<ItemSearchListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemSearchListingComponent, RenderLabelPipe],
      imports: [RouterTestingModule],
      providers: [RenderLabelPipe],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSearchListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getClickedRowData', () => {
    spyOn(component, 'getClickedRowData').and.callThrough();

    const data = {
      number: '0H-MECS070X1A',
      description: 'KIT CONNECT.PLANTWATCH-MODEM (PSTN/GSM)',
    };
    component.getClickedRowData(data);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should call getClickedRowData  with no value', () => {
    spyOn(component, 'getClickedRowData').and.callThrough();

    const data = {
      number: '0H-MECS070X1A',
      description: 'KIT CONNECT.PLANTWATCH-MODEM (PSTN/GSM)',
    };
    component.getClickedRowData(data);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should not display batch colums if showBatch is false', () => {
    const displayedColumns = ['number', 'description'];
    component.showBatch = false;
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.displayedColumnsForTable).toEqual(displayedColumns);
  });

  it('should display batch colums if showBatch is true', () => {
    const displayedColumns = [
      'batchNumber',
      'batchExpirationDate',
      'batchStatus',
      'number',
      'description',
    ];
    component.showBatch = true;
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.displayedColumnsForTable).toEqual(displayedColumns);
  });

  it('should create', () => {
    component.searchByItemArr = [
      {
        number: '0H-MECS070X1A',
        description: 'KIT CONNECT.PLANTWATCH-MODEM (PSTN/GSM)',
      },
    ];
    component.searchByItemArr.lenght == 1;
    expect(component.searchByItemArr.length).toBe(1);
  });

  it('getClickedRowData should not call navigate method when itemNumber is not found', () => {
    let spy = spyOn(NavigationUtility, 'navigate');
    component.getClickedRowData({ number: null });
    expect(spy).toHaveBeenCalledTimes(0);
  });
});
