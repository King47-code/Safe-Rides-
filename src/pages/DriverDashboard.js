// DriverDashboard.js (Hardcoded Demo)
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

export default function DriverDashboard() {
  const mapContainer = useRef(null);
  const pickupCoords = [ -0.1750, 5.6370 ];   // Accra Mall
  const dropoffCoords = [ -0.1710, 5.6050 ];  // Kotoka Airport

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: pickupCoords,
      zoom: 13,
    });

    new mapboxgl.Marker({ color: 'blue' })
      .setLngLat(pickupCoords)
      .setPopup(new mapboxgl.Popup().setText('Pickup: Accra Mall'))
      .addTo(map);

    new mapboxgl.Marker({ color: 'red' })
      .setLngLat(dropoffCoords)
      .setPopup(new mapboxgl.Popup().setText('Dropoff: Kotoka Airport'))
      .addTo(map);
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Driver Dashboard (Demo)</h2>
      <div ref={mapContainer} style={{ width: '100%', height: '400px', marginBottom: '1rem' }} />
      <p><strong>Ride Accepted:</strong> Picking up from Accra Mall to Kotoka Airport.</p>
      <p><strong>Fare:</strong> GHS 25.00</p>
    </div>
  );
}
