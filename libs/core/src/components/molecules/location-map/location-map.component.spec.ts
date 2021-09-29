// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationMapComponent } from './location-map.component';
import { Pipe, SimpleChange } from '@angular/core';
import { RenderLabelPipe } from '../../../pipe/render-label/render-label.pipe';

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
describe('LocationMapComponent', () => {
  let component: LocationMapComponent;
  let fixture: ComponentFixture<LocationMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LocationMapComponent, mockPipe({ name: 'content' })],
      providers: [RenderLabelPipe],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationMapComponent);
    component = fixture.componentInstance;
    component.inputAddress = {
      origin: {
        line1: '7830 NATIONAL TURNPIKE',
        line2: '',
        city: 'LOUISVILLE',
        zipCode: 'US',
        country: '40214',
        state: 'KY',
      },
      destination: {
        line1: 'line1',
        line2: 'line2',
        city: 'city',
        zipCode: 'zipCode',
        country: 'country',
        state: 'state',
      },
    };
    component.inputLocation = {
      origin: {
        lat: 37.4224764,
        lng: -122.0842499,
      },
      destination: {
        lat: 35.4224764,
        lng: -100.0842499,
      },
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should select either origin address', () => {
    component.toggleValue = 'origin';
    component.setSelectedAddressAndLocation();
    expect(component.selectedAddress).toEqual({
      line1: '7830 NATIONAL TURNPIKE',
      line2: '',
      city: 'LOUISVILLE',
      zipCode: 'US',
      country: '40214',
      state: 'KY',
    });
  });
  it('test for toggle changes', () => {
    component.toggleChanged('destination');
    expect(component.selectedAddress).toEqual({
      line1: 'line1',
      line2: 'line2',
      city: 'city',
      zipCode: 'zipCode',
      country: 'country',
      state: 'state',
    });
  });

  it('test null inputAddress', () => {
    component.inputAddress = null;
    component.automationAttr = {
      mapShipmentAddress: 'map-shipment-address',
      mapFilterOrigin: 'map-filter-origin',
      mapFilterDestination: 'map-filter-destination',
      mapFilters: 'map-filters',
      comboMap: 'combo-map',
    };
    component.initMap();
    expect(component.windowTemplate).toBe('');
  });

  it('test valid inputAddress', () => {
    component.buttonTypes = ['origin', 'destination'];
    component.toggleValue = 'destination';
    let template = `<divdata-automation="map-shipment-address"><divclass="address">line1,line2,city,
    state,zipCode,country</div>`;
    component.initMap();
    expect(component.windowTemplate.replace(/ /g, '').trim()).toBe(
      template.replace(/ /g, '').trim()
    );
  });

  it('should call initMap when ngOnChanges is called with different value for inputLocation or inputAddress', () => {
    let spy = spyOn(component, 'initMap');
    component.ngOnChanges({
      inputLocation: new SimpleChange(
        null,
        {
          lat: 38,
          lon: 37,
        },
        false
      ),
    });
    expect(spy).toHaveBeenCalledTimes(1);
    component.ngOnChanges({
      inputAddress: new SimpleChange(
        null,
        {
          lat: 38,
          lon: 37,
        },
        false
      ),
    });
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should not call initMap  when ngOnChanges is called with same value for inputLocation and inputAddress', () => {
    let spy = spyOn(component, 'initMap');
    component.ngOnChanges({
      inputLocation: new SimpleChange(null, null, false),
    });
    expect(spy).toHaveBeenCalledTimes(0);
  });
});
