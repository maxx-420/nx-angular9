// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

import { Component, Input } from '@angular/core';

import { DECIMAL_NUMBER_DEFAULT_FORMAT } from '../../../constants/global.constant';

@Component({
  selector: 'lib-shipment-cost-card',
  templateUrl: './shipment-cost-card.component.html',
})
export class ShipmentCostCardComponent {
  @Input() costData;

  decimalNumberDefaultFormat: string = DECIMAL_NUMBER_DEFAULT_FORMAT;
}
