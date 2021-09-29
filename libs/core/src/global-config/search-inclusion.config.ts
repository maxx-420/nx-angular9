// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { IS_CUSTOM_ENTRIES_SEARCH_ALLOWED } from '../constants';

import { INVENTORY_SEARCHBY } from './search.config';
import { SEARCH_BY_INVENTORY_NO } from './../constants/global.constant';

const searchByOptionsForHLDMIMM = [
  { value: 'customerPONumber', viewValue: 'lbl_searchby_customerPONumber' },
  { value: 'shipmentNumber', viewValue: 'lbl_searchby_shipmentNumber' },
  { value: 'referenceNumber', viewValue: 'lbl_searchby_referenceNumber' },
  {
    value: 'carrierShipmentNumber',
    viewValue: 'lbl_searchby_carrierShipmentNumber',
  },
  {
    value: 'shipmentLotNumber,shipmentBatchNumber',
    viewValue: 'dpf_search_shipmentLotAndBatchNumber',
  },
  {
    value: 'shipmentSerialNumber',
    viewValue: 'lbl_searchby_shipmentSerialNumber',
  },
  { value: 'holdStatus', viewValue: 'lbl_searchby_holdStatus' },
  { value: 'clientASNNumber', viewValue: 'lbl_searchby_clientASNNumber' },
  { value: 'upsASNNumber', viewValue: 'lbl_searchby_upsASNNumber' },
  { value: 'itemNumber', viewValue: 'lbl_searchby_itemNumber' },
  { value: 'itemDescription', viewValue: 'lbl_searchby_itemDescription' },
  { value: SEARCH_BY_INVENTORY_NO, viewValue: 'dpf_searchby_inventoryBatch' },
];

const searchByOptionsForGLDMIMM = [
  { value: 'shipmentNumber', viewValue: 'lbl_searchby_shipmentNumber' },
  { value: 'customerPONumber', viewValue: 'lbl_searchby_customerPONumber' },
  { value: 'referenceNumber', viewValue: 'lbl_searchby_referenceNumber' },
  {
    value: 'carrierShipmentNumber',
    viewValue: 'lbl_searchby_carrierShipmentNumber',
  },
  { value: 'shipmentLotNumber', viewValue: 'lbl_searchby_shipmentLotNumber' },
  {
    value: 'shipmentSerialNumber',
    viewValue: 'lbl_searchby_shipmentSerialNumber',
  },
  { value: 'holdStatus', viewValue: 'lbl_searchby_holdStatus' },
  { value: 'clientASNNumber', viewValue: 'lbl_searchby_clientASNNumber' },
  { value: 'upsASNNumber', viewValue: 'lbl_searchby_upsASNNumber' },
  { value: 'itemNumber', viewValue: 'lbl_searchby_itemNumber' },
  { value: 'itemDescription', viewValue: 'lbl_searchby_itemDescription' },
];

const searchByOptionsForFSMM = [
  { value: 'customerPONumber', viewValue: 'lbl_searchby_customerPONumber' },
  { value: 'shipmentNumber', viewValue: 'lbl_searchby_GFF_shipmentNumber' },
  { value: 'referenceNumber', viewValue: 'lbl_searchby_referenceNumber' },
  {
    value: 'carrierShipmentNumber',
    viewValue: 'lbl_searchby_carrierShipmentNumber',
  },
  { value: 'shipmentLotNumber', viewValue: 'lbl_searchby_shipmentLotNumber' },
  {
    value: 'shipmentSerialNumber',
    viewValue: 'lbl_searchby_shipmentSerialNumber',
  },
  { value: 'holdStatus', viewValue: 'lbl_searchby_holdStatus' },
  ...addCustomEntriesSearchTypes(),
];

const commonSearchByOptions = [
  { value: 'shipmentNumber', viewValue: 'lbl_searchby_GFF_shipmentNumber' },
  { value: 'customerPONumber', viewValue: 'lbl_searchby_customerPONumber' },
  { value: 'referenceNumber', viewValue: 'lbl_searchby_referenceNumber' },
  {
    value: 'carrierShipmentNumber',
    viewValue: 'lbl_searchby_carrierShipmentNumber',
  },
  { value: 'shipmentLotNumber', viewValue: 'lbl_searchby_shipmentLotNumber' },
  {
    value: 'shipmentBatchNumber',
    viewValue: 'lbl_searchby_shipmentBatchNumber',
  },
  {
    value: 'shipmentSerialNumber',
    viewValue: 'lbl_searchby_shipmentSerialNumber',
  },
  { value: 'holdStatus', viewValue: 'lbl_searchby_holdStatus' },
  ...addCustomEntriesSearchTypes(),
  { value: 'clientASNNumber', viewValue: 'lbl_searchby_clientASNNumber' },
  { value: 'upsASNNumber', viewValue: 'lbl_searchby_upsASNNumber' },
  { value: 'itemNumber', viewValue: 'lbl_searchby_itemNumber' },
  { value: 'itemDescription', viewValue: 'lbl_searchby_itemDescription' },
];

