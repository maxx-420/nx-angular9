// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Pipe } from '@angular/core';
import { ShipUnitDetailsCardComponent } from './ship-unit-details-card.component';
import { RenderLabelPipe } from '../../../pipe/render-label/render-label.pipe';

function mockPipe(options: Pipe): Pipe {
  const metadata: Pipe = {
    name: options.name,
  };

  return <any>Pipe(metadata)(
    class MockPipe {
      transform() {
        return '';
      }
    }
  );
}

const data = [
  {
    description: 'Gift Ribbon',
    quantity: '10',
    unitOfMeasurement: 'Pallet',
    weight: {
      weight: '8000',
      unitOfMeasurement: {
        symbol: 'KG',
        name: 'Kilogram',
      },
    },
    dimensions: {
      length: '10',
      width: '20',
      height: '15',
      unitOfMeasurement: {
        symbol: 'FT',
        name: 'Feet',
      },
    },
    temperatureDetails: {
      rangeMin: '20',
      rangeMax: '40',
      rangeUOM: 'Celsius',
      rangeCode: 'C',
    },
    referenceTypes: [
      {
        type: 'Lot#',
        value: '3947464',
      },
      {
        type: 'Lot Hold Status',
        value: 'Released',
      },
    ],
  },
];

describe('ShipUnitDetailsCardComponent', () => {
  let component: ShipUnitDetailsCardComponent;
  let fixture: ComponentFixture<ShipUnitDetailsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ShipUnitDetailsCardComponent,
        mockPipe({ name: 'content' }),
      ],
      providers: [
        {
          provide: RenderLabelPipe,
          useClass: mockPipe({ name: 'content' }),
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipUnitDetailsCardComponent);
    component = fixture.componentInstance;
    component.tableData = data;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should map table data into required format', () => {
    const result = component.formatUnitData(data[0]);
    expect(typeof result.description).not.toEqual('string');
    expect(Object.keys(result.description).length).toEqual(3);
  });
});
