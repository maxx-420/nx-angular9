// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

import { Component, Input } from '@angular/core';

import {
  claimsDisplayedColumns,
  CLAIMS_COLUMN_LABELS,
} from './shipment-claim-card.config';

@Component({
  selector: 'lib-shipment-claim-card',
  templateUrl: './shipment-claim-card.component.html',
  styleUrls: ['./shipment-claim-card.component.scss'],
})
export class ShipmentClaimCardComponent {
  @Input() claimsTableData;
  claimsColumnLabels = CLAIMS_COLUMN_LABELS;
  claimsDisplayedColumns = claimsDisplayedColumns;
}