export const searchByOptions = {
  'HLD@*@MM': [
    { value: 'customerPONumber', viewValue: 'lbl_searchby_customerPONumber' },
    { value: 'shipmentNumber', viewValue: 'lbl_searchby_shipmentNumber' },
    { value: 'referenceNumber', viewValue: 'lbl_searchby_referenceNumber' },
    {
      value: 'carrierShipmentNumber',
      viewValue: 'lbl_searchby_carrierShipmentNumber',
    },
    { value: 'shipmentLotNumber', viewValue: 'lbl_searchby_shipmentLotNumber' },
    {
      value: 'shipmentSerialNumber',
      viewValue: 'lbl_searchby_shipmentSerialNumber',
    },
    { value: 'holdStatus', viewValue: 'lbl_searchby_holdStatus' },
  ],
  'HLD@*@MI_MO': [
    { value: 'customerPONumber', viewValue: 'lbl_searchby_customerPONumber' },
    { value: 'shipmentNumber', viewValue: 'lbl_searchby_shipmentNumber' },
    { value: 'referenceNumber', viewValue: 'lbl_searchby_referenceNumber' },
    {
      value: 'carrierShipmentNumber',
      viewValue: 'lbl_searchby_carrierShipmentNumber',
    },
    {
      value: 'shipmentBatchNumber',
      viewValue: 'lbl_searchby_shipmentBatchNumber',
    },
    {
      value: 'shipmentSerialNumber',
      viewValue: 'lbl_searchby_shipmentSerialNumber',
    },
    { value: 'clientASNNumber', viewValue: 'lbl_searchby_clientASNNumber' },
    { value: 'upsASNNumber', viewValue: 'lbl_searchby_upsASNNumber' },
    { value: 'itemNumber', viewValue: 'lbl_searchby_itemNumber' },
    { value: 'itemDescription', viewValue: 'lbl_searchby_itemDescription' },
    { value: SEARCH_BY_INVENTORY_NO, viewValue: 'dpf_searchby_inventoryBatch' },
  ],
  'HLD@*@NMI_MO': [
    { value: 'customerPONumber', viewValue: 'lbl_searchby_customerPONumber' },
    { value: 'shipmentNumber', viewValue: 'lbl_searchby_shipmentNumber' },
    { value: 'referenceNumber', viewValue: 'lbl_searchby_referenceNumber' },
    {
      value: 'carrierShipmentNumber',
      viewValue: 'lbl_searchby_carrierShipmentNumber',
    },
    {
      value: 'shipmentBatchNumber',
      viewValue: 'lbl_searchby_shipmentBatchNumber',
    },
    {
      value: 'shipmentSerialNumber',
      viewValue: 'lbl_searchby_shipmentSerialNumber',
    },
    { value: 'clientASNNumber', viewValue: 'lbl_searchby_clientASNNumber' },
    { value: 'upsASNNumber', viewValue: 'lbl_searchby_upsASNNumber' },
    { value: 'itemNumber', viewValue: 'lbl_searchby_itemNumber' },
    { value: 'itemDescription', viewValue: 'lbl_searchby_itemDescription' },
    { value: SEARCH_BY_INVENTORY_NO, viewValue: 'dpf_searchby_inventoryBatch' },
  ],
  'HLD@*@MI_NMO': [
    { value: 'customerPONumber', viewValue: 'lbl_searchby_customerPONumber' },
    { value: 'shipmentNumber', viewValue: 'lbl_searchby_shipmentNumber' },
    { value: 'referenceNumber', viewValue: 'lbl_searchby_referenceNumber' },
    {
      value: 'carrierShipmentNumber',
      viewValue: 'lbl_searchby_carrierShipmentNumber',
    },
    {
      value: 'shipmentBatchNumber',
      viewValue: 'lbl_searchby_shipmentBatchNumber',
    },
    {
      value: 'shipmentSerialNumber',
      viewValue: 'lbl_searchby_shipmentSerialNumber',
    },
    { value: 'clientASNNumber', viewValue: 'lbl_searchby_clientASNNumber' },
    { value: 'upsASNNumber', viewValue: 'lbl_searchby_upsASNNumber' },
    { value: 'itemNumber', viewValue: 'lbl_searchby_itemNumber' },
    { value: 'itemDescription', viewValue: 'lbl_searchby_itemDescription' },
    { value: SEARCH_BY_INVENTORY_NO, viewValue: 'dpf_searchby_inventoryBatch' },
  ],
  'HLD@*@NMI_NMO': [
    { value: 'customerPONumber', viewValue: 'lbl_searchby_customerPONumber' },
    { value: 'shipmentNumber', viewValue: 'lbl_searchby_shipmentNumber' },
    { value: 'referenceNumber', viewValue: 'lbl_searchby_referenceNumber' },
    {
      value: 'carrierShipmentNumber',
      viewValue: 'lbl_searchby_carrierShipmentNumber',
    },
    {
      value: 'shipmentBatchNumber',
      viewValue: 'lbl_searchby_shipmentBatchNumber',
    },
    {
      value: 'shipmentSerialNumber',
      viewValue: 'lbl_searchby_shipmentSerialNumber',
    },
    { value: 'clientASNNumber', viewValue: 'lbl_searchby_clientASNNumber' },
    { value: 'upsASNNumber', viewValue: 'lbl_searchby_upsASNNumber' },
    { value: 'itemNumber', viewValue: 'lbl_searchby_itemNumber' },
    { value: 'itemDescription', viewValue: 'lbl_searchby_itemDescription' },
    { value: SEARCH_BY_INVENTORY_NO, viewValue: 'dpf_searchby_inventoryBatch' },
  ],
  'GLD@*@MM': [
    { value: 'customerPONumber', viewValue: 'lbl_searchby_customerPONumber' },
    { value: 'shipmentNumber', viewValue: 'lbl_searchby_shipmentNumber' },
    { value: 'referenceNumber', viewValue: 'lbl_searchby_referenceNumber' },
    {
      value: 'carrierShipmentNumber',
      viewValue: 'lbl_searchby_carrierShipmentNumber',
    },
    { value: 'shipmentLotNumber', viewValue: 'lbl_searchby_shipmentLotNumber' },
    {
      value: 'shipmentSerialNumber',
      viewValue: 'lbl_searchby_shipmentSerialNumber',
    },
    { value: 'holdStatus', viewValue: 'lbl_searchby_holdStatus' },
  ],
  'HLD@*@*': [
    { value: 'customerPONumber', viewValue: 'lbl_searchby_customerPONumber' },
    { value: 'shipmentNumber', viewValue: 'lbl_searchby_shipmentNumber' },
    { value: 'referenceNumber', viewValue: 'lbl_searchby_referenceNumber' },
    {
      value: 'carrierShipmentNumber',
      viewValue: 'lbl_searchby_carrierShipmentNumber',
    },
    { value: 'clientASNNumber', viewValue: 'lbl_searchby_clientASNNumber' },
    { value: 'upsASNNumber', viewValue: 'lbl_searchby_upsASNNumber' },
    { value: 'itemNumber', viewValue: 'lbl_searchby_itemNumber' },
    { value: 'itemDescription', viewValue: 'lbl_searchby_itemDescription' },
    { value: SEARCH_BY_INVENTORY_NO, viewValue: 'dpf_searchby_inventoryBatch' },
  ],
  'HLD@*@*_MM': [
    { value: 'customerPONumber', viewValue: 'lbl_searchby_customerPONumber' },
    { value: 'shipmentNumber', viewValue: 'lbl_searchby_shipmentNumber' },
    { value: 'referenceNumber', viewValue: 'lbl_searchby_referenceNumber' },
    {
      value: 'carrierShipmentNumber',
      viewValue: 'lbl_searchby_carrierShipmentNumber',
    },
    { value: 'shipmentLotNumber', viewValue: 'lbl_searchby_shipmentLotNumber' },
    {
      value: 'shipmentSerialNumber',
      viewValue: 'lbl_searchby_shipmentSerialNumber',
    },
    { value: 'holdStatus', viewValue: 'lbl_searchby_holdStatus' },
    { value: 'clientASNNumber', viewValue: 'lbl_searchby_clientASNNumber' },
    { value: 'upsASNNumber', viewValue: 'lbl_searchby_upsASNNumber' },
    { value: 'itemNumber', viewValue: 'lbl_searchby_itemNumber' },
    { value: 'itemDescription', viewValue: 'lbl_searchby_itemDescription' },
    { value: SEARCH_BY_INVENTORY_NO, viewValue: 'dpf_searchby_inventoryBatch' },
  ],
  'GLD@PS@*': [
    { value: 'shipmentNumber', viewValue: 'lbl_searchby_shipmentNumber' },
    { value: 'customerPONumber', viewValue: 'lbl_searchby_customerPONumber' },
    {
      value: 'customerOutboundHeaderReference',
      viewValue: 'lbl_searchby_customerOutboundHeaderReference',
    },
    {
      value: 'carrierShipmentNumber',
      viewValue: 'lbl_searchby_carrierShipmentNumber',
    },
    { value: 'clientASNNumber', viewValue: 'lbl_searchby_clientASNNumber' },
    { value: 'upsASNNumber', viewValue: 'lbl_searchby_upsASNNumber' },
    { value: 'designator', viewValue: 'lbl_searchby_shipmentDesignator' },
    { value: 'lpn', viewValue: 'lbl_searchby_shipmentLPN' },
    { value: 'vsn', viewValue: 'lbl_searchby_shipment_serial_number' },
    { value: 'vcl', viewValue: 'lbl_searchby_shipment_lot_number' },
    {
      value: 'lineReferenceNumber',
      viewValue: 'lbl_searchby_lineReferenceNumber',
    },
    { value: 'itemNumber', viewValue: 'lbl_searchby_itemNumber' },
    { value: 'itemDescription', viewValue: 'lbl_searchby_itemDescription' },
    {
      value: INVENTORY_SEARCHBY.designator,
      viewValue: 'lbl_searchby_inventoryDesignator',
    },
    { value: INVENTORY_SEARCHBY.lpn, viewValue: 'lbl_searchby_inventoryLPN' },
    {
      value: INVENTORY_SEARCHBY.vsn,
      viewValue: 'lbl_searchby_inventory_serial_number',
    },
    {
      value: INVENTORY_SEARCHBY.vcl,
      viewValue: 'lbl_searchby_inventory_lot_number',
    },
    {
      value: 'InboundReferenceNumber',
      viewValue: 'lbl_searchby_InboundReferenceNumber',
    },
  ],
  'GLD@FG@*': [
    { value: 'shipmentNumber', viewValue: 'lbl_searchby_shipmentNumber' },
    { value: 'customerPONumber', viewValue: 'lbl_searchby_customerPONumber' },
    { value: 'referenceNumber', viewValue: 'lbl_searchby_referenceNumber' },
    {
      value: 'carrierShipmentNumber',
      viewValue: 'lbl_searchby_carrierShipmentNumber',
    },
    { value: 'clientASNNumber', viewValue: 'lbl_searchby_clientASNNumber' },
    { value: 'upsASNNumber', viewValue: 'lbl_searchby_upsASNNumber' },
    { value: 'itemNumber', viewValue: 'lbl_searchby_itemNumber' },
    { value: 'itemDescription', viewValue: 'lbl_searchby_itemDescription' },
  ],
  'GLD@PS@*_MM': [
    { value: 'shipmentNumber', viewValue: 'lbl_searchby_shipmentNumber' },
    { value: 'customerPONumber', viewValue: 'lbl_searchby_customerPONumber' },
    { value: 'referenceNumber', viewValue: 'lbl_searchby_referenceNumber' },
    {
      value: 'customerOutboundHeaderReference',
      viewValue: 'lbl_searchby_customerOutboundHeaderReference',
    },
    {
      value: 'carrierShipmentNumber',
      viewValue: 'lbl_searchby_carrierShipmentNumber',
    },
    { value: 'shipmentLotNumber', viewValue: 'lbl_searchby_shipmentLotNumber' },
    {
      value: 'shipmentSerialNumber',
      viewValue: 'lbl_searchby_shipmentSerialNumber',
    },
    { value: 'holdStatus', viewValue: 'lbl_searchby_holdStatus' },
    { value: 'clientASNNumber', viewValue: 'lbl_searchby_clientASNNumber' },
    { value: 'upsASNNumber', viewValue: 'lbl_searchby_upsASNNumber' },
    { value: 'designator', viewValue: 'lbl_searchby_shipmentDesignator' },
    { value: 'lpn', viewValue: 'lbl_searchby_shipmentLPN' },
    { value: 'vsn', viewValue: 'lbl_searchby_shipment_serial_number' },
    { value: 'vcl', viewValue: 'lbl_searchby_shipment_lot_number' },
    {
      value: 'lineReferenceNumber',
      viewValue: 'lbl_searchby_lineReferenceNumber',
    },
    { value: 'itemNumber', viewValue: 'lbl_searchby_itemNumber' },
    { value: 'itemDescription', viewValue: 'lbl_searchby_itemDescription' },
    {
      value: INVENTORY_SEARCHBY.designator,
      viewValue: 'lbl_searchby_inventoryDesignator',
    },
    { value: INVENTORY_SEARCHBY.lpn, viewValue: 'lbl_searchby_inventoryLPN' },
    {
      value: INVENTORY_SEARCHBY.vsn,
      viewValue: 'lbl_searchby_inventory_serial_number',
    },
    {
      value: INVENTORY_SEARCHBY.vcl,
      viewValue: 'lbl_searchby_inventory_lot_number',
    },
    {
      value: 'InboundReferenceNumber',
      viewValue: 'lbl_searchby_InboundReferenceNumber',
    },
  ],
  'GLD@FG@*_MM': [
    { value: 'shipmentNumber', viewValue: 'lbl_searchby_shipmentNumber' },
    { value: 'customerPONumber', viewValue: 'lbl_searchby_customerPONumber' },
    { value: 'referenceNumber', viewValue: 'lbl_searchby_referenceNumber' },
    {
      value: 'carrierShipmentNumber',
      viewValue: 'lbl_searchby_carrierShipmentNumber',
    },
    { value: 'shipmentLotNumber', viewValue: 'lbl_searchby_shipmentLotNumber' },
    {
      value: 'shipmentSerialNumber',
      viewValue: 'lbl_searchby_shipmentSerialNumber',
    },
    { value: 'holdStatus', viewValue: 'lbl_searchby_holdStatus' },
    { value: 'clientASNNumber', viewValue: 'lbl_searchby_clientASNNumber' },
    { value: 'upsASNNumber', viewValue: 'lbl_searchby_upsASNNumber' },
    { value: 'itemNumber', viewValue: 'lbl_searchby_itemNumber' },
    { value: 'itemDescription', viewValue: 'lbl_searchby_itemDescription' },
  ],
  'GFF@*@FS': [
    { value: 'shipmentNumber', viewValue: 'lbl_searchby_GFF_shipmentNumber' },
    { value: 'customerPONumber', viewValue: 'lbl_searchby_customerPONumber' },
    { value: 'referenceNumber', viewValue: 'lbl_searchby_referenceNumber' },
    ...addCustomEntriesSearchTypes(),
    // { value: 'masterBillNumber', viewValue: 'lbl_searchby_masterBillNumber' }, // TBD  future use
  ],
  'HLD_GFF@*@FS_MM': [
    { value: 'customerPONumber', viewValue: 'lbl_searchby_customerPONumber' },
    { value: 'shipmentNumber', viewValue: 'lbl_searchby_GFF_shipmentNumber' },
    { value: 'referenceNumber', viewValue: 'lbl_searchby_referenceNumber' },
    {
      value: 'carrierShipmentNumber',
      viewValue: 'lbl_searchby_carrierShipmentNumber',
    },
    { value: 'shipmentLotNumber', viewValue: 'lbl_searchby_shipmentLotNumber' },
    {
      value: 'shipmentSerialNumber',
      viewValue: 'lbl_searchby_shipmentSerialNumber',
    },
    { value: 'holdStatus', viewValue: 'lbl_searchby_holdStatus' },
    ...addCustomEntriesSearchTypes(),
    // { value: 'masterBillNumber', viewValue: 'lbl_searchby_masterBillNumber' }, // TBD  future use
  ],
  'GLD_GFF@*@FS_MM': [
    { value: 'customerPONumber', viewValue: 'lbl_searchby_customerPONumber' },
    { value: 'shipmentNumber', viewValue: 'lbl_searchby_GFF_shipmentNumber' },
    { value: 'referenceNumber', viewValue: 'lbl_searchby_referenceNumber' },
    {
      value: 'carrierShipmentNumber',
      viewValue: 'lbl_searchby_carrierShipmentNumber',
    },
    { value: 'shipmentLotNumber', viewValue: 'lbl_searchby_shipmentLotNumber' },
    {
      value: 'shipmentSerialNumber',
      viewValue: 'lbl_searchby_shipmentSerialNumber',
    },
    { value: 'holdStatus', viewValue: 'lbl_searchby_holdStatus' },
    ...addCustomEntriesSearchTypes(),
    // { value: 'masterBillNumber', viewValue: 'lbl_searchby_masterBillNumber' }, // TBD  future use
  ],
  'GLD_GFF@FG@NMI_MO_FS': [
    { value: 'shipmentNumber', viewValue: 'lbl_searchby_GFF_shipmentNumber' },
    { value: 'customerPONumber', viewValue: 'lbl_searchby_customerPONumber' },
    { value: 'referenceNumber', viewValue: 'lbl_searchby_referenceNumber' },
    {
      value: 'carrierShipmentNumber',
      viewValue: 'lbl_searchby_carrierShipmentNumber',
    },
    ...addCustomEntriesSearchTypes(),
    { value: 'clientASNNumber', viewValue: 'lbl_searchby_clientASNNumber' },
    { value: 'upsASNNumber', viewValue: 'lbl_searchby_upsASNNumber' },
    { value: 'itemNumber', viewValue: 'lbl_searchby_itemNumber' },
    { value: 'itemDescription', viewValue: 'lbl_searchby_itemDescription' },
  ],
  'HLD_GFF@HEALTH@NMI_MO_FS': [
    { value: 'shipmentNumber', viewValue: 'lbl_searchby_GFF_shipmentNumber' },
    { value: 'customerPONumber', viewValue: 'lbl_searchby_customerPONumber' },
    { value: 'referenceNumber', viewValue: 'lbl_searchby_referenceNumber' },
    {
      value: 'carrierShipmentNumber',
      viewValue: 'lbl_searchby_carrierShipmentNumber',
    },
    {
      value: 'shipmentBatchNumber',
      viewValue: 'lbl_searchby_shipmentBatchNumber',
    },
    {
      value: 'shipmentSerialNumber',
      viewValue: 'lbl_searchby_shipmentSerialNumber',
    },
    ...addCustomEntriesSearchTypes(),
    { value: 'clientASNNumber', viewValue: 'lbl_searchby_clientASNNumber' },
    { value: 'upsASNNumber', viewValue: 'lbl_searchby_upsASNNumber' },
    { value: 'itemNumber', viewValue: 'lbl_searchby_itemNumber' },
    { value: 'itemDescription', viewValue: 'lbl_searchby_itemDescription' },
    { value: 'InventoryBatchNumber', viewValue: 'dpf_searchby_inventoryBatch' },
  ],
  'GLD_GFF@PS@NMI_MO_FS': [
    { value: 'shipmentNumber', viewValue: 'lbl_searchby_GFF_shipmentNumber' },
    { value: 'customerPONumber', viewValue: 'lbl_searchby_customerPONumber' },
    { value: 'referenceNumber', viewValue: 'lbl_searchby_referenceNumber' },
    {
      value: 'customerOutboundHeaderReference',
      viewValue: 'lbl_searchby_customerOutboundHeaderReference',
    },
    {
      value: 'carrierShipmentNumber',
      viewValue: 'lbl_searchby_carrierShipmentNumber',
    },
    ...addCustomEntriesSearchTypes(),
    { value: 'clientASNNumber', viewValue: 'lbl_searchby_clientASNNumber' },
    { value: 'upsASNNumber', viewValue: 'lbl_searchby_upsASNNumber' },
    { value: 'designator', viewValue: 'lbl_searchby_shipmentDesignator' },
    { value: 'lpn', viewValue: 'lbl_searchby_shipmentLPN' },
    { value: 'vsn', viewValue: 'lbl_searchby_shipment_serial_number' },
    { value: 'vcl', viewValue: 'lbl_searchby_shipment_lot_number' },
    {
      value: 'lineReferenceNumber',
      viewValue: 'lbl_searchby_lineReferenceNumber',
    },
    { value: 'itemNumber', viewValue: 'lbl_searchby_itemNumber' },
    { value: 'itemDescription', viewValue: 'lbl_searchby_itemDescription' },
    {
      value: INVENTORY_SEARCHBY.designator,
      viewValue: 'lbl_searchby_inventoryDesignator',
    },
    { value: INVENTORY_SEARCHBY.lpn, viewValue: 'lbl_searchby_inventoryLPN' },
    {
      value: INVENTORY_SEARCHBY.vsn,
      viewValue: 'lbl_searchby_inventory_serial_number',
    },
    {
      value: INVENTORY_SEARCHBY.vcl,
      viewValue: 'lbl_searchby_inventory_lot_number',
    },
    {
      value: 'InboundReferenceNumber',
      viewValue: 'dpf_hdr_srchBy_invRefNum',
    },
  ],
  'HLD@*@MI_MO_MM': [...searchByOptionsForHLDMIMM],
  'HLD@*@MI_NMO_MM': [...searchByOptionsForHLDMIMM],
  'GLD@FG@MI_MO_MM': [...searchByOptionsForGLDMIMM],
  'GLD@FG@MI_NMO_MM': [...searchByOptionsForGLDMIMM],
  'GLD_GFF@FG@NMI_NMO_FS': [
    { value: 'shipmentNumber', viewValue: 'lbl_searchby_GFF_shipmentNumber' },
    { value: 'customerPONumber', viewValue: 'lbl_searchby_customerPONumber' },
    { value: 'referenceNumber', viewValue: 'lbl_searchby_referenceNumber' },
    {
      value: 'carrierShipmentNumber',
      viewValue: 'lbl_searchby_carrierShipmentNumber',
    },
    ...addCustomEntriesSearchTypes(),
    { value: 'clientASNNumber', viewValue: 'lbl_searchby_clientASNNumber' },
    { value: 'upsASNNumber', viewValue: 'lbl_searchby_upsASNNumber' },
    { value: 'itemNumber', viewValue: 'lbl_searchby_itemNumber' },
    { value: 'itemDescription', viewValue: 'lbl_searchby_itemDescription' },
  ],
  'HLD_GFF@HEALTH@NMI_NMO_FS': [
    { value: 'shipmentNumber', viewValue: 'lbl_searchby_GFF_shipmentNumber' },
    { value: 'customerPONumber', viewValue: 'lbl_searchby_customerPONumber' },
    { value: 'referenceNumber', viewValue: 'lbl_searchby_referenceNumber' },
    {
      value: 'carrierShipmentNumber',
      viewValue: 'lbl_searchby_carrierShipmentNumber',
    },
    {
      value: 'shipmentBatchNumber',
      viewValue: 'lbl_searchby_shipmentBatchNumber',
    },
    {
      value: 'shipmentSerialNumber',
      viewValue: 'lbl_searchby_shipmentSerialNumber',
    },
    ...addCustomEntriesSearchTypes(),
    { value: 'clientASNNumber', viewValue: 'lbl_searchby_clientASNNumber' },
    { value: 'upsASNNumber', viewValue: 'lbl_searchby_upsASNNumber' },
    { value: 'itemNumber', viewValue: 'lbl_searchby_itemNumber' },
    { value: 'itemDescription', viewValue: 'lbl_searchby_itemDescription' },
    { value: SEARCH_BY_INVENTORY_NO, viewValue: 'dpf_searchby_inventoryBatch' },
  ],
  'GLD_GFF@FG@NMI_MO_FS_MM': [...commonSearchByOptions],
  'GLD_GFF@FG@NMI_NMO_FS_MM': [...commonSearchByOptions],
  'GLD_GFF@FG@MI_MO_FS_MM': [...commonSearchByOptions],
  'GLD_GFF@FG@MI_NMO_FS_MM': [...commonSearchByOptions],
  'HLD_GFF@HEALTH@MI_MO_FS_MM': [
    ...commonSearchByOptions,
    { value: SEARCH_BY_INVENTORY_NO, viewValue: 'dpf_searchby_inventoryBatch' },
  ],
  'HLD_GFF@HEALTH@NMI_MO_FS_MM': [
    ...commonSearchByOptions,
    { value: SEARCH_BY_INVENTORY_NO, viewValue: 'dpf_searchby_inventoryBatch' },
  ],
  'HLD_GFF@HEALTH@NMI_NMO_FS_MM': [
    ...commonSearchByOptions,
    { value: SEARCH_BY_INVENTORY_NO, viewValue: 'dpf_searchby_inventoryBatch' },
  ],
  'HLD_GFF@HEALTH@MI_NMO_FS_MM': [
    ...commonSearchByOptions,
    { value: SEARCH_BY_INVENTORY_NO, viewValue: 'dpf_searchby_inventoryBatch' },
  ],
  'GLD_GFF@FG@FS_MM': [...searchByOptionsForFSMM],
  'HLD_GFF@HEALTH@FS_MM': [...searchByOptionsForFSMM],
};

