// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Pipe } from '@angular/core';
import { ShipmentClaimCardComponent } from './shipment-claim-card.component';
import ShipmentUtility from '../../../utils/shipmentUtils';

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

const data = {
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

describe('ShipmentClaimCardComponent', () => {
  let component: ShipmentClaimCardComponent;
  let fixture: ComponentFixture<ShipmentClaimCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShipmentClaimCardComponent, mockPipe({ name: 'content' })],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentClaimCardComponent);
    component = fixture.componentInstance;
    ShipmentUtility.formatFinancialData(data.claims);
    component.claimsTableData = data;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
