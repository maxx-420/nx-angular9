// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
/**
 * Shipment status bar
 */
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

import { ROUTER_CONSTANTS } from '../../../constants/router.constant';
import { ROLLUP_GRP_KEYS } from '../../../constants/global.constant';
import { RenderLabelPipe } from '../../../pipe/render-label/render-label.pipe';

import {
  getWarehouseMilestoneRollupConfig,
  setMilestoneRollupConfig,
  Variations,
} from './shipment-status-bar.config';
import NavigationUtility from './../../../utils/navigationUtil';
import { UserAgentUtility } from './../../../utils/user-agent.util';

@Component({
  selector: 'lib-shipment-status-bar',
  templateUrl: './shipment-status-bar.component.html',
  styleUrls: ['./shipment-status-bar.component.scss'],
})
export class ShipmentStatusBarComponent implements OnChanges {
  /**
   * Hide and show popup modal
   */
  showLearnMorePopUp = false;
  /**
   * Groupping Milestones config data
   */
  milestoneStatusConfig = [];
  /**
   * For groupping all the data
   */
  rollupMetricsData = [];
  /**
   * Getting Milestone Status Data from parent component
   */
  @Input() milestoneStatusData: any;
  /**
   * constant obj for Variations
   */
  Variations = Variations;
  /**
   * Two types of variation as of now where we show shipment status bar : dashboard and warehouse
   */
  @Input() variation = Variations.dashboard;
  /**
   * For error
   */
  @Input() hasApiFailed: boolean;
  @Input() errorReason: string;
  @Input() pageSection: string;

  shipments: number;
  summaryType: any;
  /**
   * Check for Inbound Managed Trans
   */
  @Input() isAcountTypeManagedInbound: boolean;
  /**
   * Check for Outbound Managed Trans
   */
  @Input() isAcountTypeManagedOutbound: boolean;

  /**
   * Hide link to l2 page
   */
  @Input() hideLink = false;

  @Input() customStyle: any = {
    height: '87px',
  };
  /**
   * use to emit Shipment type clicked on dashboard
   */
  @Output() elementClick = new EventEmitter();
  /**
   * use to track click of learn more modal
   */
  @Output() learnMoreModalClicked = new EventEmitter();
  /**
   * use to track open close state of learn more modal
   */
  @Output() learnMoreModalIsOpenClose = new EventEmitter();
  /**
   * For supporting label changes of Coverngence Warehouse Experience
   */
  @Input() isConvergenceExperience: boolean;

  MilestoneRollupConfig: any;

  constructor(
    private readonly _cdr: ChangeDetectorRef,
    private readonly contentPipe: RenderLabelPipe
  ) {
    this.MilestoneRollupConfig = setMilestoneRollupConfig();
  }

  /**
   * ngOnChanges lifecycle hook
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes.milestoneStatusData.currentValue) {
      if (this.variation === Variations.dashboard) {
        this._getDashboardMilestoneRollUpData();
      }
      if (this.variation === Variations.warehouse) {
        this._getWarehouseMilestoneRollUpData();
      }
    }
  }

  /**
   * Getting Milestone RollUp Data
   * @param milestoneRollupData  API Milestone RollupData
   * @param milestoneRollupConfigurations  Configurations
   */
  getMilestoneRollUpData(milestoneRollupData, milestoneRollupConfigurations) {
    this.rollupMetricsData = [];
    this.milestoneStatusConfig = milestoneRollupConfigurations;
    /**
     * Summary Type
     */
    this.summaryType = milestoneRollupData?.summaryType?.toLowerCase();
    /**
     * Shipments (All milestones)
     */
    this.shipments = +(milestoneRollupData?.totalCount
      ? milestoneRollupData.totalCount
      : 0);
    /**
     * Pushed total shipemnt into array with id and count
     */
    this.rollupMetricsData.push({
      id: ROLLUP_GRP_KEYS.shipments,
      count: this.shipments,
    });
    /**
     * Grouped shipment Status
     */
    for (const statusConfig of milestoneRollupConfigurations) {
      /**
       * Pushed all the data into array with id and count
       */
      this.rollupMetricsData.push({
        id: statusConfig.name,
        count: this._getTotalStatusCount(milestoneRollupData, statusConfig),
      });
    }
  }

