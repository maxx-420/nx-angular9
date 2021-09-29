// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// Location map config

declare const google: any;
const zoom = 2;
export const defaultConfig = {
  scrollwheel: false,
  panControl: false,
  mapTypeControl: false,
  mapTypeId: 'roadmap',
  zoomControl: true,
  streetViewControl: false,
  fullscreenControl: false,
  zoom,
  maxZoom: 6,
  minZoom: zoom,
  controlSize: 24,
  styles: [
    {
      elementType: 'geometry',
      stylers: [
        {
          color: '#FAFAFA',
        },
      ],
    },
    {
      featureType: 'administrative.province',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#D7D7D7',
        },
        {
          visibility: 'on',
        },
        {
          weight: 2,
        },
      ],
    },
    {
      featureType: 'administrative.country',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#000000',
        },
        {
          visibility: 'on',
        },
      ],
    },
    {
      featureType: 'water',
      stylers: [
        {
          color: '#545130',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#B0C3DD',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
  ],
};

export const markerProps = {
  strokeColor: '#2666BF',
  fillColor: '#FFFFFF',
  scale: 6,
};

export const markerConfig = {
  markerType: 'CircleMarker',
  markerProperties: {
    marker: {
      markerType: 'circle',
      markerProps: {
        strokeColor: '#2666BF',
        fillColor: '#FFFFFF',
        scale: 6,
      },
    },
  },
  infoWindowProps: {
    pixelOffset: {
      x: 120,
      y: 40,
    },
    disableAutoPan: true,
  },
  displayMarkerType: 'origin',
  centerCircleDesign: {},
};

export const buttonTypes = ['origin', 'destination'];

export const automationAttr = {
  mapShipmentAddress: 'map-shipment-address',
  button: {
    origin: 'map-filter-origin',
    destination: 'map-filter-destination',
  },
  mapFilters: 'map-filters',
  comboMap: 'combo-map',
};
