// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// Location map component

import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';

import { RenderLabelPipe } from '../../../pipe/render-label/render-label.pipe';

import {
  automationAttr,
  buttonTypes,
  defaultConfig,
  markerConfig,
} from './location.map.config';

declare const google: any;
@Component({
  selector: 'lib-location-map',
  templateUrl: './location-map.component.html',
  styleUrls: ['./location-map.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LocationMapComponent implements OnInit, OnChanges {
  @Input() mapConfig?: any = {};
  @Input() mapContainerClass?: string;
  @Input() markerProps?: any = {};
  @Input() inputLocation: any = null;
  @Input() childId: string = null;
  @Input() infowindowTemplate: string;
  @Input() inputAddress: any = {};
  @Input() automationAttr?: any = automationAttr;
  @Input() googleLoaded: boolean;
  @Input() buttonTypes?: Array<string> = buttonTypes;

  mapContainerStyle: string;
  listOfLocations: Array<any> = [];
  mapMarkerConfig = markerConfig;
  windowTemplate: string;
  selectedLocation: any;
  selectedAddress: any;
  completeAddress: any;
  toggleValue;
  constructor(private readonly contentPipe: RenderLabelPipe) {}
  /**
   * Lifecycle hook
   */
  ngOnInit(): void {
    this.toggleValue = this.buttonTypes[0];
    this.initMap();
  }
  /**
   * lifecycle event
   * @param changes changes in state
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes.inputLocation &&
        changes.inputLocation.previousValue !==
          changes.inputLocation.currentValue) ||
      (changes.inputAddress &&
        changes.inputAddress.previousValue !==
          changes.inputAddress.currentValue) ||
      (changes.googleLoaded &&
        changes.googleLoaded.previousValue !==
          changes.googleLoaded.currentValue)
    ) {
      this.initMap();
    }
  }
  /**
   * initializes a map with required marker
   */
  initMap() {
    this.setSelectedAddressAndLocation();
    this.windowTemplate = this.getTemplate(
      this.selectedAddress,
      this.automationAttr.mapShipmentAddress
    );
    if (this.googleLoaded) {
      this.mapConfig = {
        ...this.mapConfig,
        ...defaultConfig,
        zoomControlOptions: {
          style: google.maps.ZoomControlStyle.SMALL,
          position: google.maps.ControlPosition.RIGHT_BOTTOM,
        },
        center: this.selectedLocation,
      };
    }
    this.listOfLocations = [
      {
        latLng: [this.selectedLocation?.lat, this.selectedLocation?.lng],
        infoBoxTemplate: this.windowTemplate,
      },
    ];
  }

  /**
   * set the address and location
   */
  setSelectedAddressAndLocation() {
    if (this.inputAddress) {
      this.selectedAddress = this.inputAddress[this.toggleValue];
    } else {
      this.selectedAddress = null;
    }
    if (this.inputLocation) {
      this.selectedLocation = this.inputLocation[this.toggleValue];
    } else {
      this.selectedLocation = null;
    }
    this.childId = this.toggleValue + 'Map';
    if (!this.googleLoaded || !this.selectedLocation) {
      if (this.selectedAddress) {
        this.completeAddress = this.getSlicedAddress(this.selectedAddress);
        if (!this.completeAddress || !this.completeAddress.trim()) {
          this.completeAddress = this.contentPipe.transform(
            'lbl_inbound_shipment_addressInformationNotAvailable'
          );
        }
      } else {
        this.completeAddress = this.contentPipe.transform(
          'lbl_inbound_shipment_addressInformationNotAvailable'
        );
      }
    }
  }

  /**
   * On toggle changes set the address and location
   */

  toggleChanged(type) {
    this.toggleValue = type;
    this.initMap();
  }
  /**
   * to format address word
   * @param item address part
   * @param comma to add
   */
  private formatWord(item: any, comma: boolean) {
    if (item) {
      if (comma) {
        return `${item}, `;
      } else {
        return item;
      }
    }
    return '';
  }
  /**
   * to slice and join the
   * @param address to slice the addresses
   */

  private getSlicedAddress(address) {
    let completeAddress = `${this.formatWord(
      address.line1,
      true
    )}${this.formatWord(address.line2, true)}${this.formatWord(
      address.city,
      true
    )}
    ${this.formatWord(
      address.state,
      address.zipCode || address.country
    )}${this.formatWord(address.zipCode, address.country)}${this.formatWord(
      address.country,
      false
    )}`;
    if (completeAddress.length > 55) {
      completeAddress = completeAddress.slice(0, 55) + '...';
    }
    return completeAddress;
  }
  /**
   * to generate template
   * @param address address
   * @param attr attr
   */
  private getTemplate(address, attr) {
    let template = '';
    if (address) {
      template = `<div data-automation="${attr}"><div class="address">${this.getSlicedAddress(
        address
      )}</div>`;
    }
    return template;
  }
}
