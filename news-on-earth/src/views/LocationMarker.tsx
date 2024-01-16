import React, { useEffect } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';

interface LocationMarkerProps {
  position: { lat: number; lng: number };
}

const LocationMarker: React.FC<LocationMarkerProps> = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo(position);
  }, [position, map]);

  return (
    <Marker position={position}>
      <Popup>指定された位置</Popup>
    </Marker>
  );
};

export default LocationMarker;
