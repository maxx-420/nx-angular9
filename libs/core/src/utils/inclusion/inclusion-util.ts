// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// Inclusion utility

import CommonUtility from '../commonUtil';
import SessionStorageUtility from '../sessionStorage';

import { SESSION_CONFIG } from './../../global-config';
import {
  ISelectorPanelConfiguration,
  ISessionInclusions,
  IWidgetConfig,
} from './../../model/interfaces/IInclusion';

const InclusionUtility = {
  /**
   * Fetches the user profile from session and extracts the data of exclusions
   * @param exclusionType Exclusion type
   */
  _fetchInclusionsFromSession() {
    return CommonUtility.getPropValueFromObj(
      SessionStorageUtility.getUserProfile(),
      SESSION_CONFIG.inclusionsKey
    );
  },

  /**
   * Fetches the inclusions as per the module and page provided.
   * @param module : Module can be considered as Micro application name
   * @param page : name of the particular page
   * @param templateType : name of the templateType for L3 page
   */
  getInclusions(module = '', page = '', templateType = '') {
    // get inclusions from session storage
    const allInclusions = this._fetchInclusionsFromSession();

    if (allInclusions) {
      if (module && page && templateType) {
        return (
          allInclusions?.[module]?.[`${page}_${templateType?.toLowerCase()}`] ??
          {}
        );
      } else if (module && page) {
        return allInclusions?.[module]?.[page] ?? {};
      } else if (module) {
        return allInclusions?.[module] ?? {};
      } else {
        return allInclusions;
      }
    }

    return {};
  },

  /**
   * Transforms inclusions from array of objects to nested obejcts and key value pairs
   */
  transformInclusions(inclusionFromAPIRes) {
    let allExistingInclusions = this._fetchInclusionsFromSession() ?? {};
    inclusionFromAPIRes.forEach((inclusion) => {
      let pageKey = inclusion.page;
      if (inclusion.templateType) {
        pageKey = `${inclusion.page}_${inclusion.templateType.toLowerCase()}`;
      }
      allExistingInclusions = {
        ...allExistingInclusions,
        [inclusion.module]: {
          ...(allExistingInclusions[inclusion.module] ?? {}),
          [pageKey]: {
            ...(allExistingInclusions[inclusion.module] &&
            allExistingInclusions[inclusion.module][pageKey]
              ? allExistingInclusions[inclusion.module][pageKey]
              : {}),
            ...inclusion.components.reduce(
              (acc, item) => ({
                ...acc,
                ...{
                  [item.id]: item.isDisplay,
                },
              }),
              {}
            ),
          },
        },
      };
    });

    return allExistingInclusions;
  },

  /**
   * Returns [] of modules for which we have loaded inclusions
   */
  getModulesInclusionsLoaded() {
    const allExistingInclusions = this._fetchInclusionsFromSession() ?? {};

    return Object.keys(allExistingInclusions);
  },

  /**
   * Returns sorted list of compoents for selector panel
   * @param inclusions: component inclusions object as stored in session storage
   * @param widgetConfig: Array of widgets configuration containing widget id and title
   */
  getSelectorPanelConfiguration(
    inclusions: ISessionInclusions,
    widgetConfig: Array<IWidgetConfig>
  ): Array<ISelectorPanelConfiguration> {
    const componentList: Array<ISelectorPanelConfiguration> = [];
    widgetConfig.forEach((widget: IWidgetConfig): void => {
      if (widget.widgetId in inclusions) {
        componentList.push({
          id: widget.widgetId,
          isDisplay: inclusions[widget.widgetId],
          viewValue: widget.title,
        });
      }
    });
    return componentList;
  },

  /**
   * Call BE API for new widgets that are added after user updates the components from preference selector panel
   * If a widget (component) was already present, then no need to call that API
   * @param oldInclusions: existing set of component inclusions
   * @param newInclusions: updated set of component inclusions for the user
   */
  getInclusionForApiCalls(
    oldInclusions: ISessionInclusions,
    newInclusions: ISessionInclusions
  ): ISessionInclusions {
    const inclusionForApiCalls: ISessionInclusions = CommonUtility.deepClone(
      newInclusions
    );
    Object.keys(newInclusions).forEach((component: string): void => {
      inclusionForApiCalls[component] = oldInclusions[component]
        ? false
        : newInclusions[component];
    });
    return inclusionForApiCalls;
  },
};
export default InclusionUtility;
