// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// Generic base map component

import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';

import { MAP_INFO_WINDOW_ID } from '../../../constants';

import {
  defaultConfig,
  defaultMarkerConfig,
  markerTypes,
} from './base-map.config';
import { MapLocation, MarkerConfig } from './base-map.interfaces';

declare let google: any;
@Component({
  selector: 'lib-base-map',
  templateUrl: './base-map.component.html',
  styleUrls: ['./base-map.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BaseMapComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() mapConfig?: any = {};
  @Input() listOfLocations: Array<MapLocation>;
  @Input() mapMarkerConfig: any;
  @Input() mapHeight: string;
  @Input() childId: string;
  @Input() emitClickEvent = false;
  @Output() clickOnInfoWindow = new EventEmitter();
  @Input() fitToWrold = false;

  marker: any = null;
  mapContainerStyle: string;
  selectedMarker: any = null;
  selectedCenterMarker: any = null;
  markerConfig: MarkerConfig = defaultMarkerConfig;
  map: any;
  infoWindow: any;
  bounds: any;
  centerCircles: Array<any> = [];
  volumeCircles: Array<any> = [];
  showMap = true;
  listener: any;
  mapInfoWindowId = MAP_INFO_WINDOW_ID;
  selectedCountry: string;

  /**
   * ngOnInit lifecycle hook
   */
  ngOnInit(): void {
    this.markerConfig = {
      ...this.markerConfig,
      ...this.mapMarkerConfig,
    };
  }

  /**
   * ngAfterViewInit lifecycle hook
   */
  ngAfterViewInit() {
    if (this.showMap && !this.map) {
      this.initMap();
    }
  }
  /**
   * ngOnChanges lifecycle hook
   */
  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.listOfLocations.previousValue !==
      changes.listOfLocations.currentValue
    ) {
      this.showMap = this.listOfLocations.length > 0;
      if (this.map) {
        this.bounds = new google.maps.LatLngBounds();
        this.loadMarkers(
          this.map,
          this.listOfLocations,
          this.infoWindow,
          this.bounds
        );
      } else if (
        this.showMap &&
        !this.map &&
        document.getElementById(this.childId)
      ) {
        this.initMap();
      }
    }
  }
  /**
   * initializes the map
   */
  initMap() {
    this.mapConfig = {...defaultConfig, ...this.mapConfig};
    this.map = new google.maps.Map(document.getElementById(this.childId), {
      ...this.mapConfig,
    });
    this.infoWindow = new google.maps.InfoWindow();
    this.bounds = new google.maps.LatLngBounds();
    /* istanbul ignore next */
    google.maps.event.addListenerOnce(this.map, 'tilesloaded', () => {
      this.loadMarkers(
        this.map,
        this.listOfLocations,
        this.infoWindow,
        this.bounds
      );
    });
    /* istanbul ignore else */
    if (this.mapMarkerConfig.markerType === markerTypes.Circle) {
      /* istanbul ignore next */
      google.maps.event.addListener(this.map, 'click', (ev) => {
        this.infoWindow.close();
        this.clearSelectedMarker();
      });
      google.maps.event.trigger(this.map, 'resize');
    }
  }
  /**
   * Clears all circles on map
   */
  clearCircles(circleList) {
    for (const circle of circleList) {
      circle.setMap(null);
    }
    return []; // Empty circleList for new circles.
  }
  /**
   * Clears selected marker on the map
   */
  clearSelectedMarker() {
    if (this.selectedMarker != null) {
      this.selectedMarker.setOptions({
        fillColor: this.markerConfig.markerProperties.circle.normalColor,
        strokeColor: this.markerConfig.markerProperties.circle.normalColor,
      });
      this.selectedCenterMarker.setOptions({
        fillColor: this.markerConfig.markerProperties.circle.normalColor,
        strokeColor: this.markerConfig.markerProperties.circle.normalColor,
      });
    }
    this.selectedMarker = null;
    this.selectedCenterMarker = null;
  }

  /**
   * Realigns map bounds in case international date line is detected inside bounds.
   */
  reAlignMapBounds(bounds) {
    /* istanbul ignore else */
    if (bounds.getSouthWest().lng() >= 0 && bounds.getNorthEast().lng() < 0) {
      // Condition for date line
      /* istanbul ignore next */
      bounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(
          bounds.getSouthWest().lat(),
          bounds.getSouthWest().lng() - 180
        ),
        new google.maps.LatLng(
          bounds.getNorthEast().lat(),
          bounds.getNorthEast().lng() + 180
        )
      );
    }
    return bounds;
  } // Ignoring this since we are not creating a google maps object in test so cant test this.

  /* istanbul ignore next */
  /**
   * Realigns map bounds in case circle markers are outside bounds.
   */
  reAlignMapBoundsToFitCircles() {
    const tempBounds = this.map.getBounds();
    /* istanbul ignore else */
    if (tempBounds) {
      for (const volumeCircle of this.volumeCircles) {
        /* istanbul ignore else */
        if (
          !(
            tempBounds.contains(volumeCircle.getBounds().getNorthEast()) &&
            tempBounds.contains(volumeCircle.getBounds().getSouthWest())
          )
        ) {
          tempBounds.union(volumeCircle.getBounds());
        }
      }
      /* istanbul ignore else */
      if (!tempBounds.equals(this.map.getBounds())) {
        // Re align only when new bounds are found
        this.map.fitBounds(tempBounds);
        this.map.panToBounds(tempBounds);
      }
    }
  }
  /**
   * sets the map markers options
   */
  onCenterClick(
    cityCircle,
    centerCircle,
    infoWindow,
    contentString,
    map,
    selectedCircle,
    countryCode
  ) {
    /* istanbul ignore next */
    google.maps.event.addListener(selectedCircle, 'click', (ev) => {
      this.clearSelectedMarker();
      this.selectedMarker = cityCircle;
      this.selectedCenterMarker = centerCircle;
      this.selectedCountry = countryCode;
      cityCircle.setOptions({
        fillColor: this.markerConfig.markerProperties.circle.selectedColor,
        strokeColor: this.markerConfig.markerProperties.circle.selectedColor,
      });
      centerCircle.setOptions({
        fillColor: this.markerConfig.markerProperties.circle.selectedColor,
        strokeColor: this.markerConfig.markerProperties.circle.selectedColor,
      });
      infoWindow.setPosition(ev.latLng);
      infoWindow.setOptions({
        content: contentString,
      });
      infoWindow.open(map, cityCircle);
      if (this.emitClickEvent){
        // wait for map and info window to be rendered
        this.listener = infoWindow.addListener('domready', () => {
          // add listner to on click for info window
          document.getElementById(this.mapInfoWindowId).addEventListener('click', this.mapTooltipClicked.bind(this));
        });
      }
    });
  }

  /**
   * Event listener for map tooltip click
   */
  mapTooltipClicked(event){
    this.clickOnInfoWindow.emit(this.selectedCountry);
  }

  /**
   * Load initial markers on map
   */
  loadMarkers(map, listOfLocations, infoWindow, bounds) {
    switch (this.markerConfig.markerType) {
      case markerTypes.Circle:
        this.volumeCircles = this.clearCircles(this.volumeCircles);
        this.centerCircles = this.clearCircles(this.centerCircles);
        for (const loc of listOfLocations) {
          const cityCircle = new google.maps.Circle({
            ...loc.circleDesign,
            map,
            center: loc.latLng,
            radius: loc.circleDesign.radius,
          });
          this.volumeCircles.push(cityCircle);
          const centerCircle = new google.maps.Circle({
            ...this.markerConfig.centerCircleDesign,
            map,
            center: loc.latLng,
          });
          this.centerCircles.push(centerCircle);
          bounds.union(cityCircle.getBounds());
          const contentString = loc.infoBoxTemplate;
          this.onCenterClick(
            cityCircle,
            centerCircle,
            infoWindow,
            contentString,
            map,
            centerCircle,
            loc.countryCode
          );
          this.onCenterClick(
            cityCircle,
            centerCircle,
            infoWindow,
            contentString,
            map,
            cityCircle,
            loc.countryCode
          );
          bounds.extend(loc.latLng);
        }
        bounds = this.reAlignMapBounds(bounds);
        map.fitBounds(bounds);
        map.panToBounds(bounds);
        this.reAlignMapBoundsToFitCircles();
        if (this.fitToWrold) {
          this._worldViewFit(this.map);
        }
        break;
      case markerTypes.CircleMarker:
        if (this.marker) {
          this.marker.setMap(null);
        }
        for (const loc of listOfLocations) {
          const pixelOffset = this.mapMarkerConfig.infoWindowProps.pixelOffset;
          this.marker = new google.maps.Marker({
            position: {
              lat: loc.latLng[0],
              lng: loc.latLng[1],
            },
            map,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              fillOpacity: 1,
              ...this.mapMarkerConfig.markerProperties.marker.markerProps,
            },
          });

          infoWindow.setOptions({
            content: loc.infoBoxTemplate,
            pixelOffset: new google.maps.Size(pixelOffset.x, pixelOffset.y),
          });
          infoWindow.open(map, this.marker);
        }
    }
  }

  /**
   * On Destroy
   */
  ngOnDestroy() {
    if (this.emitClickEvent) {
      if (this.listener){
        this.listener.remove();
      }
      if (document.getElementById(this.mapInfoWindowId)){
        document.getElementById(this.mapInfoWindowId).removeEventListener('click', this.mapTooltipClicked.bind(this));
      }
    }
  }

  /**
   * Fit bounds to corner point of the world.
   *
   * Google map can fit world into 512x512 pixels container without repeating world.
   * But, We can fit world map(without repeating) in larger container also,
   * For doing that we have to set restriction on Minimum zoom and
   * take the coordinates of corner most points and fit map bounds accordingly.
   * @param mapObj Map object
   */
  private _worldViewFit(mapObj) {
    const worldBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(85.0, -179.809166), // Top-left
      new google.maps.LatLng(-80.886195, -179.859796), // Bottom-left
      new google.maps.LatLng(85.0, 179.683602), // Top-right
      new google.maps.LatLng(-84.92281, 179.156258) // Bottom-right
    );
    mapObj.fitBounds(worldBounds, 0);
  }
}
