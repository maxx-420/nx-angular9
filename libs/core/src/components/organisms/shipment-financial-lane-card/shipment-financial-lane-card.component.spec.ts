import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentFinancialLaneCardComponent } from './shipment-financial-lane-card.component';

describe('ShipmentFinancialLaneCardComponent', () => {
  let component: ShipmentFinancialLaneCardComponent;
  let fixture: ComponentFixture<ShipmentFinancialLaneCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShipmentFinancialLaneCardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentFinancialLaneCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should make clickOnLaneRow emit true when onRowClick method is called', () => {
    let returnVal = false;
    component.clickOnLaneRow.subscribe(() => (returnVal = true));
    component.onRowClick(null);
    expect(returnVal).toBe(true);
  });
  it('should make clickOnLaneRow emit true when onLearnMoreRowClick method is called', () => {
    let returnVal = false;
    component.clickOnLaneRow.subscribe(() => (returnVal = true));
    component.financialLaneSummaryData = [
      {
        originCity: 'NEW YORK',
        originCountry: 'US',
        destinationCity: 'NEW DELHI',
        destinationCountry: 'IN',
        totalcustomerCharge: '1,211.22',
        totalcustomerChargeCurrency: 'USD',
      },
    ];
    component.onLearnMoreRowClick({ data: 'UPS', index: 0 });
    expect(returnVal).toBe(true);
  });
  it('onLearnMoreRowClick should not call onRowClick method', () => {
    const spy = spyOn(component, 'onRowClick');
    component.financialLaneSummaryData = undefined;
    component.onLearnMoreRowClick({ data: 'UPS', index: 0 });
    expect(spy).not.toHaveBeenCalled();

    component.financialLaneSummaryData = [];
    component.onLearnMoreRowClick({ data: 'UPS', index: 0 });
    expect(spy).not.toHaveBeenCalled();
  });
});
