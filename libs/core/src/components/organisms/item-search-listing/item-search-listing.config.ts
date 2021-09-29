// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
/**
 * config file
 */
import { SelectionModel } from '@angular/cdk/collections';

import { SEARCH_BY_INVENTORY_NO } from '../../../constants/global.constant';

import { itemSearchListingExclusionsColumnIDs } from './exclusion-list.config';

export const setDisplayedColumns = (
  allowSelect,
  searchBy,
  excludedColumns,
  showBatch,
  isReportsPage
) => {
  // item number should be first in reports page
  return isReportsPage
    ? [
        ...(allowSelect ? ['select'] : []),
        'number',
        ...(!excludedColumns[
          itemSearchListingExclusionsColumnIDs.WarehouseColumn
        ]
          ? ['warehouseCode']
          : []),
        ...(searchBy === SEARCH_BY_INVENTORY_NO ||
        (!excludedColumns[itemSearchListingExclusionsColumnIDs.BatchColumns] &&
          showBatch)
          ? getBatchColumns()
          : []),
        'description',
      ]
    : [
        // item number should be after BatchColumns in other(global search/inventory search) pages
        ...(allowSelect ? ['select'] : []),
        ...(searchBy === SEARCH_BY_INVENTORY_NO ||
        (!excludedColumns[itemSearchListingExclusionsColumnIDs.BatchColumns] &&
          showBatch)
          ? getBatchColumns()
          : []),
        'number',
        'description',
      ];
};

export interface ItemSearchModel {
  number: string;
  description: string;
}

export const setColumnInfo = (
  allowSelect,
  searchBy,
  excludedColumns,
  showBatch,
  isReportsPage,
  cellTemplate
) => {
  return {
    ...(allowSelect && {
      select: {
        selection: new SelectionModel<ItemSearchModel>(true, []),
        styles: { width: '75px', padding: '12px 27px' },
        style: { width: '75px', padding: '12px 27px' },
      },
    }),
    ...(searchBy === SEARCH_BY_INVENTORY_NO ||
    (!excludedColumns[itemSearchListingExclusionsColumnIDs.BatchColumns] &&
      showBatch)
      ? getBatchColumnInfo(cellTemplate)
      : []),
    number: {
      displayLabel: 'lbl_item_listing_itemNumber',
      transformLabel: true,
    },
    ...(isReportsPage &&
    !excludedColumns[itemSearchListingExclusionsColumnIDs.WarehouseColumn]
      ? {
          warehouseCode: {
            displayLabel: 'lbl_item_listing_warehouse',
            transformLabel: true,
          },
        }
      : []),
    description: {
      displayLabel: 'lbl_item_listing_itemDescription',
      transformLabel: true,
    },
  };
};

/**
 * returns columns required to show for Batch search options
 */
function getBatchColumnInfo(cellTemplate) {
  return {
    batchNumber: {
      displayLabel: 'lbl_item_listing_inventoryBatchNumber',
      transformLabel: true,
    },
    batchExpirationDate: {
      displayLabel: 'lbl_item_listing_inventoryBatchExpiration',
      transformLabel: true,
    },
    batchStatus: {
      displayLabel: 'lbl_item_listing_inventoryBatchStatus',
      transformLabel: true,
      customTemplate: cellTemplate,
    },
  };
}

/**
 * returns columns fields required to show for Batch search options
 */
function getBatchColumns() {
  return ['batchNumber', 'batchExpirationDate', 'batchStatus'];
}
