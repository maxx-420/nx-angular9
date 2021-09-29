import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe } from '@angular/core';

import { ShipmentConnectionsComponent } from './shipment-connections.component';
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

describe('ShipmentConnectionsComponent', () => {
  let component: ShipmentConnectionsComponent;
  let fixture: ComponentFixture<ShipmentConnectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipmentConnectionsComponent,
      mockPipe({ name: 'content' }), ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentConnectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('selecte connection when selected index is 0', () => {
    spyOn(component, 'onConnectionSelection').and.callThrough();
    spyOn(component.selectConnectionEvent, 'emit');
    const value = 0;
    component.shipmentConnectionList = ['Shipment Details', 'Items']
    component.onConnectionSelection(value);
    fixture.detectChanges();
    expect(component.selectConnectionEvent.emit).toHaveBeenCalledWith('Shipment Details');
  });

  it('selecte connection when selected index is 1', () => {
    spyOn(component, 'onConnectionSelection').and.callThrough();
    spyOn(component.selectConnectionEvent, 'emit');
    const value = 1;
    component.shipmentConnectionList = ['Shipment Details', 'Items']
    component.onConnectionSelection(value);
    fixture.detectChanges();
    expect(component.selectConnectionEvent.emit).toHaveBeenCalledWith('Items');
  });
  it('selecte connection when selected index is 1', () => {
    spyOn(component, 'onConnectionSelection').and.callThrough();
    spyOn(component.selectConnectionEvent, 'emit');
    const value = 1;
    component.shipmentConnectionList = ['Shipment Details', 'Items']
    component.onConnectionSelection(value);
    fixture.detectChanges();
    expect(component.selectConnectionEvent.emit).toHaveBeenCalledWith('Items');
  });
});
