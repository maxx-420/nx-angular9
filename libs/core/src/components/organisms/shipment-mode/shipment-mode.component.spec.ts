// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentModeComponent } from './shipment-mode.component';
import { SimpleChange } from '@angular/core';
import { Pipe } from '@angular/core';

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

describe('ShipmentModeComponent', () => {
  let component: ShipmentModeComponent;
  let fixture: ComponentFixture<ShipmentModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShipmentModeComponent, mockPipe({ name: 'content' })],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentModeComponent);
    component = fixture.componentInstance;
    component.shipmentModeSummary = [
      {
        name: 'Air',
        id: 'ir',
        count: '1',
      },
      {
        name: 'Ocean',
        id: 'ocean',
        count: '105',
      },
      {
        name: 'Intermodal',
        id: 'Intermodal',
        count: '100',
      },
      {
        name: 'Courier',
        id: 'Courier',
        count: '45',
      },
      {
        name: 'TL',
        id: 'TL',
        count: '1000',
      },
      {
        name: 'Parcel',
        id: 'Parcel',
        count: '10000',
      },
      {
        name: 'LTL',
        id: 'LTL',
        count: '200',
      },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getIcon', () => {
    spyOn(component, 'getIcon').and.callThrough();
    const shipmentMode = {
      name: 'Air',
      id: 'Air',
      count: '1',
    };
    fixture.detectChanges();
    expect(component.getIcon(shipmentMode)).toBe('air');
    expect(component.getIcon(null)).toBe('default');
  });

  it('should call getIcon', () => {
    spyOn(component, 'getIcon').and.callThrough();
    const shipmentMode = {
      name: 'Air',
      count: '1',
    };
    fixture.detectChanges();
    expect(component.getIcon(shipmentMode)).toBe('default');
  });

  it('should call ngOnChanges', () => {
    spyOn(component, 'ngOnChanges').and.callThrough();

    fixture.detectChanges();
    component.ngOnChanges({
      shipmentModeSummary: new SimpleChange(
        [],
        [
          {
            name: 'Air',
            id: 'ir',
            count: '1',
          },
          {
            name: 'Ocean',
            id: 'ocean',
            count: '105',
          },
          {
            name: 'Intermodal',
            id: 'Intermodal',
            count: '100',
          },
          {
            name: 'Courier',
            id: 'Courier',
            count: '45',
          },
          {
            name: 'TL',
            id: 'TL',
            count: '1000',
          },
          {
            name: 'Parcel',
            id: 'Parcel',
            count: '10000',
          },
          {
            name: 'LTL',
            id: 'LTL',
            count: '200',
          },
        ],
        false
      ),
    });
    expect(component).toBeTruthy();
  });
});
