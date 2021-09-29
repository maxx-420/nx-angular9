// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// milestone rollup config for inbound and outbound
import {
  ROLLUP_GRP_KEYS,
  SHIPMENT_STATUS,
} from '../../../constants/global.constant';

const warehouseOutboundFGMOConfig = [
  {
    name: ROLLUP_GRP_KEYS.inProcess,
    statusMapping: [
      SHIPMENT_STATUS.created,
      SHIPMENT_STATUS.pending,
      SHIPMENT_STATUS.rated,
      SHIPMENT_STATUS.booked,
      SHIPMENT_STATUS.warehouse,
    ],
  },
  {
    name: ROLLUP_GRP_KEYS.inTransit,
    statusMapping: [SHIPMENT_STATUS.in_transit, SHIPMENT_STATUS.customs],
  },
  {
    name: ROLLUP_GRP_KEYS.delivered,
    statusMapping: [SHIPMENT_STATUS.delivered],
  },
];
const warehouseOutboundPSMOConfig = [
  {
    name: ROLLUP_GRP_KEYS.inProcess,
    statusMapping: [
      SHIPMENT_STATUS.created,
      SHIPMENT_STATUS.booking,
      SHIPMENT_STATUS.warehouse,
    ],
  },
  {
    name: ROLLUP_GRP_KEYS.inTransit,
    statusMapping: [SHIPMENT_STATUS.departure, SHIPMENT_STATUS.customs],
  },
  {
    name: ROLLUP_GRP_KEYS.delivered,
    statusMapping: [SHIPMENT_STATUS.delivered],
  },
];

const warehouseOutboundNMOConfig = [
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
];

const warehouseInboundConfig = [
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
];
export const warehouseMilestoneRollupOutboundConfig = {
  // same config for FG MO
  'GLD@FG@MI_MO': warehouseOutboundFGMOConfig,
  'GLD@FG@NMI_MO': warehouseOutboundFGMOConfig,
  'GLD@FG@MI_MO_MM': warehouseOutboundFGMOConfig,
  'GLD_GFF@FG@NMI_MO_FS': warehouseOutboundFGMOConfig,
  // same config for PS MO
  'GLD@PS@MI_MO': warehouseOutboundPSMOConfig,
  'GLD@PS@NMI_MO': warehouseOutboundPSMOConfig,
  'GLD_GFF@PS@NMI_MO_FS': warehouseOutboundPSMOConfig,

  // same for GLD/HLD NMO
  'GLD@*@MI_NMO': warehouseOutboundNMOConfig,
  'GLD@*@NMI_NMO': warehouseOutboundNMOConfig,
  'GLD@FG@MI_NMO_MM': warehouseOutboundFGMOConfig,
  'HLD@*@MI_MO_MM': warehouseOutboundFGMOConfig,
  'HLD@*@MI_NMO_MM': warehouseOutboundFGMOConfig,
  'HLD@*@MI_NMO': warehouseOutboundNMOConfig,
  'HLD@*@NMI_NMO': warehouseOutboundNMOConfig,
  'HLD@*@*': warehouseOutboundFGMOConfig,
  'GLD_GFF@FG@NMI_NMO_FS': warehouseOutboundNMOConfig,
  'GLD_GFF@FG@NMI_MO_FS_MM': warehouseOutboundFGMOConfig,
  'GLD_GFF@FG@NMI_NMO_FS_MM': warehouseOutboundNMOConfig,
  'GLD_GFF@FG@MI_MO_FS_MM': warehouseOutboundFGMOConfig,
  'GLD_GFF@FG@MI_NMO_FS_MM': warehouseOutboundNMOConfig,
  'GLD_GFF@FG@FS_MM': warehouseOutboundFGMOConfig,
  'HLD_GFF@HEALTH@NMI_NMO_FS': warehouseOutboundNMOConfig,
  'HLD_GFF@HEALTH@MI_MO_FS_MM': warehouseOutboundFGMOConfig,
  'HLD_GFF@HEALTH@NMI_MO_FS_MM': warehouseOutboundFGMOConfig,
  'HLD_GFF@HEALTH@NMI_NMO_FS_MM': warehouseOutboundNMOConfig,
  'HLD_GFF@HEALTH@MI_NMO_FS_MM': warehouseOutboundNMOConfig,
  'HLD_GFF@HEALTH@FS_MM': warehouseOutboundFGMOConfig,
  'HLD_GFF@HEALTH@NMI_MO_FS': warehouseOutboundFGMOConfig,
};

export const warehouseMilestoneRollupInboundConfig = {
  // same for all inbound cases NMI MI
  'GLD@*@*': warehouseInboundConfig,
  'HLD@*@*': warehouseInboundConfig,
  'GLD_GFF@*@*': warehouseInboundConfig,
  'HLD_GFF@*@*': warehouseInboundConfig,
};
