import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { ShipmentFinancialModeBreakdownComponent } from './shipment-financial-mode-breakdown.component';

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
const financialSummaryHLD = {
  data: {
    totalCustomerCharge: '12121',
    totalCustomerChargeCurrency: 'USD',
  },
  hasApiFailed: false,
};

describe('ShipmentFinancialModeBreakdownComponent', () => {
  let component: ShipmentFinancialModeBreakdownComponent;
  let fixture: ComponentFixture<ShipmentFinancialModeBreakdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ShipmentFinancialModeBreakdownComponent,
        mockPipe({ name: 'content' }),
      ],
      providers: [DecimalPipe],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentFinancialModeBreakdownComponent);
    component = fixture.componentInstance;
    component.config = financialSummaryHLD;
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('should make clickOnModeRow emit true when onRowClick method is called', () => {
    let returnVal = false;
    component.clickOnModeRow.subscribe(() => (returnVal = true));
    component.onRowClick('UPS');
    expect(returnVal).toBe(true);
  });
  it('should make clickOnLearnMoreRow emit true when onLearnMoreRowClick method is called', () => {
    let returnVal = false;
    component.clickOnLearnMoreRow.subscribe(() => (returnVal = true));
    component.onLearnMoreRowClick({ mode: 'UPS' });
    expect(returnVal).toBe(true);
  });
});
