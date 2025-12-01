/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Movie from './pages/Movie';
import Admin from './pages/Admin';
import Login from './pages/Login';
import AdminRoute from './components/AdminRoute'; // Import the guard

export default function App() {
  return (
    <div
      css={css`
        min-height: 100vh;
        background: linear-gradient(135deg, #1a1a1a, #111);
        color: #fff;
      `}
    >
      <Navbar />
      <main
        css={css`
          padding: 1rem;
          max-width: 1200px;
          margin: 0 auto;
        `}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/login" element={<Login />} />
          
          {/* SECURE THE ADMIN PAGE */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}