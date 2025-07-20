// RiderDashboard.js (Hardcoded Demo)
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

export default function RiderDashboard() {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const [rideConfirmed, setRideConfirmed] = useState(false);
  const [messages, setMessages] = useState([]);

  // Hardcoded coordinates: Accra Mall to Kotoka Airport
  const pickupCoords = [ -0.1750, 5.6370 ];   // Accra Mall
  const dropoffCoords = [ -0.1710, 5.6050 ];  // Kotoka Airport
  const fare = 25.00;

  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: pickupCoords,
      zoom: 13,
    });

    new mapboxgl.Marker({ color: 'blue' })
      .setLngLat(pickupCoords)
      .setPopup(new mapboxgl.Popup().setText('Pickup: Accra Mall'))
      .addTo(mapRef.current);

    new mapboxgl.Marker({ color: 'red' })
      .setLngLat(dropoffCoords)
      .setPopup(new mapboxgl.Popup().setText('Dropoff: Kotoka Airport'))
      .addTo(mapRef.current);
  }, []);

  const simulateRide = () => {
    setRideConfirmed(true);
    setMessages([
      "Rider: Hi, I'm at Accra Mall.",
      "Driver: I'm on my way to pick you up.",
      "Rider: Thank you!",
      "Driver: You're welcome. See you shortly.",
    ]);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Rider Dashboard (Demo)</h2>

      <button onClick={simulateRide} style={{ marginBottom: '1rem', padding: '0.5rem' }}>
        Simulate Ride Request
      </button>

      <div ref={mapContainer} style={{ width: '100%', height: '400px', marginBottom: '1rem' }} />

      {rideConfirmed && (
        <div style={{ background: '#eef', padding: '1rem', marginBottom: '1rem' }}>
          <h4>Ride Confirmed</h4>
          <p><strong>From:</strong> Accra Mall</p>
          <p><strong>To:</strong> Kotoka Airport</p>
          <p><strong>Fare:</strong> GHS {fare.toFixed(2)}</p>
        </div>
      )}

      <div>
        <h4>Chat</h4>
        <div style={{ border: '1px solid #ccc', padding: '0.5rem', maxHeight: '200px', overflowY: 'auto' }}>
          {messages.map((msg, i) => (
            <p key={i} style={{ margin: '0.25rem 0' }}>{msg}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
