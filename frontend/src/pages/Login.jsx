/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
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
        // Backend expects 'email', so we send username as 'email'
        body: JSON.stringify({ email: username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.msg || 'Login failed');
        return;
      }

      // 1. Save the token immediately
      localStorage.setItem('fm_token', data.token);

      // 2. CHECK ROLE & REDIRECT
      if (data.user && data.user.isAdmin) {
        // If user is Admin, send to Dashboard
        navigate('/admin');
      } else {
        // If regular user, send to Home
        navigate('/'); 
      }
      
    } catch (err) {
      console.error(err);
      setError('Server error. Please try again later.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      css={css`
        max-width: 400px;
        margin: 5rem auto 0 auto;
        padding: 2rem;
        background: linear-gradient(to bottom, #1f1f1f, #000);
        border-radius: 1rem;
        box-shadow: 0 15px 40px rgba(255,0,150,0.2);
      `}
    >
      <h1 css={css`color: #fff; text-align: center; margin-bottom: 1.5rem;`}>
        Login
      </h1>
      <form onSubmit={handleLogin} css={css`display: flex; flex-direction: column; gap: 1rem;`}>
        <input
          type="text"
          placeholder="Username (e.g. admin)"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          css={css`padding: 0.75rem; border-radius: 0.5rem; border: none;`}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          css={css`padding: 0.75rem; border-radius: 0.5rem; border: none;`}
        />
        
        {error && <span css={css`color: #ff4444; text-align: center;`}>{error}</span>}

        <button
          type="submit"
          css={css`
            padding: 0.75rem;
            border-radius: 0.5rem;
            background: #ff0096;
            color: #fff;
            font-weight: bold;
            cursor: pointer;
            border: none;
            &:hover { background: #ff0044; }
          `}
        >
          Login
        </button>
      </form>
    </motion.div>
  );
}