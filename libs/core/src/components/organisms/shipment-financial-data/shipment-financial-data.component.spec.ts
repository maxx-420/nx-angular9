import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ShipmentFinancialDataComponent } from './shipment-financial-data.component';
import { Pipe, SimpleChange, SimpleChanges } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';
import { CommonUtility } from '../../../utils';
import { ROUTER_CONSTANTS, ROUTE_STATES } from '../../../constants';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
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

const dummyDate = {
  endDate: '2021-04-08',
  startDate: '2021-04-02',
};

const initialState = {
  shipmentDashboard: {
    financialSummary: {
      data: [
        {
          totalcustomerCharge: '77000.86',
          totalcustomerChargeCurrency: 'USD',
          averageCostPerShipment: '5000',
          averageCostPerUnit: '1.92',
          averageCostPerShipmentForDifferential: '4500',
          averageCostPerUnitForDifferential: '2.11',
          numberOfClaims: '1',
        },
      ],
      errorDetails: null,
      isLoaded: true,
    },
  },
};

const financialSummaryHLD = {
  data: {
    totalcustomerCharge: '15454',
    totalcustomerChargeCurrency: 'USD',
    averageCostPerShipment: '5000',
    averageCostPerUnit: '1.92',
    averageCostPerShipmentForDifferential: '4500',
    averageCostPerUnitForDifferential: '2.11',
    numberOfClaims: '10',
  },
  state: {
    from: ROUTE_STATES.dashboard,
    url: `/${ROUTER_CONSTANTS.gldPlatform}/${ROUTER_CONSTANTS.home}`,
  },
  shipmentListUrl: `/${ROUTER_CONSTANTS.shipments}/${ROUTER_CONSTANTS.listing}`,
  financialUrl: `/${ROUTER_CONSTANTS.shipments}/${ROUTER_CONSTANTS.financials}`,
  hasApiFailed: false,
};

describe('ShipmentFinancialDataComponent', () => {
  let component: ShipmentFinancialDataComponent;
  let fixture: ComponentFixture<ShipmentFinancialDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        ShipmentFinancialDataComponent,
        mockPipe({ name: 'content' }),
      ],
      providers: [
        provideMockStore({ initialState }),
        RenderLabelPipe,
        CurrencyPipe,
        DecimalPipe,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentFinancialDataComponent);
    component = fixture.componentInstance;
    component.config = financialSummaryHLD;
    component.selectedChipFilters = [
      {
        value: 'MTD',
        ...dummyDate,
      },
    ];
  });

  it('should create the component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should not set isFromGldPlatform upon changes', () => {
    component.config = null;
    component.isFromGldPlatform = undefined;
    component.ngOnChanges(null);
    fixture.detectChanges();
    expect(component.isFromGldPlatform).toBeUndefined();
  });

  it('should call setLearnMoreTableData', () => {
    component.learnMoreTableData = [];
    component.config = financialSummaryHLD;
    component.setDifferentialPercentage();
    component.setLearnMoreTableData();
    expect(component.learnMoreTableData.length).toEqual(4);
  });

  it('should call setDifferentialPercentage and percentage methods', () => {
    const percentage = spyOn(
      CommonUtility,
      'getDifferentialPercentageFormattedString'
    );
    component.config = financialSummaryHLD;
    fixture.detectChanges();
    component.setDifferentialPercentage();
    expect(percentage).toHaveBeenCalled();
  });

  it('should make clickOnTile emit true when onTileClick method is called', () => {
    let returnVal = false;
    component.clickOnTile.subscribe(() => (returnVal = true));
    component.onTileClick(event);
    expect(returnVal).toBeTrue();
  });

  it('should make clickOnClaims emit true when onClaimsClick method is called', () => {
    let returnVal = false;
    component.clickOnClaims.subscribe(() => (returnVal = true));
    component.onClaimsClick(event);
    expect(returnVal).toBeTrue();
  });

  it('should set differenceOfAvgCostPerShipment to null', () => {
    let finSummary = { data: null };
    component.config = finSummary;
    component.setDifferentialPercentage();
    expect(component.config.data.differenceOfAvgCostPerShipment).toBeNull();
  });

  it('should set isFromGldPlatform to false upon changes', () => {
    let finSummary = {
      data: {
        totalcustomerCharge: '15454',
        totalcustomerChargeCurrency: 'USD',
        numberOfClaims: null,
      },
      state: null,
      shipmentListUrl: `/${ROUTER_CONSTANTS.shipments}/${ROUTER_CONSTANTS.listing}`,
      financialUrl: `/${ROUTER_CONSTANTS.shipments}/${ROUTER_CONSTANTS.financials}`,
      hasApiFailed: false,
    };
    component.config = finSummary;
    component.isFromGldPlatform = undefined;
    component.selectedChipFilters = null;
    component.selectedChipFilters = [
      {
        endDate: '2021-05-19',
        startDate: '2021-03-21',
        value: 'MTD',
        ...dummyDate,
      },
    ];
    component.ngOnChanges(<SimpleChanges>{
      selectedChipFilters: new SimpleChange(
        {},
        component.selectedChipFilters,
        false
      ),
    });
    fixture.detectChanges();

    expect(component.isFromGldPlatform).toBeFalse();
  });

  it('should set isFromGldPlatform to true upon changes', () => {
    component.config = financialSummaryHLD;
    component.isFromGldPlatform = undefined;
    component.selectedChipFilters = [
      {
        endDate: '2021-05-19',
        startDate: '2021-03-21',
        value: 'MTD',
        ...dummyDate,
      },
    ];
    component.ngOnChanges(<SimpleChanges>{
      selectedChipFilters: new SimpleChange(
        component.selectedChipFilters,
        component.selectedChipFilters,
        false
      ),
    });
    fixture.detectChanges();

    expect(component.isFromGldPlatform).toBeTrue();
  });
  it('should make clickOnTile emit true when tableRowClicked method is called', () => {
    component.clickOnTile.subscribe(() => (returnVal = true));
    let returnVal = false;
    component.tableRowClicked(null);
    expect(returnVal).toBeTrue();

    returnVal = false;
    component.tableRowClicked({ data: null, index: 0 });
    expect(returnVal).toBeTrue();
  });

  it('should make clickOnClaims emit true when tableRowClicked method is called', () => {
    let returnVal = false;
    component.clickOnClaims.subscribe(() => (returnVal = true));
    component.setLearnMoreTableData();
    component.tableRowClicked({ data: null, index: 3 });
    expect(returnVal).toBeTrue();
  });
});
