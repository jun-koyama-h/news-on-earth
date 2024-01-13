import React from 'react';
import { MapContainer as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';

interface MapContainerProps {
  center: { lat: number; lng: number };
  zoom: number;
}

const MapContainer: React.FC<MapContainerProps> = ({ center, zoom }) => {
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
      <Marker position={center}>
        <Popup>Location</Popup>
      </Marker>
    </LeafletMap>
  );
};

export default MapContainer;
