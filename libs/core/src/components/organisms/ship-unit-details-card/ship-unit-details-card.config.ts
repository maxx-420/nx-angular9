// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

import { ElementRef, TemplateRef } from '@angular/core';

import { ColumnInfo } from '../../../model/interfaces';

export const referencesLimit = '6';
export const temperatureMin = 'temperatureRangeMin';

export const shipUnitDetailsDisplayedColumns: string[] = [
  'description',
  'quantity',
  'weight',
  'dimensions',
];

export const shipUnitDetailsColumnLabels: any = (
  templates: Map<string, TemplateRef<any>>,
  viewMoreTemplate: ElementRef
): ColumnInfo => ({
  description: {
    displayLabel: 'dpf_l3_shptInfo_shpUnitDetailsCrdDes',
    styleClass: 'nowrap',
    transformLabel: true,
    customTemplate: viewMoreTemplate,
  },
  quantity: {
    displayLabel: 'dpf_l3_shptInfo_shpUnitDetailsCrdQty',
    type: 'number',
    styleClass: 'nowrap',
    customTemplate: templates.get('quantityColumnTemplate'),
    transformLabel: true,
  },
  weight: {
    displayLabel: 'dpf_l3_shptInfo_shpUnitDetailsCrdWt',
    type: 'number',
    customTemplate: templates.get('weightColumnTemplate'),
    transformLabel: true,
  },
  dimensions: {
    displayLabel: 'dpf_l3_shptInfo_shpUnitDetailsCrdDim',
    type: 'dimension',
    customTemplate: templates.get('dimensionColumnTemplate'),
    transformLabel: true,
  },
});

export const dataAutomationAttr = 'ship-unit-details-card';
