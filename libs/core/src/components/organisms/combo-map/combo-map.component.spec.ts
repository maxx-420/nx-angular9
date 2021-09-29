// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RenderLabelPipe } from './../../../pipe/render-label/render-label.pipe';

import { ComboMapComponent } from './combo-map.component';
import { mapTypes } from './combo-map.config';

describe('ComboMapComponent', () => {
  let component: ComboMapComponent;
  let fixture: ComponentFixture<ComboMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ComboMapComponent, RenderLabelPipe],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboMapComponent);
    component = fixture.componentInstance;
    component.mapDetails = [
      {
        type: 'Origin',
        summary: [
          {
            id: 'US',
            name: 'United States',
            count: '1233',
          },
        ],
      },
      {
        type: 'Destination',
        summary: [
          {
            id: 'US',
            name: 'United States',
            count: '933',
          },
        ],
      },
    ];
    fixture.detectChanges();
  });

  it('should create with valid data', () => {
    component.ngOnChanges(null);
    expect(component).toBeTruthy();
    expect(component.buttonTypes[0].type).toBe('Origin');
  });

  it(`test for convertIntoRadius`, () => {
    let res = component.convertIntoRadius('50%');
    expect(res).toEqual(750000);
    res = component.convertIntoRadius('7%');
    expect(res).toEqual(150000);
    res = component.convertIntoRadius(null);
    expect(res).toEqual(150000);
  });

  it(`test for roundOff`, () => {
    let res = component.roundOff(1, 2);
    expect(res).toEqual(1);
    res = component.roundOff(55.451, 2);
    expect(res).toEqual(55.45);
    res = component.roundOff(55.4, null);
    expect(res).toEqual(55);
  });

  it(`test for updateMap`, () => {
    component.mapDetails = [
      {
        type: 'Origin',
        summary: [
          {
            id: 'US',
            name: 'United States',
            count: '1233',
          },
        ],
      },
      {
        type: 'Destination',
        summary: [
          {
            id: 'US',
            name: 'United States',
            count: '933',
          },
        ],
      },
    ];
    component.ngOnChanges(null);
    component.updateMap('Origin');
    fixture.detectChanges();
    expect(component.leftButtonStyle).toEqual('button-selected');
    component.updateMap('Destination');
    fixture.detectChanges();
    expect(component.rightButtonStyle).toEqual('button-selected');
  });

  it(`test for createTooltipTemplate`, () => {
    component.dataAttributeTooltip = 'map-tooltip';
    fixture.detectChanges();
    var result = component.createTooltipTemplate(
      '12',
      '54.5',
      'United States',
      mapTypes.shipment
    );

    const template = `<div class="map-info-window" id="info_window" style="width: 178px; padding: 11px 15px 15px 15px;" data-automation=map-tooltip>
    <div style="border-bottom: 1px solid #eeeeee;">
      <p class="tooltip-heading">
        United States
      </p>
    </div>
    <div style="margin-top: 10px;">
      <div class="row" style="padding-left: 10px;">
        <p class="tooltip-field-heading">
          Shipment Volume (12)
        </p>
        <p class="tooltip-field-value">
          54.5%
        </p>
      </div>
      <div>
        <div style="width: 100%; background-color: #e4e8eb;">
          <div
            style="width: 54.5;height: 4px;background-color: #2666BF;"
          ></div>
        </div>
      </div>
    </div>
  </div>
    `;

    expect(result.replace(/ /g, '').trim()).toBe(
      template.replace(/ /g, '').trim()
    );
  });

  it(`test for invalid country code`, () => {
    component.processedMapData = []; //clear previous data
    component.defaultType = null;
    component.mapDetails = [
      {
        type: 'Origin',
        summary: [
          {
            id: 'Not Available',
            name: 'United States',
            count: '1233',
          },
        ],
      },
      {
        type: 'Destination',
        summary: [
          {
            id: 'Not Available',
            name: 'United States',
            count: '933',
          },
        ],
      },
    ];
    fixture.detectChanges();
    component.ngOnChanges(null);
    expect(component.processedMapData[0].locationList).toEqual([]);
  });

  it(`test for showFilterButtons in case of empty data`, () => {
    component.mapDetails = [];
    fixture.detectChanges();
    component.ngOnChanges(null);
    expect(component.showFilterButtons).toEqual(false);
  });

  it('processDataForMap', () => {
    component.variation = 'Warehouse';
    component.mapDetails = [
      {
        id: 'F647A197-23F0-4D6C-CEBA-08D7BC8E6A1B',
        name: 'KYSPL',
        location: {
          latitude: '37.97158',
          longitude: '-85.6691',
        },
        address: {
          line1: '659 PARK LOOP ROAD',
          line2: null,
          city: 'SHEPHERDSVILLE',
          country: 'United States Of America',
        },
        inboundShipmentCount: 4,
        outboundShipmentCount: 17230,
        inboundVolumePercentage: '100',
        outboundVolumePercentage: '100',
      },
    ];

    component.processDataForMap(component.mapDetails);
    expect(component.processedMapData.length).toEqual(2);
    expect(component.processedMapData[0].locationList[0].latLng).toEqual({
      lat: 37.97158,
      lng: -85.6691,
    });
    expect(component.processedMapData[0].locationList[0].circleDesign).toEqual({
      radius: 1500000,
      strokeColor: '#FFC400',
      strokeOpacity: 0,
      fillColor: '#FFC400',
      fillOpacity: 0.2,
    });

    component.mapDetails = [
      {
        id: 'F647A197-23F0-4D6C-CEBA-08D7BC8E6A1B',
        name: 'KYSPL',
        address: {
          line1: '659 PARK LOOP ROAD',
          line2: null,
          city: 'SHEPHERDSVILLE',
          country: 'United States Of America',
        },
        inboundShipmentCount: 4,
        outboundShipmentCount: 17230,
        inboundVolumePercentage: '100',
        outboundVolumePercentage: '100',
      },
    ];

    component.processDataForMap(component.mapDetails);
    expect(component.processedMapData[0].locationList.length).toBe(0);
    expect(component.showFilterButtons).toBe(false);
  });
});
