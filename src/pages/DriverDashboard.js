// src/pages/DriverDashboard.js
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import io from 'socket.io-client';
import '../styles.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

export default function DriverDashboard() {
  const mapContainer = useRef(null);
  const mapRef       = useRef(null);
  const [ride, setRide]     = useState(null);
  const [chat, setChat]     = useState('');
  const [messages, setMessages] = useState([]);
  const [notify, setNotify] = useState(false);
  const socketRef = useRef(null);

  // init map
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(pos => {
      const coords = [pos.coords.longitude, pos.coords.latitude];
      mapRef.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: coords,
        zoom: 13
      });
    });
  }, []);

  // socket listeners
  useEffect(() => {
    socketRef.current = io(process.env.REACT_APP_API_BASE);

    socketRef.current.on('ride_requested', data => {
      if (!ride) {
        setNotify(true);
        if (window.confirm(`Accept ride to ${data.dropoff_location}?`)) {
          fetch(`${process.env.REACT_APP_API_BASE}/api/rides/accept`, {
            method: 'POST',
            headers: {
              'Content-Type':'application/json',
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
            },
            body: JSON.stringify({ rideId: data.id })
          })
            .then(r=>r.json())
            .then(()=> {
              setRide(data);
              socketRef.current.emit('join_ride', data.id);
              setNotify(false);
            });
        } else {
          setNotify(false);
        }
      }
    });

    socketRef.current.on('chat_message', ({ message }) => {
      setMessages(prev=>[...prev, message]);
    });

    return () => socketRef.current.disconnect();
  }, [ride]);

  const sendMessage = () => {
    if (!ride || !chat.trim()) return;
    socketRef.current.emit('chat_message', { rideId: ride.id, message: chat });
    setMessages(prev=>[...prev, chat]);
    setChat('');
  };

  const completeRide = () => {
    alert('Ride completed');
    setRide(null);
    setMessages([]);
  };

  return (
    <div className="container">
      <header>
        <img src="/ridelogo.jpeg" className="logo" alt="Logo" />
        <h2>Driver Dashboard</h2>
      </header>

      {notify && <div className="notification-popup">New ride request!</div>}

      <div ref={mapContainer} className="map-container" />

      {ride && (
        <div className="ride-info">
          <h3>Trip Details</h3>
          <p><strong>Dest:</strong> {ride.dropoff_location}</p>
          <p><strong>Fare:</strong> GHS {ride.fare}</p>
          <button className="complete-button" onClick={completeRide}>Complete Ride</button>
        </div>
      )}

      <div className="chat-section">
        <h3>Chat</h3>
        <div className="chat-box">
          {messages.map((m,i)=><div key={i}>{m}</div>)}
        </div>
        <div className="chat-controls">
          <input value={chat} onChange={e=>setChat(e.target.value)} placeholder="Message..." />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}
