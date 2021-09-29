// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// Config for Combo Map component

export const circleDesign = {
  radius: 0,
  strokeColor: '#FFC400',
  strokeOpacity: 0.0,
  fillColor: '#FFC400',
  fillOpacity: 0.2,
};
export const mapConfig = {
  zoom: 2,
  restriction: {
    latLngBounds: {
      north: 85,
      south: -85,
      west: -180,
      east: 180,
    },
  },
  controlSize: 28,
  mapTypeControl: false,
  mapTypeId: 'roadmap',
  zoomControl: true,
  center: { lat: 43.053035, lng: 16.170779 }, // Center location: Vis,Croatia
  streetViewControl: false,
  fullscreenControl: false,
  maxZoom: 6,
  minZoom: 1,
};

export const mapMarkerConfig = {
  markerType: 'Circle',
  markerProperties: {
    circle: {
      selectedColor: '#2666BF',
      normalColor: '#FFC400',
    },
  },
  centerCircleDesign: {
    radius: 60000,
    strokeColor: '#FFC400',
    strokeOpacity: 0.25,
    fillColor: '#FFC400',
    fillOpacity: 1,
  },
};
export const maxRadius = 1500000;
export const mapHeight = '500px';

export const mapVariation = {
  warehouse: 'Warehouse',
  origin: 'Origin',
};

export const mapTypes = {
  inbound: 'Inbound',
  outbound: 'Outbound',
  shipment: 'Shipment',
  // Note :: do not use space in value, label mapping will break
  asn: 'asn',
  distribution: 'distribution',
};
