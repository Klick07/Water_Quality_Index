import React from 'react';
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// 1. Sample Data - You can later replace this with props or an API call
const hotspotData = [
  { id: 1, lat: 18.5204, lng: 73.8567, radius: 1000, name: "High Activity Zone A" },
  { id: 2, lat: 18.5500, lng: 73.8800, radius: 1500, name: "High Activity Zone B" },
  { id: 3, lat: 18.5100, lng: 73.8200, radius: 800,  name: "High Activity Zone C" },
];

const HotspotMap = () => {
  const centerPosition = [18.5204, 73.8567]; // Default center (e.g., Pune)

  return (
    <div style={{ width: '100%', height: '720px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #ddd' }}>
      <MapContainer 
        center={centerPosition} 
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
      >
        {/* The Base Map Layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Mapping through data to create Red Hotspots */}
        {hotspotData.map((spot) => (
          <Circle
            key={spot.id}
            center={[spot.lat, spot.lng]}
            radius={spot.radius} // Radius in meters
            pathOptions={{
              color: '#ff0000',      // Border color
              fillColor: '#ff4d4d',  // Fill color
              fillOpacity: 0.5,      // Transparency
              weight: 2              // Border thickness
            }}
          >
            <Popup>
              <strong>{spot.name}</strong> <br />
              Intensity: {spot.radius}m radius
            </Popup>
          </Circle>
        ))}
      </MapContainer>
    </div>
  );
};

export default HotspotMap;