  /**
   * Navigate to L2 page inbound/outbound
   * @param shipmentType shipmentType
   */
  navigateToL2Page(shipmentType) {
    if (!this.hideLink) {
      const url = `/${ROUTER_CONSTANTS.gldPlatform}/${
        ROUTER_CONSTANTS[shipmentType?.toLowerCase()]
      }`;
      this.elementClick.emit(shipmentType);
      NavigationUtility.navigate(null, url, true);
    }
  }

  /**
   * When user click on learn more text, open popup modal
   */
  openLearnMorePopUp() {
    this.learnMoreModalClicked.emit(true);
    this.showLearnMorePopUp = true;
    this.learnMoreModalIsOpenClose.emit('Open');
    this.refreshViewIfIE();
  }

  /**
   * after popupclose reset
   */
  onPopUpClose(e) {
    this.showLearnMorePopUp = false;
    this.learnMoreModalIsOpenClose.emit('Close');
    this.refreshViewIfIE();
  }

  /**
   * Detect changes on in case of IE
   */
  refreshViewIfIE() {
    // To refresh the view in IE
    if (UserAgentUtility.isIE()) {
      this._cdr.detectChanges();
    }
  }

  /**
   * Method to generate aria label.
   */
  getAriaLabel() {
    let ariaLabel =
      this.summaryType +
      ' ' +
      this.contentPipe.transform('lbl_learn_more_heading');
    for (const metricsData of this.rollupMetricsData) {
      ariaLabel +=
        ', ' +
        metricsData.count +
        ' ' +
        this.contentPipe.transform(
          'lbl_shipment_milestone_grp_' + metricsData.id
        );
    }
    return ariaLabel;
  }

  /**
   * getMilestoneRollUpData for warehouse dashboard
   */
  private _getWarehouseMilestoneRollUpData() {
    // get the warehouse milestone rollup config based on summary type

    this.getMilestoneRollUpData(
      this.milestoneStatusData,
      getWarehouseMilestoneRollupConfig(this.milestoneStatusData.summaryType)
    );
  }

  /**
   * getMilestoneRollUpData for dashboard
   */
  private _getDashboardMilestoneRollUpData() {
    /**
     * Dashboard Inbound Managed/Non-Managed Trans
     */
    if (this.isAcountTypeManagedInbound === true) {
      this.getMilestoneRollUpData(
        this.milestoneStatusData,
        this.MilestoneRollupConfig.dashboardInboundManagedTrans
      );
    } else if (this.isAcountTypeManagedInbound === false) {
      this.getMilestoneRollUpData(
        this.milestoneStatusData,
        this.MilestoneRollupConfig.dashboardInboundNonManagedTrans
      );
    }
    /**
     * Dashboard Outbound Managed/Non-Managed Trans
     */
    if (this.isAcountTypeManagedOutbound === true) {
      this.getMilestoneRollUpData(
        this.milestoneStatusData,
        this.MilestoneRollupConfig.dashboardOutboundManagedTrans
      );
    } else if (this.isAcountTypeManagedOutbound === false) {
      this.getMilestoneRollUpData(
        this.milestoneStatusData,
        this.MilestoneRollupConfig.dashboardOutboundNonManagedTrans
      );
    }
  }

  /** --------------Showing shipment milestone Rollup status ---------------------------- */

  /**
   * Calculate total Status count
   * @param milestoneRollupData  API Milestone RollupData
   * @param statusConfig  Status/Milestone Configuration
   */
  private _getTotalStatusCount(milestoneRollupData, statusConfig) {
    let totalRollupCount = 0;
    if (milestoneRollupData?.milestoneStatusSummary) {
      for (const milestoneApiRes of milestoneRollupData.milestoneStatusSummary) {
        if (
          statusConfig.statusMapping.indexOf(
            milestoneApiRes.id?.toLowerCase()
          ) !== -1
        ) {
          totalRollupCount += +(milestoneApiRes.count
            ? milestoneApiRes.count
            : 0);
        }
      }
    }
    return totalRollupCount;
  }
}
