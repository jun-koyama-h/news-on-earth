import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { LatLngLiteral } from 'leaflet';

interface LocationMarkerProps {
  position: LatLngLiteral | null;
}

const LocationMarker: React.FC<LocationMarkerProps> = ({ position }) => {
  return position ? (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  ) : null;
};

export default LocationMarker;