function addCustomEntriesSearchTypes(): any[] {
  return IS_CUSTOM_ENTRIES_SEARCH_ALLOWED
    ? [
        {
          value: 'customControlNumber',
          viewValue: 'lbl_dpf_l1_searchBar_custCtrlNum',
        },
        {
          value: 'brokerReferenceNumber',
          viewValue: 'lbl_dpf_l1_searchBar_brokerRefNum',
        },
      ]
    : [];
}

const inventorySearchWithBatchNo = [
  {
    value: 'itemNumber',
    viewValue: 'lbl_searchby_inventory_GLD_itemNumber',
  },
  {
    value: 'itemDescription',
    viewValue: 'lbl_searchby_inventory_GLD_itemDescription',
  },
  {
    value: SEARCH_BY_INVENTORY_NO,
    viewValue: 'lbl_searchby_inventory_GLD_batchNumber',
  },
];

const inventorySearch = [
  {
    value: 'itemNumber',
    viewValue: 'lbl_searchby_inventory_GLD_itemNumber',
  },
  {
    value: 'itemDescription',
    viewValue: 'lbl_searchby_inventory_GLD_itemDescription',
  },
];

export const warehouseSearchByOptions = {
  'HLD@HEALTH@MI_MO': [...inventorySearchWithBatchNo],
  'HLD@HEALTH@NMI_MO': [...inventorySearchWithBatchNo],
  'HLD@HEALTH@MI_NMO': [...inventorySearchWithBatchNo],
  'HLD@HEALTH@NMI_NMO': [...inventorySearchWithBatchNo],
  'GLD@*@MM': [...inventorySearch],
  'GLD@PS@*': [
    {
      value: 'itemNumber',
      viewValue: 'lbl_searchby_inventory_GLD_itemNumber',
    },
    {
      value: 'itemDescription',
      viewValue: 'lbl_searchby_inventory_GLD_itemDescription',
    },
    {
      value: 'Designator',
      viewValue: 'lbl_searchby_inventory_GLD_Designator',
    },
    { value: 'LPN', viewValue: 'lbl_searchby_inventory_GLD_LPN' },
    { value: 'VSN', viewValue: 'lbl_searchby_inventory_GLD_serial_number' },
    { value: 'VCL', viewValue: 'lbl_searchby_inventory_GLD_lot_number' },
    {
      value: 'InboundReferenceNumber',
      viewValue: 'lbl_searchby_inventory_GLD_InboundReferenceNumber',
    },
  ],
  'GLD@FG@*': [...inventorySearch],
  'GLD@PS@*_MM': [
    {
      value: 'itemNumber',
      viewValue: 'lbl_searchby_inventory_GLD_itemNumber',
    },
    {
      value: 'itemDescription',
      viewValue: 'lbl_searchby_inventory_GLD_itemDescription',
    },
    {
      value: 'Designator',
      viewValue: 'lbl_searchby_inventory_GLD_Designator',
    },
    { value: 'LPN', viewValue: 'lbl_searchby_inventory_GLD_LPN' },
    { value: 'VSN', viewValue: 'lbl_searchby_inventory_GLD_serial_number' },
    { value: 'VCL', viewValue: 'lbl_searchby_inventory_GLD_lot_number' },
    {
      value: 'InboundReferenceNumber',
      viewValue: 'lbl_searchby_inventory_GLD_InboundReferenceNumber',
    },
  ],
  'GLD@FG@*_MM': [...inventorySearch],
  'GFF@*@FS': [...inventorySearch],
  'GLD_GFF@FG@*': [...inventorySearch],
  'GLD_GFF@*@FS_MM': [...inventorySearch],
  'GLD_GFF@FG@NMI_MO_FS': [...inventorySearch],
  'HLD_GFF@HEALTH@*': [...inventorySearchWithBatchNo],
  'GLD_GFF@PS@NMI_MO_FS': [
    {
      value: 'itemNumber',
      viewValue: 'lbl_searchby_inventory_GLD_itemNumber',
    },
    {
      value: 'itemDescription',
      viewValue: 'lbl_searchby_inventory_GLD_itemDescription',
    },
    {
      value: 'Designator',
      viewValue: 'lbl_searchby_inventory_GLD_Designator',
    },
    { value: 'LPN', viewValue: 'lbl_searchby_inventory_GLD_LPN' },
    { value: 'VSN', viewValue: 'lbl_searchby_inventory_GLD_serial_number' },
    { value: 'VCL', viewValue: 'lbl_searchby_inventory_GLD_lot_number' },
    {
      value: 'InboundReferenceNumber',
      viewValue: 'lbl_searchby_inventory_GLD_InboundReferenceNumber',
    },
  ],
  'HLD@*@MI_MO_MM': [...inventorySearchWithBatchNo],
  'HLD@*@MI_NMO_MM': [...inventorySearchWithBatchNo],
  'GLD@FG@MI_MO_MM': [...inventorySearch],
  'GLD@FG@MI_NMO_MM': [...inventorySearch],
};
