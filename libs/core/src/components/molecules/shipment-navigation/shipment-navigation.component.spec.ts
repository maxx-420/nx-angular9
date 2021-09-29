// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentNavigationComponent } from './shipment-navigation.component';
import { Component, SimpleChange } from '@angular/core';

@Component({
  template: `<lib-shipment-navigation
    [shipmentDetail]="shipmentDetail"
    [shipmentList]="shipmentList"
  ></lib-shipment-navigation>`,
})
class TestHostComponent {
  public shipmentDetail: any;
  public shipmentList: any;
}

describe('ShipmentNavigationComponent', () => {
  let component: ShipmentNavigationComponent;
  let fixture: ComponentFixture<ShipmentNavigationComponent>;

  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShipmentNavigationComponent, TestHostComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentNavigationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;

    hostComponent.shipmentDetail = {
      data: {},
    };
    hostComponent.shipmentList = {
      data: [],
    };

    hostFixture.detectChanges();

    expect(hostComponent).toBeTruthy();
  });

  it('should navigate to', () => {
    component.shipmentDetail = {
      data: {},
    };
    (component.shipmentList = [
      {
        shipmentNo: '123',
      },
      {
        shipmentNo: '234',
      },
      {
        shipmentNo: '345',
      },
    ]),
      (component.index = 0);

    const spied = spyOn(component.navigateTo, 'emit');
    component.navigate(true);
    expect(spied).toHaveBeenCalledWith('234');
  });

  it('navigate should emit an event with shipmentNo 123 when toNext is not passed', () => {
    component.shipmentList = [
      {
        shipmentNo: '123',
      },
      {
        shipmentNo: '234',
      },
      {
        shipmentNo: '345',
      },
    ];
    component.index = 1;
    const spy = spyOn(component.navigateTo, 'emit');
    component.navigate();
    expect(spy).toHaveBeenCalledWith('123');
  });

  it('processNextPrevious', () => {
    component.shipmentDetail = { data: { shipmentNo: '234' } };
    component.shipmentList = [
      {
        shipmentNo: null,
      },
      {
        shipmentNo: '234',
      },
      {
        shipmentNo: '345',
      },
    ];
    component.ngOnChanges({
      shipmentDetail: new SimpleChange(null, { data: {} }, false),
      shipmentList: new SimpleChange(
        null,
        [
          {
            shipmentNo: null,
          },
          {
            shipmentNo: '234',
          },
          {
            shipmentNo: '345',
          },
        ],
        false
      ),
    });

    expect(component.isInShipmentListing).toBe(true);

    component.shipmentDetail = null;
    component.ngOnChanges({
      shipmentDetail: new SimpleChange(null, { data: {} }, false),
      shipmentList: new SimpleChange(
        null,
        [
          {
            shipmentNo: null,
          },
          {
            shipmentNo: '234',
          },
          {
            shipmentNo: '345',
          },
        ],
        false
      ),
    });

    expect(component.isInShipmentListing).toBe(false);
    expect(component.index).toBe(-1);
  });

  it('processNextPrevious for HLD Contract', () => {
    component.shipmentDetail = {
      data: {
        primaryDetail: {
          info: {
            upsTMSShipmentNumber: '234',
          },
        },
      },
    };
    component.shipmentList = [
      {
        upsShipmentNumber: null,
      },
      {
        upsShipmentNumber: '234',
      },
      {
        upsShipmentNumber: '345',
      },
    ];
    component.ngOnChanges({
      shipmentDetail: new SimpleChange(null, component.shipmentDetail, false),
      shipmentList: new SimpleChange(
        null,
        [
          {
            upsShipmentNumber: null,
          },
          {
            upsShipmentNumber: '234',
          },
          {
            upsShipmentNumber: '345',
          },
        ],
        false
      ),
    });

    expect(component.isInShipmentListing).toBe(true);
  });

  it('processNextPrevious for cancelled shipment list', () => {
    component.shipmentDetail = { data: { shipmentNo: '234' } };
    component.shipmentList = [
      {
        upsShipmentNo: null,
      },
      {
        upsShipmentNo: '234',
      },
      {
        upsShipmentNo: '345',
      },
    ];
    component.ngOnChanges({
      shipmentDetail: new SimpleChange(null, { data: {} }, false),
      shipmentList: new SimpleChange(
        null,
        [
          {
            shipmentNo: null,
          },
          {
            upsShipmentNo: '234',
          },
          {
            upsShipmentNo: '345',
          },
        ],
        false
      ),
    });

    expect(component.isInShipmentListing).toBe(true);

    component.shipmentDetail = null;
    component.ngOnChanges({
      shipmentDetail: new SimpleChange(null, { data: {} }, false),
      shipmentList: new SimpleChange(
        null,
        [
          {
            upsShipmentNo: null,
          },
          {
            upsShipmentNo: '234',
          },
          {
            upsShipmentNo: '345',
          },
        ],
        false
      ),
    });

    expect(component.isInShipmentListing).toBe(false);
    expect(component.index).toBe(-1);
  });
});
