// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// Basic config for the base map

export const defaultConfig = {
  zoom: 2,
  center: { lat: -34.397, lng: 150.644 },
  mapTypeControl: false,
  mapTypeId: 'roadmap',
  zoomControl: true,
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
  centerOffset: {
    x: 100,
    y: 50,
  },
};

export const defaultMarkerConfig = {
  markerType: null,
  markerProperties: {
    circle: null,
    marker: null,
  },
  infoWindowProps: null,
  centerCircleDesign: null,
};

export const markerTypes = {
  Circle: 'Circle',
  CircleMarker: 'CircleMarker',
};
