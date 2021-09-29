// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// Shipment status bar config

import { ShipmentTypeConfig } from '../../../global-config/config';
import {
  ROLLUP_GRP_KEYS,
  SHIPMENT_STATUS,
} from '../../../constants/global.constant';
import { AccessControlUtility } from '../../../utils/access-control.util';

import {
  warehouseMilestoneRollupInboundConfig,
  warehouseMilestoneRollupOutboundConfig,
} from './milestone-rollup-inclusion-list.config';

/**
 * shipment status variation
 */
export const Variations = {
  dashboard: 'dashboard',
  warehouse: 'warehouse',
};

/**
 * Set the rollup config for milestones
 */
export const setMilestoneRollupConfig = () => {
  const isPostSalesCustomer = AccessControlUtility.isPostSalesCustomer();
  const isFinishedGoodsCustomer = AccessControlUtility.isFinishedGoodsCustomer();
  const hasFtzAccess = AccessControlUtility.hasFtzAccess();
  return {
    /**
     * Dashboard Inbound Managed Trans
     * Shipments (All milestones)
     * In Transit = BOOKING + DEPARTURE + CUSTOMS + DELIVERY
     * Receiving = RECEIVING
     * Putaway = PUTAWAY
     */
    dashboardInboundManagedTrans: [
      {
        name: ROLLUP_GRP_KEYS.inTransit,
        statusMapping: [
          ...(isFinishedGoodsCustomer
            ? [
                SHIPMENT_STATUS.pending,
                SHIPMENT_STATUS.rated,
                SHIPMENT_STATUS.booked,
                SHIPMENT_STATUS.in_transit,
                SHIPMENT_STATUS.customs,
                SHIPMENT_STATUS.delivered,
                SHIPMENT_STATUS.asn_created,
                ...(hasFtzAccess ? [SHIPMENT_STATUS.ftz] : []),
              ]
            : [
                SHIPMENT_STATUS.booking,
                SHIPMENT_STATUS.in_transit,
                SHIPMENT_STATUS.customs,
                SHIPMENT_STATUS.delivery,
                SHIPMENT_STATUS.asn_created,
                ...(hasFtzAccess ? [SHIPMENT_STATUS.ftz] : []),
              ]),
        ],
      },
      {
        name: ROLLUP_GRP_KEYS.receiving,
        statusMapping: [SHIPMENT_STATUS.receiving],
      },
      {
        name: ROLLUP_GRP_KEYS.putaway,
        statusMapping: [SHIPMENT_STATUS.putaway],
      },
    ],

    /**
     * Dashboard Inbound Non-Managed Trans
     * Shipments = (All milestones)
     * Receiving = RECEIVING
     * Putaway = PUTAWAY
     */
    dashboardInboundNonManagedTrans: [
      {
        name: ROLLUP_GRP_KEYS.asn_created,
        statusMapping: [SHIPMENT_STATUS.asn_created],
      },
      {
        name: ROLLUP_GRP_KEYS.receiving,
        statusMapping: [SHIPMENT_STATUS.receiving],
      },
      {
        name: ROLLUP_GRP_KEYS.putaway,
        statusMapping: [SHIPMENT_STATUS.putaway],
      },
    ],

    /**
     * Dashboard Outbound Managed Trans
     * Shipments (Count of All milestones)
     * In Process = CREATED+ BOOKING+ WAREHOUSE
     * In Transit = DEPARTURE + CUSTOMS
     * Delivered = DELIVERY
     */
    dashboardOutboundManagedTrans: [
      {
        name: ROLLUP_GRP_KEYS.inProcess,
        statusMapping: [
          SHIPMENT_STATUS.created,
          ...(isFinishedGoodsCustomer
            ? [
                SHIPMENT_STATUS.pending,
                SHIPMENT_STATUS.rated,
                SHIPMENT_STATUS.booked,
              ]
            : [SHIPMENT_STATUS.booking]),
          SHIPMENT_STATUS.warehouse,
        ],
      },
      {
        name: ROLLUP_GRP_KEYS.inTransit,
        statusMapping: [
          ...(isFinishedGoodsCustomer
            ? [SHIPMENT_STATUS.in_transit]
            : [SHIPMENT_STATUS.departure]),
          ...(isPostSalesCustomer ? [] : [SHIPMENT_STATUS.customs]),
        ],
      },
      {
        name: ROLLUP_GRP_KEYS.delivered,
        statusMapping: [
          ...(isFinishedGoodsCustomer
            ? [SHIPMENT_STATUS.delivered]
            : [SHIPMENT_STATUS.delivery]),
        ],
      },
    ],

    /**
     * Dashboard Outbound Non-Managed Trans
     * Shipments (All milestones)
     * Created = CREATED
     * Warehouse = WAREHOUSE (note that Booking is not valid for Non-Managed Trans accounts)
     * Departure = DEPARTURE
     */
    dashboardOutboundNonManagedTrans: [
      {
        name: ROLLUP_GRP_KEYS.created,
        statusMapping: [SHIPMENT_STATUS.created],
      },
      {
        name: ROLLUP_GRP_KEYS.warehouse,
        statusMapping: [SHIPMENT_STATUS.warehouse],
      },
      {
        name: ROLLUP_GRP_KEYS.inTransit,
        statusMapping: [SHIPMENT_STATUS.in_transit],
      },
    ],
  };
};

/**
 * Returns the  warehouse milestone rollup config based on the shimpment type
 * @param shipmentType - It can be inbound or outbound
 */
export const getWarehouseMilestoneRollupConfig = (shipmentType) => {
  let rollupConfig;
  switch (shipmentType) {
    case ShipmentTypeConfig.inbound:
      rollupConfig =
        AccessControlUtility.getCurrentFieldMapping(
          warehouseMilestoneRollupInboundConfig
        ) || [];
      break;
    case ShipmentTypeConfig.outbound:
      rollupConfig =
        AccessControlUtility.getCurrentFieldMapping(
          warehouseMilestoneRollupOutboundConfig
        ) || [];
      break;
  }
  return rollupConfig;
};
