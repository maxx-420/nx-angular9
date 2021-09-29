// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentCostCardComponent } from './shipment-cost-card.component';
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

const costData = {
  id: '74018344.financial-information',
  totalCustomerCharge: '200',
  totalCustomerChargeCurrency: 'USD',
  invoiceDateTime: '2021-03-10 22:30:30',
  costBreakdown: [
    {
      costBreakdownType: 'Linehaul',
      costBreakdownValue: '99999',
    },
    {
      costBreakdownType: 'Fuel',
      costBreakdownValue: '99999',
    },
  ],
  claims: [
    {
      claimType: 'ABC',
      claimAmount: '1000',
      claimAmountCurrency: 'USD',
      claimFilingDateTime: '2021-03-10 22:30:30',
      claimStatus: 'Closed',
      claimClosureDateTime: '2021-03-10 22:30:30',
      claimAmountPaid: '100',
      claimAmountPaidCurrency: 'USD',
    },
  ],
};

describe('ShipmentCostCardComponent', () => {
  let component: ShipmentCostCardComponent;
  let fixture: ComponentFixture<ShipmentCostCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShipmentCostCardComponent, mockPipe({ name: 'content' })],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentCostCardComponent);
    component = fixture.componentInstance;
    component.costData = costData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
