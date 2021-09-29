// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// Shipment utils

import { ACCESS_CONTROL_CONFIG } from '../global-config/access-control.config';
import { ACCOUNT_TYPE_CONSTANTS } from '../constants/account-types.constant';

import { UserAgentUtility } from './user-agent.util';
import {
  CARRIER_LINK_REDIRECTION,
  EXTERNAL_CARRIERS_LIST,
  MILESTONE_STATUS,
  NOT_AVAILABLE,
  SHIPMENT_ID,
  SHIPMENT_STATUS,
  SHIPMENT_TYPE,
  UPS_CARRIER_CODE,
  UPS_CARRIER_FULL_NAME,
} from './../constants/global.constant';
import { default as NavigationUtility } from './navigationUtil';
import { default as ViewportUtility } from './viewport';
import compareDates from './compareDates';
import { VIEWPORT_NAMES } from './../constants/viewport.constant';
import { SHIPMENT_TYPES_CONFIG } from './../global-config/config';
import { SHIPMENT_TYPES_CONSTANTS } from './../constants/shipment-types.constant';
import { default as compareMilestonesBasedOnOrder } from './compareMilestonesBasedOnOrder';
import getRowClickedData from './getRowClickedData';
import { AccessControlUtility } from './access-control.util';
import { SHIPMENT_TYPES_SHORTHAND } from './../constants/shipment-types.constant';
import CommonUtility from './commonUtil';

