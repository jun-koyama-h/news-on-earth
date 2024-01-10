import React, { useState } from 'react';
import { MapContainer as LeafletMap, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { LatLngLiteral } from 'leaflet';

interface LocationMarkerProps {}

const LocationMarker: React.FC<LocationMarkerProps> = () => {

  const [position, setPosition] = useState<LatLngLiteral | null>(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
};

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
      <LocationMarker />
    </LeafletMap>
  );
};

export default MapContainer;
