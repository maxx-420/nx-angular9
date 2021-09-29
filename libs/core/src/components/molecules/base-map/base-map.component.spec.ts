// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BaseMapComponent} from './base-map.component';
import {Pipe, SimpleChange} from '@angular/core';

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
declare let google: any;

describe('BaseMapComponent', () => {
  let component: BaseMapComponent;
  let fixture: ComponentFixture<BaseMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BaseMapComponent, mockPipe({name: 'content'})],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseMapComponent);
    component = fixture.componentInstance;
    component.mapMarkerConfig = {
      markerType: 'Circle',
      markerProperties: {
        circle: {
          selectedColor: '#2666BF',
          normalColor: '#FFC400',
        },
      },
      centerCircleDesign: {
        radius: 60000,
        strokeColor: '#FFC400',
        strokeOpacity: 0.25,
        fillColor: '#FFC400',
        fillOpacity: 1,
      },
    };
    component.listOfLocations = [
      {
        latLng: {
          lat: 38,
          lng: -97,
        },
        circleDesign: {
          radius: 150000,
          strokeColor: '#FFC400',
          strokeOpacity: 0.0,
          fillColor: '#FFC400',
          fillOpacity: 0.2,
        },
        infoBoxTemplate: '',
        countryCode: 'US'
      },
      {
        latLng: {
          lat: 35,
          lng: 105,
        },
        circleDesign: {
          radius: 150000,
          strokeColor: '#FFC400',
          strokeOpacity: 0.0,
          fillColor: '#FFC400',
          fillOpacity: 0.2,
        },
        infoBoxTemplate: '',
        countryCode: 'US'
      },
    ];
    component.childId = 'base-map';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render marker of type CircleMarker', () => {
    component.listOfLocations = [
      {
        latLng: {
          lat: 38,
          lng: -97,
        },
        circleDesign: null,
        infoBoxTemplate: '',
        countryCode: 'US'
      },
    ];
    component.mapMarkerConfig = {
      markerType: 'CircleMarker',
      markerProperties: {
        marker: {
          markerType: 'circle',
          markerProps: {
            strokeColor: '#2666BF',
            fillColor: '#FFFFFF',
            scale: 6,
          },
        },
      },
      infoWindowProps: {
        pixelOffset: {
          x: 80,
          y: 129,
        },
        disableAutoPan: true,
      },
    };
    component.ngOnInit();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should call onChange', () => {
    spyOn(component, 'loadMarkers').and.callThrough();
    component.listOfLocations = [
      {
        latLng: {
          lat: 74.2,
          lng: 74.2,
        },
        circleDesign: {
          radius: 150000,
          strokeColor: '#FFC400',
          strokeOpacity: 0.0,
          fillColor: '#FFC400',
          fillOpacity: 0.2,
        },
        infoBoxTemplate: '',
        countryCode: 'US'
      },
    ];
    let data = component.listOfLocations;
    component.ngOnChanges({
      listOfLocations: new SimpleChange(null, null, false),
    });
    expect(component.loadMarkers).toHaveBeenCalledTimes(0);
    component.listOfLocations = [
      {
        latLng: {
          lat: 74.2,
          lng: 74.2,
        },
        circleDesign: {
          radius: 150000,
          strokeColor: '#FFC400',
          strokeOpacity: 0.0,
          fillColor: '#FFC400',
          fillOpacity: 0.2,
        },
        infoBoxTemplate: '',
        countryCode: 'US'
      },
      {
        latLng: {
          lat: 47.2,
          lng: 47.2,
        },
        circleDesign: {
          radius: 150000,
          strokeColor: '#FFC400',
          strokeOpacity: 0.0,
          fillColor: '#FFC400',
          fillOpacity: 0.2,
        },
        infoBoxTemplate: '',
        countryCode: 'US'
      },
    ];
    component.ngOnChanges({
      listOfLocations: new SimpleChange(data, component.listOfLocations, false),
    });
    fixture.detectChanges();
    expect(component.loadMarkers).toHaveBeenCalled();
  });

  it('test for clearSelectedMarker', () => {
    component.clearSelectedMarker();
    fixture.detectChanges();
    expect(component.selectedCenterMarker).toBe(null);
    component.selectedMarker = new google.maps.Circle();
    component.selectedCenterMarker = new google.maps.Circle();
    component.clearSelectedMarker();
    fixture.detectChanges();
    expect(component.selectedMarker).toBe(null);
  });

  it('test for reAlignMapBounds', () => {
    var bound1 = new google.maps.LatLngBounds(
      new google.maps.LatLng(75, 105),
      new google.maps.LatLng(75, -10)
    );
    var bound2 = new google.maps.LatLngBounds(
      new google.maps.LatLng(75, -75),
      new google.maps.LatLng(75, 170)
    );
    bound1 = component.reAlignMapBounds(bound1);
    expect(bound1).toEqual(bound2);
  });

  it('test for clearCircles', () => {
    const circleList = [new google.maps.Circle(), new google.maps.Circle()];
    component.clearCircles(circleList);
    expect(circleList[0].getMap()).toBe(null);
  });

  it('test for not showing map', () => {
    component.listOfLocations = [];
    component.ngOnChanges({
      listOfLocations: new SimpleChange(null, component.listOfLocations, false),
    });
    fixture.detectChanges();
    expect(component.showMap).toBe(false);
  });

  it('should not call initMap when showMap is false on calling ngAfterViewInit', () => {
    component.showMap = false;
    let spy = spyOn(component, 'initMap');
    component.ngAfterViewInit();
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('should not call initMap when listOfLocations length is  0 and map is undefined on calling ngOnChanges', () => {
    component.map = undefined;
    let spy = spyOn(component, 'initMap');
    component.listOfLocations = [];
    component.ngOnChanges({
      listOfLocations: new SimpleChange(null, ['123', '456'], false),
    });
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('should call initMap when listOfLocations length is greater than 0 and map is undefined on calling ngOnChanges', () => {
    component.map = undefined;
    let spy = spyOn(component, 'initMap');
    component.listOfLocations = [
      {
        latLng: {
          lat: 38,
          lng: -97,
        },
        circleDesign: {
          radius: 150000,
          strokeColor: '#FFC400',
          strokeOpacity: 0.0,
          fillColor: '#FFC400',
          fillOpacity: 0.2,
        },
        infoBoxTemplate: '',
        countryCode: 'US'
      },
      {
        latLng: {
          lat: 35,
          lng: 105,
        },
        circleDesign: {
          radius: 150000,
          strokeColor: '#FFC400',
          strokeOpacity: 0.0,
          fillColor: '#FFC400',
          fillOpacity: 0.2,
        },
        infoBoxTemplate: '',
        countryCode: 'US'
      },
    ];
    component.ngOnChanges({
      listOfLocations: new SimpleChange(null, ['123', '456'], false),
    });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('loadMarkers when marker type is CircleMarker', () => {
    let spy = spyOn(component, 'reAlignMapBoundsToFitCircles');
    component.mapMarkerConfig = {
      infoWindowProps: {pixelOffset: 45},
      markerProperties: {marker: {markerProps: ''}},
    };
    component.markerConfig.markerType = 'CircleMarker';
    component.listOfLocations = [
      {
        latLng: {
          lat: 38,
          lng: -97,
        },
        circleDesign: {
          radius: 150000,
          strokeColor: '#FFC400',
          strokeOpacity: 0.0,
          fillColor: '#FFC400',
          fillOpacity: 0.2,
        },
        infoBoxTemplate: '',
        countryCode: 'US'
      },
      {
        latLng: {
          lat: 35,
          lng: 105,
        },
        circleDesign: {
          radius: 150000,
          strokeColor: '#FFC400',
          strokeOpacity: 0.0,
          fillColor: '#FFC400',
          fillOpacity: 0.2,
        },
        infoBoxTemplate: '',
        countryCode: 'US'
      },
    ];
    component.loadMarkers(
      component.map,
      component.listOfLocations,
      component.infoWindow,
      component.bounds
    );
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('should call onChange', () => {
    spyOn(component, 'loadMarkers').and.callThrough();
    component.fitToWrold = true;
    component.listOfLocations = [
      {
        latLng: {
          lat: 74.2,
          lng: 74.2,
        },
        circleDesign: {
          radius: 150000,
          strokeColor: '#FFC400',
          strokeOpacity: 0.0,
          fillColor: '#FFC400',
          fillOpacity: 0.2,
        },
        infoBoxTemplate: '',
        countryCode: 'US'
      },
      {
        latLng: {
          lat: 47.2,
          lng: 47.2,
        },
        circleDesign: {
          radius: 150000,
          strokeColor: '#FFC400',
          strokeOpacity: 0.0,
          fillColor: '#FFC400',
          fillOpacity: 0.2,
        },
        infoBoxTemplate: '',
        countryCode: 'US'
      },
    ];
    component.ngOnChanges({
      listOfLocations: new SimpleChange(null, component.listOfLocations, false),
    });
    fixture.detectChanges();
    expect(component.loadMarkers).toHaveBeenCalled();
  });
});
