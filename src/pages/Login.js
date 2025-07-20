// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';
import '../styles.css';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onLogin = async () => {
    try {
      const res = await login(phone, password);
      localStorage.setItem('user', JSON.stringify(res.data));
      navigate(res.data.role === 'driver' ? '/driver' : '/rider');
    } catch {
      setError('Login failed');
    }
  };

  return (
    <div className="container">
      <img src="../ridelogo.jpeg" alt="Logo" className="logo" />
      <h2>Login</h2>
      <input placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button onClick={onLogin}>Login</button>
      {error && <p style={{ color:'red' }}>{error}</p>}
    </div>
  );
}
