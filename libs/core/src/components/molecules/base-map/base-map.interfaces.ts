// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// Base Map interfaces

export interface MapLocation {
  latLng: any;
  circleDesign: {};
  countryCode: string;
  infoBoxTemplate: string;
}

export interface MarkerConfig {
  markerType: string;
  markerProperties: {
    circle: {
      selectedColor: string;
      normalColor: string;
    };
    marker: {
      markerType: string;
      markerProps: {};
    };
  };
  infoWindowProps: {};
  centerCircleDesign: {};
}
