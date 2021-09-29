// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

import DateUtility from '../utils/date';
import { CUSTOM_RANGE_OPTION_VALUE } from '../constants/global.constant';
import { MilestoneStatus } from '../constants';

import { ShipmentCountsKeys } from './movement-shipment-group-count.config';

export const ShipmentDrilldownKeys = {
  shipmentCreation: 'shipmentCreation',
  shipmentBooked: 'shipmentBooked',
  scheduledShip: 'scheduledShip',
  status: 'status',
  pickup: 'pickup',
  scheduleDelivery: 'scheduleDelivery',
  actualDelivery: 'actualDelivery',
  undeliveredExceptions: 'createdOn',
  financialSummary: 'createdOn',
  cancelledShipmentsCard: 'createdOn',
};

const dateTypeFilterLast60Days = {
  type: 'relative',
  range: -60,
};

export const dateTypeFilterLastNDays = {
  type: 'relative',
  range: -60,
};

export const dateTypeFilterLast7DaysExcludingToday = {
  type: 'custom',
  startDate: '',
  endDate: '',
};

export const dateTypeFilterLastNDaysExcludingToday = {
  type: 'custom',
  startDate: '',
  endDate: '',
};

const dateTypeFilterNext7Days = {
  type: 'relative',
  range: 7,
};

export const dateTypeFilterNextNDaysToday = {
  type: 'custom',
  startDate: '',
  endDate: '',
};

// Range is used when type is relative
const dateTypeFilterCustom = (dateRange) => {
  return {
    type: dateRange.value === CUSTOM_RANGE_OPTION_VALUE ? 'custom' : 'relative',
    range: -dateRange.value,
    startDate: dateRange.startDate,
    endDate: dateRange.endDate,
  };
};

const shipmentCreationFilter = {
  key: ShipmentDrilldownKeys.shipmentCreation,
  value: dateTypeFilterLast60Days,
};

const shipmentCreationFilterHLD = (dateRange, key, excludeToday = false) => {
  if (excludeToday && dateRange.value !== CUSTOM_RANGE_OPTION_VALUE) {
    dateRange = {
      ...dateRange,
      ...DateUtility.getDateRange(dateRange.value, 1),
    };
    dateRange.value = CUSTOM_RANGE_OPTION_VALUE;
  }
  return {
    key,
    value: dateTypeFilterCustom(dateRange),
  };
};

const shipmentBookedFilter = (bookedDateRange) => {
  return {
    key: ShipmentDrilldownKeys.shipmentBooked,
    value: dateTypeFilterCustom(bookedDateRange),
  };
};

export const inTransitMilestonesStatus = {
  importCustoms: 'ImportCustoms',
  exportCustoms: 'ExportCustoms',
};

export const ShipmentCountFilterDrilldownConfigHLD = (dateRange) => {
  return {
    [ShipmentCountsKeys.totalCount]: [
      shipmentCreationFilterHLD(
        dateRange,
        ShipmentDrilldownKeys.shipmentCreation
      ),
    ],
    [ShipmentCountsKeys.shipmentsInTransitSummary]: [
      shipmentCreationFilterHLD(
        dateRange,
        ShipmentDrilldownKeys.shipmentCreation
      ),
      {
        key: ShipmentDrilldownKeys.status,
        value: [
          MilestoneStatus.inTransit.toLowerCase(),
          MilestoneStatus.customs.toLowerCase(),
        ],
      },
    ],
    [ShipmentCountsKeys.shipmentsDeliveredSummary]: [
      shipmentCreationFilterHLD(
        dateRange,
        ShipmentDrilldownKeys.shipmentCreation
      ),
      {
        key: ShipmentDrilldownKeys.status,
        value: [MilestoneStatus.delivered.toLowerCase()],
      },
    ],
    [ShipmentCountsKeys.scheduleToShipSummary]: [
      shipmentCreationFilter,
      shipmentCreationFilterHLD(dateRange, ShipmentDrilldownKeys.scheduledShip),
      {
        key: ShipmentDrilldownKeys.status,
        value: [
          MilestoneStatus.pending.toLowerCase(),
          MilestoneStatus.rated.toLowerCase(),
          MilestoneStatus.booked.toLowerCase(),
        ],
      },
    ],
    [ShipmentCountsKeys.scheduledToDeliverSummary]: [
      shipmentCreationFilter,
      shipmentCreationFilterHLD(
        dateRange,
        ShipmentDrilldownKeys.scheduleDelivery
      ),
      {
        key: ShipmentDrilldownKeys.status,
        value: [
          MilestoneStatus.pending.toLowerCase(),
          MilestoneStatus.rated.toLowerCase(),
          MilestoneStatus.booked.toLowerCase(),
          MilestoneStatus.inTransit.toLowerCase(),
          MilestoneStatus.customs.toLowerCase(),
        ],
      },
    ],
    [ShipmentCountsKeys.missedPickupSummary]: [
      shipmentCreationFilter,
      shipmentCreationFilterHLD(
        dateRange,
        ShipmentDrilldownKeys.scheduledShip,
        true
      ),
      {
        key: ShipmentDrilldownKeys.status,
        value: [
          MilestoneStatus.pending.toLowerCase(),
          MilestoneStatus.rated.toLowerCase(),
          MilestoneStatus.booked.toLowerCase(),
        ],
      },
    ],
    [ShipmentCountsKeys.missedDeliveredSummary]: [
      shipmentCreationFilter,
      shipmentCreationFilterHLD(
        dateRange,
        ShipmentDrilldownKeys.scheduleDelivery,
        true
      ),
      {
        key: ShipmentDrilldownKeys.status,
        value: [
          MilestoneStatus.pending.toLowerCase(),
          MilestoneStatus.rated.toLowerCase(),
          MilestoneStatus.booked.toLowerCase(),
          MilestoneStatus.inTransit.toLowerCase(),
          MilestoneStatus.customs.toLowerCase(),
        ],
      },
    ],
    [ShipmentCountsKeys.undeliveredExceptions]: [
      shipmentCreationFilterHLD(
        dateRange,
        ShipmentDrilldownKeys.undeliveredExceptions
      ),
    ],
    [ShipmentCountsKeys.financialSummary]: [
      shipmentCreationFilterHLD(
        dateRange,
        ShipmentDrilldownKeys.financialSummary
      ),
    ],
    [ShipmentCountsKeys.cancelledShipmentsCard]: [
      shipmentCreationFilterHLD(
        dateRange,
        ShipmentDrilldownKeys.cancelledShipmentsCard
      ),
    ],
  };
};

