import React from 'react';
import { MapContainer as LeafletMap, TileLayer } from 'react-leaflet';
import LocationMarker from './LocationMarker'; // LocationMarker のインポート

interface MapContainerProps {
  center: { lat: number; lng: number };
  zoom: number;
  position?: { lat: number; lng: number }; // 新しいprops
}

const MapContainer: React.FC<MapContainerProps> = ({ center, zoom, position }) => {
  const MapContainerStyle = {
    width: "800px",
    height: "800px"
  };

  return (
    <LeafletMap center={center} zoom={zoom} scrollWheelZoom={false} style={MapContainerStyle}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {position && <LocationMarker position={position} />}
    </LeafletMap>
  );
};

export default MapContainer;
