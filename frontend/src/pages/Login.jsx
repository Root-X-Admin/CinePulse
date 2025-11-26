/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Temporary: just redirect
    navigate('/admin');
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
      <h1
        css={css`
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 1.5rem;
          text-align: center;
          color: #fff;
        `}
      >
        Admin Login
      </h1>
      <form
        onSubmit={handleLogin}
        css={css`
          display: flex;
          flex-direction: column;
          gap: 1rem;
        `}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          css={css`
            padding: 0.75rem 1rem;
            border-radius: 0.5rem;
            background: #111;
            color: #fff;
            border: 1px solid #444;
            &:focus {
              outline: none;
              box-shadow: 0 0 0 2px #ff0096;
            }
          `}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          css={css`
            padding: 0.75rem 1rem;
            border-radius: 0.5rem;
            background: #111;
            color: #fff;
            border: 1px solid #444;
            &:focus {
              outline: none;
              box-shadow: 0 0 0 2px #ff0096;
            }
          `}
        />
        <button
          type="submit"
          css={css`
            padding: 0.75rem 1rem;
            border-radius: 0.5rem;
            background: #ff0096;
            color: #fff;
            font-weight: bold;
            transition: background 0.3s ease;
            &:hover {
              background: #ff0044;
            }
          `}
        >
          Login
        </button>
      </form>
    </motion.div>
  );
}
