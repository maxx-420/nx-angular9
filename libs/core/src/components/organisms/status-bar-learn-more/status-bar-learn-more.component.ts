// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
//
import { Component, Input } from '@angular/core';

import { SHIPMENT_TYPE } from '../../../constants/global.constant';

@Component({
  selector: 'lib-status-bar-learn-more',
  templateUrl: './status-bar-learn-more.component.html',
  styleUrls: ['./status-bar-learn-more.component.scss'],
})
export class LearnMoreComponent {
  /**
   * Added shipment type const for UI check
   */
  shipmentType = SHIPMENT_TYPE;
  /**
   * Milestones status array
   */
  @Input() milestoneStatusConfigurations: any;
  /**
   * Shipment Types
   */
  @Input() milestoneStatusType: any;

  /**
   * For supporting label changes of Coverngence Warehouse Experience
   */
  @Input() isConvergenceExperience: boolean;
}
