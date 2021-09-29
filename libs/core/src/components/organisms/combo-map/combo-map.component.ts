// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// Generic Combo map component

import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';

import { countryList } from '../../../global-config/country.config';
import { CommonUtility, NavigationUtility } from '../../../utils';
import { DrilldownParams } from '../../../utils/interfaces/drilldownParams.interface';
import { MAP_INFO_WINDOW_ID, MAP_TYPE } from '../../../constants/maps.constant';

import {
  circleDesign,
  mapConfig,
  mapHeight,
  mapMarkerConfig,
  mapTypes,
  mapVariation,
  maxRadius,
} from './combo-map.config';

@Component({
  selector: 'lib-combo-map',
  templateUrl: './combo-map.component.html',
  styleUrls: ['./combo-map.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ComboMapComponent implements OnChanges {
  @Input() mapDetails: any = [];
  @Input() childId: string;
  @Input() dataAttributeButtons: string;
  @Input() dataAttributeTooltip: string;
  @Input() variation: string = mapVariation.origin;
  @Input() hasApiFailed: boolean;
  @Output() mapTypeChanged = new EventEmitter();
  @Input() errorReason: string;
  @Input() pageSection: string;
  @Input() minZoomLevel: number;
  @Input() fitToWorld = false;
  @Input() drilldownParams: DrilldownParams;
  @Input() enableDrilldown = false;
  /**
   * For supporting label changes of Coverngence Warehouse Experience
   */
  @Input() isConvergenceExperience: boolean;

  buttonSelected = 'button-selected';
  buttonNotSelected = 'button-not-selected';

  listOfLocations: any = [];
  mapConfig = mapConfig;
  mapHeight: string = mapHeight;
  mapMarkerConfig = mapMarkerConfig;
  leftButtonStyle = this.buttonSelected;
  rightButtonStyle = this.buttonNotSelected;
  buttonTypes = [];
  showFilterButtons = true;
  processedMapData = [];
  defaultType = null;
  currentMapType = MAP_TYPE.origin;
  mapInfoWindowId = MAP_INFO_WINDOW_ID;

  /**
   * ngOnChanges lifecycle hook
   */
  ngOnChanges(changes: SimpleChanges) {
    this.showFilterButtons = this.mapDetails.length > 0;
    this.processDataForMap(this.mapDetails);
    // Display the first type by default
    if (this.defaultType) {
      this.generateMap(this.processedMapData, this.defaultType);
    }

    if (
      changes?.minZoomLevel?.previousValue !==
      changes?.minZoomLevel?.currentValue
    ) {
      this.mapConfig = {
        ...CommonUtility.deepClone(mapConfig),
        minZoom: this.minZoomLevel,
      };
    }
  }
  /**
   * takes a percentge value and converts it into radius for map
   * @param percentage a value in percentage, eg: 10%
   */
  convertIntoRadius(percentage: string) {
    const percentageValue = parseInt(percentage, 10);
    if (percentageValue < 10 || isNaN(percentageValue)) {
      return maxRadius * 0.1;
    }
    return maxRadius * (parseInt(percentage, 10) / 100);
  }

  /**
   * processes input data into required form
   * @param mapDetails this is input data to component
   */
  processDataForMap(mapDetails) {
    if (this.variation === mapVariation.warehouse) {
      this.processedMapData = [
        {
          type: mapTypes.inbound,
          locationList: [],
        },
        {
          type: mapTypes.outbound,
          locationList: [],
        },
      ];
      this.buttonTypes.push({
        type: mapTypes.inbound,
        label: this.isConvergenceExperience ? mapTypes.asn : mapTypes.inbound,
      });
      this.buttonTypes.push({
        type: mapTypes.outbound,
        label: this.isConvergenceExperience
          ? mapTypes.distribution
          : mapTypes.outbound,
      });
      for (const detail of this.mapDetails) {
        if (detail.location) {
          const inbElement: LocationElement = {
            latLng: {
              lat: null,
              lng: null,
            },
            circleDesign: null,
            infoBoxTemplate: '',
            countryCode: detail.name,
          };
          inbElement.latLng.lat = parseFloat(detail.location.latitude);
          inbElement.latLng.lng = parseFloat(detail.location.longitude);
          inbElement.circleDesign = { ...circleDesign };
          inbElement.circleDesign.radius = this.convertIntoRadius(
            detail.inboundVolumePercentage
          );
          inbElement.infoBoxTemplate = this.createTooltipTemplate(
            detail.inboundShipmentCount,
            detail.inboundVolumePercentage,
            detail.name,
            this.isConvergenceExperience
              ? mapTypes.asn.toUpperCase()
              : mapTypes.inbound
          );
          this.processedMapData[0].locationList.push(inbElement);

          const outElement: LocationElement = {
            latLng: {
              lat: null,
              lng: null,
            },
            circleDesign: null,
            infoBoxTemplate: '',
            countryCode: detail.name,
          };
          outElement.latLng.lat = parseFloat(detail.location.latitude);
          outElement.latLng.lng = parseFloat(detail.location.longitude);
          outElement.circleDesign = { ...circleDesign };
          outElement.circleDesign.radius = this.convertIntoRadius(
            detail.outboundVolumePercentage
          );
          outElement.infoBoxTemplate = this.createTooltipTemplate(
            detail.outboundShipmentCount,
            detail.outboundVolumePercentage,
            detail.name,
            this.isConvergenceExperience
              ? mapTypes.distribution
              : mapTypes.outbound
          );
          this.processedMapData[1].locationList.push(outElement);
        }
      }
      if (this.processedMapData[0].locationList.length > 0) {
        this.defaultType = mapTypes.inbound;
      } else {
        this.showFilterButtons = false;
      }
    } else {
      this.processedMapData = [];
      for (const detail of this.mapDetails) {
        this.buttonTypes.push({
          type: detail.type,
          label: detail.type,
        });
        const locations = [];
        let totalCount = 0;
        /* istanbul ignore else */
        if (detail.summary) {
          // null check for summary
          for (const loc of detail.summary) {
            if (loc.id in countryList) {
              totalCount += parseInt(loc.count, 10);
            }
          }
          for (const loc of detail.summary) {
            const element: LocationElement = {
              latLng: {
                lat: null,
                lng: null,
              },
              circleDesign: null,
              infoBoxTemplate: '',
              countryCode: loc.name,
            };
            if (loc.id in countryList) {
              element.latLng.lat = countryList[loc.id].latlng[0];
              element.latLng.lng = countryList[loc.id].latlng[1];
              element.circleDesign = { ...circleDesign };
              const shipmentVolume = this.roundOff(
                (100 * loc.count) / totalCount,
                1
              ).toString();
              element.circleDesign.radius = this.convertIntoRadius(
                shipmentVolume
              );
              element.infoBoxTemplate = this.createTooltipTemplate(
                loc.count,
                shipmentVolume,
                loc.name,
                mapTypes.shipment
              );
              locations.push(element);
            }
          }
        }
        if (locations.length === 0) {
          this.showFilterButtons = false;
        } else {
          this.defaultType = this.defaultType ? this.defaultType : detail.type;
        }
        this.processedMapData.push({
          type: detail.type,
          locationList: locations,
        });
      }
    }
  }
  /**
   * takes a number value and rounds off the number
   * @param num a number
   * @param digits number of digits in the decimal place
   */
  roundOff(num, digits) {
    const multiplier = Math.pow(10, digits || 0);
    return Math.round(num * multiplier) / multiplier;
  }

  /**
   * collates all the necessary data for map
   * @param processedData processed map data
   * @param type this is the type of shipment data to be displayed on map
   */
  generateMap(processedData, type) {
    for (const detail of processedData) {
      if (detail.type === type) {
        this.listOfLocations = detail.locationList;
      }
    }
  }

  /**
   * Updates the map based on the type of data to be displayed
   * @param type Type on which map data has to be filtered
   */
  updateMap(type) {
    this.currentMapType = type;
    this.mapTypeChanged.emit(type);
    this.generateMap(this.processedMapData, type);
    if (type === this.buttonTypes[0]?.type) {
      this.leftButtonStyle = this.buttonSelected;
      this.rightButtonStyle = this.buttonNotSelected;
    } else {
      this.leftButtonStyle = this.buttonNotSelected;
      this.rightButtonStyle = this.buttonSelected;
    }
  }

  /**
   * creates tooltip template
   * @param shipmentCount count of shipment
   * @param volume volume of shipment
   * @param name name of location
   * @param variation type of map variation
   */
  createTooltipTemplate(
    shipmentCount: string,
    volume: string,
    name: string,
    variation: string
  ): string {
    return `<div class="map-info-window" id="${this.mapInfoWindowId}" style="width: 178px; padding: 11px 15px 15px 15px;" data-automation=${this.dataAttributeTooltip}>
    <div style="border-bottom: 1px solid #eeeeee;">
      <p class="tooltip-heading">
        ${name}
      </p>
    </div>
    <div style="margin-top: 10px;">
      <div class="row" style="padding-left: 10px;">
        <p class="tooltip-field-heading">
          ${variation} Volume (${shipmentCount})
        </p>
        <p class="tooltip-field-value">
          ${volume}%
        </p>
      </div>
      <div>
        <div style="width: 100%; background-color: #e4e8eb;">
          <div
            style="width: ${volume};height: 4px;background-color: #2666BF;"
          ></div>
        </div>
      </div>
    </div>
  </div>
    `;
  }

  /**
   * Getting value from map component
   * @param data - countryName string
   */
  clickOnMapInfoBox(data) {
    if (this.enableDrilldown) {
      let applyFilters;
      if (this.currentMapType === MAP_TYPE.origin) {
        applyFilters = { origin: data, destination: null };
      } else {
        applyFilters = { origin: null, destination: data };
      }
      const state = {};
      state[this.drilldownParams.routerStateKey] = [
        {
          key: this.drilldownParams.filterKey,
          value: applyFilters,
        },
      ];
      NavigationUtility.navigate(
        this.drilldownParams.router,
        this.drilldownParams.drilldownUrl,
        this.drilldownParams.isCrossApp,
        { state }
      );
    }
  }
}

interface LocationElement {
  latLng: {
    lat: number;
    lng: number;
  };
  countryCode: string;
  circleDesign?: { radius: number };
  infoBoxTemplate: string;
}
