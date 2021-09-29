// batch Util
import { BATCH_CONFIG, FILTER_CONFIGURATIONS } from '../global-config/config';
import { MULTI_SELECT_ALL } from '../constants';
import { FILTER_TYPES } from '../constants/global.constant';
import { CommonUtility, FilterUtility } from '../utils';

const BatchUtility = {
  /**
   * get Batch Status filter label
   */
  getOptionsLabels(item, contentPipe, key = 'count') {
    return (
      (item.reasonCode
        ? contentPipe.transform(
            `dpf_batchStatus_${item.reasonCode.toLowerCase()}`
          )
        : contentPipe.transform(`dpf_batchStatus_released`)) + ` (${item[key]})`
    );
  },

  /**
   * breaks filters with value as an array (for ex. Batch Status), into individual filter objects.
   * @param selectedFilterItem selectedFilterItem
   * @returns any
   */
  unwrapBatchStatus(selectedFilterItem, key: string, filterConfiguration) {
    const batchStatusArr: any = [];
    const statusIndex: number = filterConfiguration.findIndex(
      (x: any): any => x.key === key
    );
    // This is a status specific check, since it requires detailed processing,
    // other array type filters can be handled without this processing
    if (
      Array.isArray(selectedFilterItem.value) &&
      selectedFilterItem.filterType === FILTER_TYPES.STATUS &&
      statusIndex !== -1
    ) {
      const options: any = filterConfiguration[statusIndex].options;
      selectedFilterItem.value.forEach((item: any): any => {
        let value: any;
        if (options?.length) {
          const selectedIndex: any = options.findIndex(
            (option: any): any =>
              option.value &&
              option.value?.toLowerCase() === item?.toLowerCase()
          );
          if (selectedIndex > -1) {
            value =
              options[selectedIndex]?.label || options[selectedIndex]?.value;
          } else {
            // To show count in case of ALL selected
            value = item;
          }
        } else {
          value = item;
        }
        batchStatusArr.push(value);
      });
      return batchStatusArr;
    } else {
      return selectedFilterItem.value;
    }
  },

  /**
   * Get the batch status from the payload
   * @param data: data
   */
  getBatchStatusForPayload(data: any) {
    if (data) {
      if (data[0] === MULTI_SELECT_ALL || data === MULTI_SELECT_ALL) {
        return [MULTI_SELECT_ALL];
      }
      const result = data.map((elem) =>
        BATCH_CONFIG.reasonCodes.indexOf(elem.toLowerCase()) !== -1
          ? BATCH_CONFIG.status[0]
          : BATCH_CONFIG.status[1]
      );
      return [...new Set(result)];
    }
  },

  /**
   * Get Options for Expiration Date Filter on inventory tab L2 page
   */
  getExpirationDateOptions() {
    return FILTER_CONFIGURATIONS.dateFilterOptions
      .filter((elem) => elem.value !== 2 && elem.value !== 14)
      .map((elem) => {
        return {
          value: elem.value,
          label: elem.viewValue,
          isCmsLabel: true,
        };
      });
  },
  /**
   *
   * @param arr Find the index of key from an array
   * @param key selector key
   * @returns index of item
   */
  findIndex(arr: any, key: any): number {
    return arr.findIndex((x: any): any => x.key === key);
  },

  /**
   * When default filter chip is present, it should be the first chip displayed, thereafter
   * the order of chips should match order in the filter panel
   */
  correctChipsSequence(defaultFilterKey, selectedFilterForChips): any {
    defaultFilterKey.forEach((defaultKey, index) => {
      if (selectedFilterForChips[index]?.key !== defaultKey) {
        const indexOfDefault: number = selectedFilterForChips.findIndex(
          (x: any): any => x.key === defaultKey
        );
        if (indexOfDefault !== -1) {
          const defaultObj: any = selectedFilterForChips[indexOfDefault];
          selectedFilterForChips.splice(indexOfDefault, 1);
          selectedFilterForChips.splice(index, 0, defaultObj);
        }
      }
    });
  },

  /**
   * @param filter date filter
   * @returns formatted date object
   */
  getDateObject(filter) {
    const filterCopy: any = CommonUtility.deepClone(filter);
    if (
      typeof filterCopy.value === 'string' &&
      filterCopy.value.indexOf('Last') !== -1
    ) {
      filterCopy.value = +filterCopy.value.split(' ')[1];
    } else {
      filterCopy.value = -1;
    }
    return FilterUtility.createDateObject(filterCopy);
  },

  /**
   * two reason codes need special handling - Released, Quarantine
   * @param filter batch status filter chip values - ['Held - Expired(6), Held - Quarantined(3), Release(2), ...]
   * @returns array of reason codes - ['Released', 'Quarantine', 'Expired', ...]
   */
  getReasonCodesAfterRemovingCount(filter) {
    // BatchStatus Filter Value when emitted is of for 'x (num)' below logic is to get only the x part
    const status = filter.value.map((elem: any): any => {
      let reasonCode: any;
      if (elem.includes(BATCH_CONFIG.status[0])) {
        elem = elem.split('-')[1];
      }
      reasonCode = elem.split('(')[0].trim();
      // two reason codes need special handling - Quarantine(Quarantined) and Released
      return BATCH_CONFIG.status.indexOf(reasonCode) === -1 &&
        BATCH_CONFIG.reasonCodes.indexOf(reasonCode.toLowerCase()) === -1
        ? BATCH_CONFIG.quarantine
        : reasonCode;
    });
    return status;
  },

  setFilterChipValue(
    selectedFilter: { [key: string]: any },
    filterConfiguration: any,
    defaultFilterConfig: any,
    filterMap: any,
    filterKeys: any,
    contentPipe: any
  ): any {
    const selectedFilterForChips = [];
    Object.keys(selectedFilter || {}).forEach((key: string): void => {
      let filter = [];
      /* istanbul ignore else */
      if (selectedFilter[key]?.filterType === FILTER_TYPES.DATE_RANGE) {
        filter = {
          ...selectedFilter[key],
          value: FilterUtility.formatValuesForChip(
            selectedFilter[key],
            contentPipe
          ),
        };
      } else if (selectedFilter[key]?.value.includes(MULTI_SELECT_ALL)) {
        filter.push(defaultFilterConfig[key]);
      } else if (selectedFilter[key]?.filterType === FILTER_TYPES.STATUS) {
        filter.push({
          ...defaultFilterConfig[key],
          value: BatchUtility.unwrapBatchStatus(
            selectedFilter[key],
            filterMap.BatchStatus,
            filterConfiguration
          ),
        });
      } else {
        filter.push({
          ...defaultFilterConfig[key],
          value: selectedFilter[key].value,
        });
      }
      // final filter chip array
      selectedFilterForChips.push(...filter);
    });
    // correct chips sequence
    this.correctChipsSequence(filterKeys, selectedFilterForChips);
    return selectedFilterForChips;
  },
};
export default BatchUtility;
