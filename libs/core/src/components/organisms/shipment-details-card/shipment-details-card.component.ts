/* 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY */
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  DECIMAL_NUMBER_DEFAULT_FORMAT,
  INBOUNDTYPE,
  ROUTE_STATES,
  VIEW_MORE_VARIATIONS,
} from '../../../constants/global.constant';
import { ROUTER_CONSTANTS } from '../../../constants/router.constant';

import {
  AccessControlUtility,
  formatCompleteAddress,
  NavigationUtility,
} from './../../../utils';

@Component({
  selector: 'lib-shipment-details-card',
  templateUrl: './shipment-details-card.component.html',
})
export class ShipmentDetailsCardComponent implements OnInit {
  @Input() milestoneData: any;
  @Input() shipmentTypeExclusions: any;
  @Input() COMPONENT_IDS: any;
  INBOUNDTYPE = INBOUNDTYPE;
  viewMoreVariations = VIEW_MORE_VARIATIONS;
  formatCompleteAddress = formatCompleteAddress;

  hasFtzAccess = AccessControlUtility.hasFtzAccess();
  showConsigneeField: boolean;
  showCustomerPONumber: boolean;
  isMultiView: boolean = AccessControlUtility.isMultiAccountCombination();
  DECIMAL_NUMBER_DEFAULT_FORMAT: string = DECIMAL_NUMBER_DEFAULT_FORMAT;

  /**
   * use as constructor
   * @param router inject router
   */
  constructor(private readonly router: Router) {}
  /**
   * this will be called onClick of tranportOrderNumbers
   * @param transportOrder this is the clicked transport Order to which we have to navigate
   */
  OnClickNavigate(transportOrder) {
    NavigationUtility.navigate(
      this.router,
      [`${ROUTER_CONSTANTS.details}/${transportOrder}`],
      false,
      {
        state: { from: ROUTE_STATES.inboundShipmentDetails },
      }
    );
  }
  /**
   * On input change this method is called
   */
  ngOnInit() {
    this.showConsigneeField = this.milestoneData?.primaryDetail?.info?.hasOwnProperty(
      'consignee'
    );
    this.showCustomerPONumber = this.milestoneData?.primaryDetail?.info?.hasOwnProperty(
      'customerPONumber'
    );
  }
}
