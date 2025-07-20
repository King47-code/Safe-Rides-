// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login    from './pages/Login';
import RiderDashboard  from './pages/RiderDashboard';
import DriverDashboard from './pages/DriverDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"           element={<Home />} />
        <Route path="/register"   element={<Register />} />
        <Route path="/login"      element={<Login />} />
        <Route path="/rider"      element={<RiderDashboard />} />
        <Route path="/driver"     element={<DriverDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