export const ShipmentCountFilterDrilldownConfigGFF = (bookedDateRange) => {
  return {
    [ShipmentCountsKeys.totalCount]: [shipmentBookedFilter(bookedDateRange)],
    [ShipmentCountsKeys.scheduleToShipSummary]: [
      shipmentCreationFilter,
      {
        key: ShipmentDrilldownKeys.scheduledShip,
        value: dateTypeFilterNext7Days,
      },
    ],
    [ShipmentCountsKeys.missedPickupSummary]: [
      shipmentCreationFilter,
      {
        key: ShipmentDrilldownKeys.pickup,
        value: dateTypeFilterLast7DaysExcludingToday,
      },
      {
        key: ShipmentDrilldownKeys.status,
        value: [
          MilestoneStatus.booked.toLowerCase(),
          MilestoneStatus.pickup.toLowerCase(),
        ],
      },
    ],
    [ShipmentCountsKeys.shipmentsInTransitSummary]: [
      shipmentBookedFilter(bookedDateRange),
      {
        key: ShipmentDrilldownKeys.status,
        value: [
          MilestoneStatus.pickup.toLowerCase(),
          MilestoneStatus.departure.toLowerCase(),
          MilestoneStatus.arrival.toLowerCase(),
          MilestoneStatus.importCustoms.toLowerCase(),
          MilestoneStatus.exportCustoms.toLowerCase(),
        ],
      },
    ],
    [ShipmentCountsKeys.shipmentsBookedSummary]: [
      shipmentBookedFilter(bookedDateRange),
      {
        key: ShipmentDrilldownKeys.status,
        value: [MilestoneStatus.booked.toLowerCase()],
      },
    ],
    [ShipmentCountsKeys.scheduledToDeliverSummary]: [
      shipmentCreationFilter,
      {
        key: ShipmentDrilldownKeys.scheduleDelivery,
        value: dateTypeFilterNext7Days,
      },
      {
        key: ShipmentDrilldownKeys.status,
        value: [
          MilestoneStatus.booked.toLowerCase(),
          MilestoneStatus.pickup.toLowerCase(),
          MilestoneStatus.departure.toLowerCase(),
          MilestoneStatus.arrival.toLowerCase(),
          MilestoneStatus.customs.toLowerCase(),
        ],
      },
    ],
    [ShipmentCountsKeys.missedDeliveredSummary]: [
      shipmentCreationFilter,
      {
        key: ShipmentDrilldownKeys.scheduleDelivery,
        value: dateTypeFilterLast7DaysExcludingToday,
      },
      {
        key: ShipmentDrilldownKeys.status,
        value: [
          MilestoneStatus.booked.toLowerCase(),
          MilestoneStatus.pickup.toLowerCase(),
          MilestoneStatus.departure.toLowerCase(),
          MilestoneStatus.arrival.toLowerCase(),
          MilestoneStatus.customs.toLowerCase(),
        ],
      },
    ],
    [ShipmentCountsKeys.shipmentsDeliveredSummary]: [
      shipmentBookedFilter(bookedDateRange),
      {
        key: ShipmentDrilldownKeys.status,
        value: [MilestoneStatus.delivered.toLowerCase()],
      },
    ],
  };
};
