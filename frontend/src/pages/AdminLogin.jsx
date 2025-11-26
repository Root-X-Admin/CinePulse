/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { setToken } from '../api'; // keep this if you use it elsewhere

export default function AdminLogin() {
  const [email, setEmail] = useState(''); // admin email
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.msg || 'Login failed');
        return;
      }

      // Save real JWT token
      localStorage.setItem('fm_token', data.token);
      setToken(data.token); // optional, if your api helper uses it

      // Redirect to admin page
      navigate('/admin', { replace: true });
    } catch (err) {
      console.error(err);
      setError('Server error');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        maxWidth: '400px',
        margin: '5rem auto',
        padding: '2rem',
        borderRadius: '12px',
        background: 'linear-gradient(180deg, #111, #222)',
        boxShadow: '0 0 20px rgba(255,0,68,0.4)',
      }}
    >
      <h1
        style={{
          textAlign: 'center',
          color: 'white',
          fontSize: '2rem',
          marginBottom: '1.5rem',
        }}
      >
        Admin Login
      </h1>
      <form
        onSubmit={handleLogin}
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: '0.75rem',
            borderRadius: '8px',
            border: 'none',
            outline: 'none',
            background: '#333',
            color: 'white',
          }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: '0.75rem',
            borderRadius: '8px',
            border: 'none',
            outline: 'none',
            background: '#333',
            color: 'white',
          }}
          required
        />
        {error && <span style={{ color: 'red', textAlign: 'center' }}>{error}</span>}
        <button
          type="submit"
          style={{
            padding: '0.75rem',
            borderRadius: '8px',
            border: 'none',
            background: '#ff0044',
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          Login
        </button>
      </form>
    </motion.div>
  );
}
