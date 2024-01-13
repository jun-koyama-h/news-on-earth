import React from 'react';
import { MapContainer as LeafletMap, TileLayer } from 'react-leaflet';
import LocationMarker from './LocationMarker'; // LocationMarker のインポート

interface MapContainerProps {
  center: { lat: number; lng: number };
  zoom: number;
  position?: { lat: number; lng: number }; // 新しいprops
}

const MapContainer: React.FC<MapContainerProps> = ({ center, zoom, position }) => {
  console.log('mapcontainer->', center)
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
      {position && <LocationMarker position={position} />} // 位置情報があれば LocationMarker を表示
    </LeafletMap>
  );
};

// MapContainer.tsx
// interface LocationMarkerProps {
//   position: { lat: number; lng: number } | null;
// }

// const LocationMarker: React.FC<LocationMarkerProps> = ({ position }) => {
//   if (position === null) return null;

//   return (
//     <Marker position={position}>
//       <Popup>指定された位置</Popup>
//     </Marker>
//   );
// };

export default MapContainer;
