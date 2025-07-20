// src/pages/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api';
import '../styles.css';

export default function Register() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('rider');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onRegister = async () => {
    try {
      await register(name, phone, password, role);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="container">
      <img src="../ridelogo.jpeg" alt="Logo" className="logo" />
      <h2>Register</h2>
      <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
      <input placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
      <select value={role} onChange={e=>setRole(e.target.value)}>
        <option value="rider">Rider</option>
        <option value="driver">Driver</option>
      </select>
      <button onClick={onRegister}>Register</button>
      {error && <p style={{ color:'red' }}>{error}</p>}
    </div>
  );
}
