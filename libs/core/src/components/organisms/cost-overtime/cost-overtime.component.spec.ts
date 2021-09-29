// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DecimalPipe } from '@angular/common';

import { CostOvertimeComponent } from './cost-overtime.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Pipe } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { RenderLabelPipe } from '../../../pipe/render-label/render-label.pipe';
import { DropdownOptions } from './cost-overtime.config';
import { SymphonyDatePipe } from '../../../pipe/symphony-date.pipe';

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

const costOvertimeData = {
  data: [
    {
      date: '2020-06-04',
      totalcustomerCharge: '344453.2323',
      averageCostPerShipment: '444',
      averageCostPerUnit: '354',
      averageCostPerMile: '134',
      averageCostPerWeight: '544',
      averageCostPerSKU: '354',
      shipmentMode: [
        {
          averageCostPerMile: '10',
          averageCostPerSKU: '10',
          averageCostPerShipment: '2609.280000',
          averageCostPerUnit: 2609.28,
          averageCostPerWeight: '10',
          date: '2021-07-01',
          shipmentMode: 'Air',
          totalcustomerCharge: '2609.28',
        },
      ],
    },
  ],
  isLoaded: true,
  currency: 'USD',
  errorDetails: [],
};

describe('CostOvertimeComponent', () => {
  let component: CostOvertimeComponent;
  let fixture: ComponentFixture<CostOvertimeComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule, FormsModule],
      declarations: [CostOvertimeComponent, mockPipe({ name: 'content' })],
      providers: [RenderLabelPipe, FormBuilder, SymphonyDatePipe, DecimalPipe],
    }).compileComponents();
    router = TestBed.inject(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostOvertimeComponent);
    component = fixture.componentInstance;
    component.costOvertimeData = costOvertimeData;
  });

  it('should create the app', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should call populateChartData with correct param', () => {
    component.costOvertimeForm = new FormGroup({
      costBy: new FormControl('totalcustomerCharge'),
    });
    component.modifiedDataPerDate = costOvertimeData.data;
    let chartDatasetData = [{ y: '344453.2323', t: '2020-06-04' }];
    let spy = spyOn(component, 'populateChartData');
    let spy2 = spyOn(component, 'populateChartOptions');
    component.setChartDataAndOptions();
    expect(spy).toHaveBeenCalledWith(chartDatasetData);
    expect(spy2).toHaveBeenCalledWith(344453.2323);
  });

  it('should call getTooltipContent', () => {
    component.modifiedDataPerDate = costOvertimeData.data;
    component.dropdownSelectedOption = DropdownOptions[0];
    const emptyTooltipContent = component.getTooltipContent({
      dataPoints: [
        {
          label: '12-Jul-2021',
          value: '13242.32',
        },
      ],
    });
    expect(emptyTooltipContent).not.toBeUndefined();

    const toolTipWithContent = component.getTooltipContent({
      dataPoints: [
        {
          label: '12-Jul-2021',
          value: '13242.32',
          index: 0,
        },
      ],
    });
    expect(toolTipWithContent).not.toBeUndefined();

    costOvertimeData.data[0].shipmentMode[0].shipmentMode = null;
    component.modifiedDataPerDate = costOvertimeData.data;
    const toolTipContentWithoutShipmentMode = component.getTooltipContent({
      dataPoints: [
        {
          label: '12-Jul-2021',
          value: '13242.32',
          index: 0,
        },
      ],
    });
    expect(toolTipContentWithoutShipmentMode).not.toBeUndefined();
  });

  it('should call dropdownSelectionChange', () => {
    component.modifiedDataPerDate = costOvertimeData.data;
    component.costOvertimeForm = new FormGroup({
      costBy: new FormControl('totalcustomerCharge'),
    });
    const spy = spyOn(component, 'setChartDataAndOptions');
    component.dropdownSelectionChange();
    expect(spy).toHaveBeenCalled();
  });

  it('should call createTooltipElement', () => {
    component.modifiedDataPerDate = costOvertimeData.data;
    component.dropdownSelectedOption = DropdownOptions[0];
    const tooltipModel = {
      yAlign: '',
      dataPoints: [
        {
          label: '',
          value: '',
        },
      ],
    };
    const chartRef = {
      _chart: {
        canvas: {
          id: '123',
        },
      },
    };
    component.createTooltipElement(chartRef, tooltipModel);
  });

  it('should populate learn more data', () => {
    component.costOvertimeForm = new FormGroup({
      costBy: new FormControl('totalcustomerCharge'),
    });
    component.filterLabel = 'From 2021-07-01 to 2021-07-23';
    component.populateLearnMoreData([{ t: '2021-07-20', y: '1123.128' }]);

    expect(component.learnMoreData.length).toEqual(1);
    expect(component.learnMoreData).toEqual([
      { date: '20-Jul-2021', cost: '1,123.13' },
    ]);
  });

  it('should aggregate same dates data into single date', () => {
    let costData = costOvertimeData.data;
    costData.push({
      date: '2020-06-04',
      totalcustomerCharge: '344',
      averageCostPerShipment: '4',
      averageCostPerUnit: '35',
      averageCostPerMile: '4',
      averageCostPerWeight: '4',
      averageCostPerSKU: '3',
      shipmentMode: [
        {
          averageCostPerMile: '10',
          averageCostPerSKU: '10',
          averageCostPerShipment: '2609.280000',
          averageCostPerUnit: 2609.28,
          averageCostPerWeight: '10',
          date: '2021-07-01',
          shipmentMode: 'Ocean',
          totalcustomerCharge: '2609.28',
        },
      ],
    });
    costData.push({
      date: '2020-06-05',
      totalcustomerCharge: '344',
      averageCostPerShipment: '4',
      averageCostPerUnit: '35',
      averageCostPerMile: '4',
      averageCostPerWeight: '4',
      averageCostPerSKU: '3',
      shipmentMode: [
        {
          averageCostPerMile: '10',
          averageCostPerSKU: '10',
          averageCostPerShipment: '2609.280000',
          averageCostPerUnit: 2609.28,
          averageCostPerWeight: '10',
          date: '2021-07-01',
          shipmentMode: 'LTL',
          totalcustomerCharge: '2609.28',
        },
      ],
    });
    const modifiedData = component.aggregateSameDates(costOvertimeData.data);
    expect(modifiedData.length).toEqual(2);
  });
});
