// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'lib-shipment-connections',
  templateUrl: './shipment-connections.component.html',
  styleUrls: ['./shipment-connections.component.scss'],
})
export class ShipmentConnectionsComponent {
  @Input() shipmentConnectionList: Array<any>;
  @Output() selectConnectionEvent = new EventEmitter<string>();
  prevStepIndex: number;
  selectedIndex = 0;
  selectedConnection: any;

  /**
   * Method to emit step selection event
   */
  onConnectionSelection(value) {
    if (this.prevStepIndex !== value) {
      this.selectedIndex = value;
      this.selectedConnection = this.shipmentConnectionList[value];
      this.selectConnectionEvent.emit(this.selectedConnection);
      this.prevStepIndex = value;
    }
  }
}
