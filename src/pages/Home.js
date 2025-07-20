// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

export default function Home() {
  return (
    <div className="container">
      <img src="../ridelogo.jpeg" alt="Logo" className="logo" />
      <h2>Welcome to Safe Ride</h2>
      <p>A simple ride‑hailing service built for you.</p>
      <nav>
        <Link to="/login"><button>Login</button></Link>
        <Link to="/register"><button>Register</button></Link>
      </nav>
    </div>
  );
}
