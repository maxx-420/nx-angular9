// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelledShipmentComponent } from './cancelled-shipment.component';
import { RenderLabelPipe } from 'libs/core/src/pipe/render-label/render-label.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { Pipe } from '@angular/core';
import { SymphonyDatePipe } from 'libs/core/src/pipe/symphony-date.pipe';
import { AccessControlUtility } from './../../../utils/access-control.util';

function mockPipe(options: Pipe): Pipe {
  const metadata: Pipe = {
    name: options.name,
  };

  return <any>Pipe(metadata)(
    class MockPipe {
      transform() { }
    }
  );
}

describe('CancelledShipmentComponent', () => {
  let component: CancelledShipmentComponent;
  let fixture: ComponentFixture<CancelledShipmentComponent>;
  const tableData = [
    {
      upsShipmentNo: '74018344',
      referenceNo: '74018346',
      reason: 'Order Canceled',
      cancelledDate: '2020-05-27T12:00:31.4Z',
    },
    {
      upsShipmentNo: '66018334',
      referenceNo: '64324775',
      reason: 'Order Canceled',
      cancelledDate: '2020-05-27T12:00:31.4Z',
    },
  ];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CancelledShipmentComponent, mockPipe({ name: 'content' })],
      imports: [RouterTestingModule],
      providers: [RenderLabelPipe, SymphonyDatePipe],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelledShipmentComponent);
    TestBed.inject(RenderLabelPipe);
    component = fixture.componentInstance;
    component.cancelledShipmentList = tableData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create for isPostSalesCustomer to be true', () => {
    spyOn(AccessControlUtility, 'isPostSalesCustomer').and.returnValue(true);
    spyOn(AccessControlUtility, 'hasComponentAccess').and.returnValue(false);
    fixture.detectChanges();
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should call getClickedRowData', () => {
    spyOn(component, 'getClickedRowData').and.callThrough();
    const data = { upsShipmentNo: '74018344' };
    component.getClickedRowData(data);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should emit cancelledShipmentHeaderClickEvent', () => {
    const spy = spyOn(component.cancelledShipmentHeaderClickEvent, 'emit');
    component.onCancelledShipmentsHeaderClick();
    expect(spy).toHaveBeenCalledWith(true);
  });
});
