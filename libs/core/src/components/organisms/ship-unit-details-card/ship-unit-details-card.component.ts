// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { TemplateSelectorService } from '../../../service/template-selector-service/template-selector.service';
import { ViewportUtility } from '../../../utils';
import { IShippableUnit } from '../../../model/interfaces';

import {
  dataAutomationAttr,
  referencesLimit,
  shipUnitDetailsColumnLabels,
  shipUnitDetailsDisplayedColumns,
  temperatureMin,
} from './ship-unit-details-card.config';

@Component({
  selector: 'lib-shippable-unit-card',
  templateUrl: './ship-unit-details-card.component.html',
  styleUrls: ['./ship-unit-details-card.component.scss'],
})
export class ShipUnitDetailsCardComponent implements OnInit {
  @ViewChild('descriptionFieldTemplate', { static: true })
  descriptionFieldTemplate: ElementRef;
  @Input() tableData: any = [];
  shipUnitDetailsColumnLabels: any;
  shipUnitDetailsDisplayedColumns: string[] = shipUnitDetailsDisplayedColumns;
  templates: any;
  referencesLimit: string = referencesLimit;
  temperatureMin: string = temperatureMin;
  dataAutomationAttrTable: any = dataAutomationAttr;
  isDesktopDevice: boolean = ViewportUtility.isDesktopDevice();

  constructor(private templatesService: TemplateSelectorService) {
    this.templates = this.templatesService.templates;
  }

  /**
   * On Init life cycle hook
   */
  ngOnInit(): void {
    //  it can be removed when BE will make the changes for consistency on other places
    if (this.tableData && this.tableData.length) {
      this.tableData = this.tableData.map(this.formatUnitData);
    }
    this.shipUnitDetailsColumnLabels = shipUnitDetailsColumnLabels(
      this.templates,
      this.descriptionFieldTemplate
    );
  }

  /*
   * TODO:: Need to remove this logic once BE makes the response consistent as Transportation Details.
   * Map the table data into the required format by the temperature and reference View.
   */
  formatUnitData = (data: any): IShippableUnit => {
    const obj: IShippableUnit = {
      ...data,
      description: {
        description: data.description,
        temperatureDetails: {
          temperatureRangeCode: data.temperatureDetails?.rangeCode,
          temperatureRangeMax: data.temperatureDetails?.rangeMax,
          temperatureRangeMin: data.temperatureDetails?.rangeMin,
          temperatureRangeUOM: data.temperatureDetails?.rangeUOM,
        },
        referenceTypes: data.referenceTypes.map((i: any): {} => ({
          referenceType: i?.type,
          referenceValue: i?.value,
        })),
      },
    };

    if (obj?.temperatureDetails) {
      delete obj?.temperatureDetails;
    }
    if (obj?.referenceTypes) {
      delete obj?.referenceTypes;
    }

    return obj;
  }
}
