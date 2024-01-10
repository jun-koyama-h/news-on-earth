import React from 'react';
import MapContainer from '../components/MapContainer'
import '../../node_modules/leaflet/dist/leaflet.css'
const Map: React.FC = () => {
  
  return (
    <div>
      <MapContainer center={{ lat: 51.505, lng: -0.09 }} zoom={13} />
    </div> 
  );
};

export default Map;