const ShipmentUtility = {
  /**
   * method to get milestone status
   * @param step current milestone
   * @returns current status of milestone
   */
  getMilestoneStatus(step) {
    let status;
    if (step.milestoneCompletionDateTime) {
      status = MILESTONE_STATUS.completed;
    } else if (step.activityCount > 0) {
      status = MILESTONE_STATUS.inProgress;
    } else {
      status = MILESTONE_STATUS.upcoming;
    }
    return status;
  },

  /**
   * method to sort milestones array and add milestone status
   * @param milestones milestone array
   * @param shipmentType this is optional parameter
   * @param milestoneStatus this is optional parameter
   * @returns sorted milestones array with status field added with each milestone
   */
  sortMilestonesAndAddStatusField(
    milestones,
    shipmentType = null,
    milestoneStatus = []
  ) {
    let markPreviousStepsCompleted = false;
    milestones = milestones.sort(compareMilestonesBasedOnOrder);

    const isShipmentManagedOutbound =
      shipmentType === SHIPMENT_TYPES_CONSTANTS.managedOutbound;

    for (let i = milestones.length - 1; i >= 0; i--) {
      milestones[i] = {
        ...milestones[i],
        status: markPreviousStepsCompleted
          ? MILESTONE_STATUS.completed
          : ShipmentUtility.getMilestoneStatus(milestones[i]),
      };

      // For managed outbound shipment, if Departure milestone is completed then mark previous milestones as completed (UPSGLD-2901)
      if (
        isShipmentManagedOutbound &&
        milestones[i].id?.toLowerCase() === SHIPMENT_STATUS.departure &&
        milestones[i].status === MILESTONE_STATUS.completed
      ) {
        markPreviousStepsCompleted = true;
      }

      // if any milestone in milestoneStatus is completed then mark previous milestones as completed (UPSGLD-3877)
      if (milestones[i].status === MILESTONE_STATUS.completed) {
        const foundStatus = milestoneStatus.find(
          (status) => status === milestones[i].id?.toLowerCase()
        );
        if (foundStatus) {
          markPreviousStepsCompleted = true;
        }
      }

      // When shipment is completed (last milestone completed), mark all previous steps as completed (UPSGLD-2901)
      if (
        i === milestones.length - 1 &&
        milestones[i].status === MILESTONE_STATUS.completed
      ) {
        markPreviousStepsCompleted = true;
      }
    }

    return milestones;
  },

  /**
   * method to parse address
   * @param milestoneData milestone data
   * @returns parsed address
   */
  parseAddresses(milestoneData) {
    let addresses =
      milestoneData &&
      milestoneData.primaryDetail &&
      milestoneData.primaryDetail.addresses;
    /* istanbul ignore else */
    if (addresses) {
      addresses = addresses.reduce((res, item) => {
        res[item.type?.toLowerCase()] = item;
        return res;
      }, {});

      return addresses;
    }
    return undefined;
  },

  /**
   * method to get string address
   * @param address address to format
   * @returns formatted item
   */
  getStringAddressForGoogleMap(address: any) {
    let formattedItem = `${address.line1 || ''},+${address.line2 || ''},+${
      address.city || ''
    },+${address.state || ''},+${address.country || ''},+${
      address.zipCode || ''
    }`;
    formattedItem = formattedItem.replace(/ /g, '+');
    return encodeURIComponent(formattedItem);
  },

  /**
   * to go back to milestones list
   * @param isFromSearch is user coming from search page
   * @param selectedStep current selected step
   * @param router Router object
   * @param isShipmentClicked boolean to check if shipment is clicked or not
   * @param shipmentId shipment id
   * @returns property isShipmentClicked and selectedStep
   */
  goBackToList(selectedStep, router, isShipmentClicked, shipmentId) {
    // to navigate to L2 page
    if (
      selectedStep === '' ||
      !ViewportUtility.checkViewport(VIEWPORT_NAMES.mobile)
    ) {
      NavigationUtility.navigate(router, ['/'], false);
    }
    // to navigate to the milestone list
    else {
      if (selectedStep === SHIPMENT_ID) {
        isShipmentClicked = false;
      }
      router.navigate([shipmentId]);
      selectedStep = '';
    }
    return {
      isShipmentClicked,
      selectedStep,
    };
  },

  /**
   * to go to carrier shipment details
   * @param shipmentNumber carrier shipment number
   * @param analyticsService AnalyticsService object in order to track link click
   */
  onCarrierShipmentLinkClick(
    shipmentNumber,
    analyticsService?: any,
    showExternalCarrier = false,
    rowData = null
  ) {
    let url = CARRIER_LINK_REDIRECTION.ups.replace(
      '%%tracking_number%%',
      shipmentNumber
    );

    // if rowData is there then select tracking link based on carrier name or use default of UPS
    if (rowData?.carrierName && showExternalCarrier) {
      Object.keys(CARRIER_LINK_REDIRECTION).forEach((key) => {
        if (rowData.carrierName?.toLowerCase().includes(key)) {
          url = CARRIER_LINK_REDIRECTION[key].replace(
            '%%tracking_number%%',
            shipmentNumber
          );
        }
      });
    }

    if (analyticsService) {
      analyticsService.createLinkClickTagObject(
        url,
        'Tracking',
        'To track shipment',
        'Internal',
        { link_section: 'Carrier Shipment Tracking' }
      );
    }
    window.open(url, '_blank');
  },

  /**
   * check if carrier tracking link should be shown or not
   * @param carrierCode carrier code
   * @param carrierName carrier name
   * @param showExternalCarrier check if external carriers are to be shown or not
   */
  showCarrierLink(carrierCode, carrierName, showExternalCarrier = false) {
    if (carrierCode?.toUpperCase().indexOf(UPS_CARRIER_CODE) >= 0) {
      return true;
    }

    if (
      carrierName?.toUpperCase().indexOf(UPS_CARRIER_CODE) >= 0 ||
      carrierName?.toUpperCase().indexOf(UPS_CARRIER_FULL_NAME) >= 0
    ) {
      return true;
    }

    // ONLY FOR POST SALES; if these external carriers present then show link
    if (showExternalCarrier) {
      let externalCarrierFound = false;
      EXTERNAL_CARRIERS_LIST.forEach((key) => {
        if (carrierName?.toLowerCase().includes(key)) {
          externalCarrierFound = true;
        }
      });

      return externalCarrierFound;
    }

    return false;
  },

  /**
   * method to check if shipment service level contains 'UPS'
   * @param shipmentServiceLevel shipment service level
   */
  isUPSShipmentServiceLevel(shipmentServiceLevel) {
    return shipmentServiceLevel?.toUpperCase().indexOf(UPS_CARRIER_CODE) >= 0;
  },

  /**
   * filters `carrierShipmentsTableData`;
   * removes rows where `shipmentNumber` is blank/Null/NA.
   * @param carrierShipmentsTableData table data for carrier shipment table on L3
   */
  filterCarrierShipmentsTableData(carrierShipmentsTableData) {
    if (!carrierShipmentsTableData) {
      return carrierShipmentsTableData;
    }

    return carrierShipmentsTableData.filter((row) => {
      return (
        row.shipmentNumber &&
        row.shipmentNumber.trim() &&
        row.shipmentNumber.trim().toLowerCase() !== NOT_AVAILABLE
      );
    });
  },

  /**
   * creates formatted data for line chart
   */
  formatDateSummaryData(summary: any) {
    if (UserAgentUtility.isIE()) {
      return summary
        .slice()
        .map((item) => {
          return {
            ...item,
            date: item.date.replace(' ', 'T'),
          };
        })
        .sort(compareDates);
    } else {
      return summary.slice().sort(compareDates);
    }
  },
  /**
   * method to get cancellation alert data
   * @param shipmentData shipment data
   */
  getCancellationAlertData(primaryDetailInfo, cancellationStatus) {
    return {
      alertDateTime: primaryDetailInfo?.cancellationDateTime,
      alertMessage: primaryDetailInfo?.cancellationReason
        ? cancellationStatus +
          ': ' +
          primaryDetailInfo?.cancellationReason?.trim()
        : cancellationStatus,
    };
  },

  /**
   * method to get shipment type
   * @param module name (inbound or outbound)
   * @param templateType template type
   */
  getShipmentType(module, templateType) {
    const shipmentConfig = AccessControlUtility.getCurrentFieldMapping(
      SHIPMENT_TYPES_CONFIG
    );
    if (module === SHIPMENT_TYPE.inbound) {
      return shipmentConfig[SHIPMENT_TYPES_SHORTHAND.ManagedInbound]?.indexOf(
        templateType
      ) !== -1
        ? SHIPMENT_TYPES_CONSTANTS.managedInbound
        : SHIPMENT_TYPES_CONSTANTS.nonManagedInbound;
    } else if (module === SHIPMENT_TYPE.outbound) {
      return shipmentConfig[SHIPMENT_TYPES_SHORTHAND.ManagedOutbound]?.indexOf(
        templateType
      ) !== -1
        ? SHIPMENT_TYPES_CONSTANTS.managedOutbound
        : SHIPMENT_TYPES_CONSTANTS.nonManagedOutbound;
    }
    return undefined;
  },

  /**
   * method to format financial claims data from API resposne to table format
   * @param data the claims array
   */
  formatFinancialData(data = []) {
    const hasClaim = this.checkEmptyObject(data[0]);
    const formattedClaimsData = [];
    if (hasClaim) {
      for (const claim of data) {
        formattedClaimsData.push({
          ...claim,
          claimAmount: `${claim.claimAmountCurrency ?? ''} ${
            CommonUtility.getFormattedCostString(claim.claimAmount) ?? ''
          }`,
          claimPaidAmount: `${claim.claimAmountPaidCurrency ?? ''} ${
            CommonUtility.getFormattedCostString(claim.claimAmountPaid) ?? ''
          }`,
        });
      }
    }
    return formattedClaimsData;
  },

  /**
   * Method to check if object values are empty strings
   * @param obj Any object
   */
  checkEmptyObject(obj = {}) {
    let hasData = false;
    Object.keys(obj).forEach((key) => {
      if (obj[key]) {
        hasData = true;
      }
    });
    return hasData;
  },

  /**
   * Method to form query params object for shipment listing to movement shipment details navigation.
   * @param data Shipment listing row data
   * @returns Shipment details Query params
   */
  getMovementShipmentQueryParams(data): { [key: string]: string } {
    let queryParams: { [key: string]: string } = {
      productLine: data.productLine,
      accountType: data.accountType,
    };

    if (data.productLine === ACCESS_CONTROL_CONFIG.productLine.gff) {
      // Add upsFileNumber and upsOffice in query params in case of GFF shipment
      queryParams = {
        ...queryParams,
        upsFileNumber: data.upsFileNumber,
        upsOffice: data.upsOffice,
      };
    }

    return queryParams;
  },

  /**
   * Navigate from shipment listing to movement shipment details.
   * @param data Shipment listing row data
   * @param url Shipment details url
   * @param prop Property of shipment listing row data that contains shipment number
   * @param router Angular router object
   * @param state Angular router state
   */
  navigateToMovementShipment(data, url, prop, router, state) {
    const queryParams = this.getMovementShipmentQueryParams(data);
    getRowClickedData(
      data,
      prop,
      router,
      {
        state,
        queryParams,
      },
      url
    );
  },

  /**
   *
   * For Managed Inbound, ShipmentTypes will be inbound
   * For Post Sales + Managed Outbound, ShipmentTypes will be outbound
   * For Managed Inbound + Managed Movement, ShipmentTypes will empty array
   * By default, ShipmentTypes will be Movement
   *
   */
  getShipmentTypes(checkForOutbound = false) {
    let shipmentTypes = [ACCOUNT_TYPE_CONSTANTS.categories.movement];

    if (AccessControlUtility.isManagedInbound()) {
      shipmentTypes = [ACCOUNT_TYPE_CONSTANTS.categories.inbound];
    }
    if (
      AccessControlUtility.isManagedMovement() &&
      AccessControlUtility.isManagedInbound()
    ) {
      shipmentTypes = [];
    }
    if (
      checkForOutbound &&
      AccessControlUtility.isPostSalesCustomer() &&
      AccessControlUtility.isManagedOutbound()
    ) {
      shipmentTypes = [ACCOUNT_TYPE_CONSTANTS.categories.outbound];
    }
    return shipmentTypes;
  },

  /**
   * Returns Shipment Types for Movement Shipments
   */
  getConvergenceShipmentType(): string[] {
    const isMI: boolean = AccessControlUtility.isManagedInbound();
    const isMM: boolean = AccessControlUtility.isManagedMovement();
    const shipmentTypes: string[] = [];
    if (isMM) {
      shipmentTypes.push(ACCOUNT_TYPE_CONSTANTS.categories.movement);
    }
    if (isMI) {
      shipmentTypes.push(ACCOUNT_TYPE_CONSTANTS.categories.inbound);
    }
    return shipmentTypes;
  },
};

export default ShipmentUtility;
