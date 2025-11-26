/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { css } from '@emotion/react';
import { setToken } from '../api';

export default function Navbar() {
  const [q, setQ] = useState('');
  const navigate = useNavigate();

  const onSearch = e => {
    e.preventDefault();
    navigate(`/?q=${encodeURIComponent(q)}`);
  };

  const logout = () => {
    localStorage.removeItem('fm_token');
    setToken(null);
    navigate('/login');
  };

  return (
    <motion.header
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      css={css`
        background: linear-gradient(90deg, #000, #2a2a2a, #000);
        box-shadow: 0 4px 10px rgba(0,0,0,0.5);
        position: sticky;
        top: 0;
        z-index: 50;
      `}
    >
      <div
        css={css`
          max-width: 1200px;
          margin: 0 auto;
          padding: 0.75rem 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <Link
          to="/"
          css={css`
            font-size: 1.5rem;
            font-weight: bold;
            letter-spacing: 1px;
            color: #fff;
            span {
              color: #ff0096;
            }
          `}
        >
          Filmy<span>MERN</span>
        </Link>

        <form
          onSubmit={onSearch}
          css={css`
            display: flex;
          `}
        >
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Search movies..."
            css={css`
              padding: 0.5rem 0.75rem;
              border-radius: 0.5rem 0 0 0.5rem;
              background: rgba(255,255,255,0.05);
              color: #fff;
              border: none;
              outline: none;
              &::placeholder {
                color: #aaa;
              }
            `}
          />
          <button
            css={css`
              padding: 0.5rem 0.75rem;
              background: #ff0096;
              color: #fff;
              border-radius: 0 0.5rem 0.5rem 0;
              font-weight: bold;
            `}
          >
            Search
          </button>
        </form>

        <div
          css={css`
            display: flex;
            gap: 0.5rem;
          `}
        >
          <Link
            to="/login"
            css={css`
              padding: 0.5rem 0.75rem;
              background: rgba(255,255,255,0.05);
              border-radius: 0.5rem;
              color: #fff;
            `}
          >
            Login
          </Link>
          <button
            onClick={logout}
            css={css`
              padding: 0.5rem 0.75rem;
              background: #ff0044;
              border-radius: 0.5rem;
              color: #fff;
              font-weight: bold;
            `}
          >
            Logout
          </button>
        </div>
      </div>
    </motion.header>
  );
}
