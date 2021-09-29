// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'lib-shipment-schedule',
  templateUrl: './shipment-schedule.component.html',
})
export class ShipmentScheduleComponent implements OnInit {
  @Input() isCancelledShipment;
  @Input() cancellationDateTime;
  @Input() shipmentCanceledDateTimeZone;

  @Input() cancellationReason;
  @Input() scheduleData;
  @Input() shipmentTypeExclusions;
  @Input() COMPONENT_IDS;

  showTimeZone;

  /**
   * ngOnInit lifecycle hook
   */
  ngOnInit() {
    this.showTimeZone =
      !this.shipmentTypeExclusions ||
      !this.shipmentTypeExclusions[this.COMPONENT_IDS?.showDateTimeZone];
  }
}
