// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
/*
 * Common component for activity feeds.
 **/

import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

import { RenderLabelPipe } from '../../../pipe/render-label/render-label.pipe';
import { SymphonyDatePipe } from '../../../pipe/symphony-date.pipe';
import ShipmentUtility from '../../../utils/shipmentUtils';

import {
  ENTRY_DETAILS_BUSINESS_ID,
  ENTRY_DETAILS_PROCESSING_COUNTRY,
  ENTRY_DETAILS_SOURCE,
  ENTRY_DETAILS_URL,
  LOGINEXT_TRACK,
  MILESTONE_STATUS,
  SHIPMENT_STATUS,
} from './../../../constants/global.constant';
import { AccessControlUtility } from './../../../utils/access-control.util';
import { default as CommonUtility } from './../../../utils/commonUtil';
import { SessionStorageUtility } from './../../../utils/sessionStorage';
@Component({
  selector: 'lib-activity-feeds',
  templateUrl: './activity-feed.component.html',
  styleUrls: ['./activity-feed.component.scss'],
})
export class ActivityFeedComponent implements OnChanges, AfterViewInit, OnInit {
  @Input() headerLabel: string = this._contentPipe.transform(
    'activity_feed_heading'
  );
  @Input() listOfActivities = [];
  @Input() hasApiFailed: boolean;
  @Input() errorReason: string;
  @Input() pageSection: string;
  @Input() milestoneStatus: string;
  @Input() isActive: boolean;
  @Input() showDateTimeZone;
  @Input() milestoneCompletionDateTime: string;
  @Input() countryCode;
  @Input() originCountryCode;
  @Input() orderNumber;
  @Input() milestoneID;
  @Input() shipmentType;
  @Input() componentID;
  @Input() variationType;
  @Input() inclusionList;
  @Input() showSegmentNumber;
  @Input() isUPSShipmentServiceLevel;
  @Input() showExternalCarrier;
  @Output() carrierLinkClickEvent = new EventEmitter();
  customStyle: any = { height: '351px' };

  shipmentUtility = ShipmentUtility;
  milestoneStatusList = MILESTONE_STATUS;
  matTabHeight = document.getElementsByTagName('nav')[0]?.offsetHeight;
  headerHeight = document.getElementsByTagName('header')[0]?.offsetHeight + 10;
  isUcpAccess;
  hasEntryDetailAccess;
  entryDetailUrl = ENTRY_DETAILS_URL;
  entryDetailsBusinessId = ENTRY_DETAILS_BUSINESS_ID;
  entryDetailsProcessingCountry = ENTRY_DETAILS_PROCESSING_COUNTRY;
  entryDetailsSource = ENTRY_DETAILS_SOURCE;
  businessID;
  constructor(
    private readonly _contentPipe: RenderLabelPipe,
    private readonly symphonyDatePipe: SymphonyDatePipe,
    private readonly _elementRef: ElementRef
  ) {}

  /**
   * handles carrier link click, sends event payload to wrapper
   * @param $event event payload
   */
  handleCarrierLinkClick($event) {
    this.carrierLinkClickEvent.emit($event);
  }

  /**
   * ngOnInit lifecycle hook
   */
  ngOnInit() {
    this.businessID = AccessControlUtility.getFirstSelectedCompanyDetails()?.unitName;
    this.isUcpAccess = AccessControlUtility.isUCPAccess();
  }
  /**
   * ngOnChanges lifecycle hook
   */
  ngOnChanges(changes: SimpleChanges) {
    // this will scroll to activity feed tile if isActive value changes and is equal to true
    if (
      changes.isActive &&
      changes.isActive.previousValue !== changes.isActive.currentValue &&
      this.isActive
    ) {
      const obj = CommonUtility.checkScrollHeight(
        this._elementRef.nativeElement
      );
      obj.y = obj.y - this.headerHeight - this.matTabHeight;
      CommonUtility.scrollToWindow(obj);
    }
  }

  /**
   * ngAfterViewInit lifecycle hook
   */

  ngAfterViewInit() {
    // this will scroll to activity feed tile if isActive is equal to true, this invokes only first
    // time to wait for element to be in DOM
    if (this.isActive) {
      setTimeout(() => {
        const obj = CommonUtility.checkScrollHeight(
          this._elementRef.nativeElement
        );
        obj.y = obj.y - this.headerHeight - this.matTabHeight;
        CommonUtility.scrollToWindow(obj);
      }, 0);
    }
  }

  /**
   * to identify whether to show Login next  link
   * the conidtions are - It should be a PostSaleCustomer,
   * Milestone activity should be In Transit
   * If the origin country code is present
   * additionalTrackingIndicator should be Y
   */
  showLogiNextLink(additionalTrackingIndicator): boolean {
    const showLink =
      this.inclusionList[this.componentID.logiNextLink] &&
      this.milestoneID?.replace(' ', '')?.toLowerCase() ===
        SHIPMENT_STATUS.in_transit &&
      this.originCountryCode &&
      additionalTrackingIndicator?.toLowerCase() === 'y';

    return !!showLink;
  }
  /**
   * this will open an external link of Loginext API.
   *
   */
  openLogiNextTrackUrl(segmentNumber) {
    const url = LOGINEXT_TRACK.link;
    const AIDConfigKey =
      ['US', 'CA'].indexOf(this.originCountryCode) !== -1
        ? LOGINEXT_TRACK.AIDUSCAKey
        : LOGINEXT_TRACK.AIDDefaultKey;
    const AIDKey = SessionStorageUtility.getConfigKeys(AIDConfigKey);
    return (
      url + 'ordno=' + this.orderNumber + '_' + segmentNumber + '&aid=' + AIDKey
    );
  }

  /**
   * to identify wheather to show entry details link
   */
  showEntryDetails(trackingNumber) {
    return (
      this.isUcpAccess &&
      this.inclusionList[this.componentID.entryDetails] &&
      this.milestoneID?.toLowerCase() === SHIPMENT_STATUS.customs &&
      trackingNumber
    );
  }

  /**
   * getMilestoneStatusLabel
   */
  getMilestoneStatusLabel() {
    let label;
    if (this.milestoneStatus === this.milestoneStatusList.completed) {
      label = this._contentPipe.transform('lbl_shipment_completedStatus');
      if (this.milestoneCompletionDateTime) {
        label =
          label +
          ': ' +
          this.symphonyDatePipe.transform(
            this.milestoneCompletionDateTime,
            'yyyy-MM-dd'
          );
      }
    } else if (this.milestoneStatus === this.milestoneStatusList.inProgress) {
      label = this._contentPipe.transform('lbl_shipment_inProgressStatus');
    }
    return label;
  }
}
