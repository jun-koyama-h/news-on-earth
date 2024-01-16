import React from 'react';
import MapContainer from './MapContainer'
import 'leaflet/dist/leaflet.css';

interface MapProps {
  location: { lat: number; lng: number };
}

const Map: React.FC<MapProps> = ({ location }) => {
  const defaultCenter = { lat: 35.6895, lng: 139.6917 };
  const center = location || defaultCenter;

  return (
    <div>
      <MapContainer center={center} zoom={5} position={location ? location : null} />
    </div>
  );
};

export default Map;
