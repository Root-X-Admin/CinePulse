/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import { motion } from 'framer-motion';

export default function Admin() {
  const [movie, setMovie] = useState({
    title: '',
    year: '',
    cast: '',
    trailerUrl: '',
    synopsis: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const token = localStorage.getItem('fm_token');
      if (!token) {
        setMessage('You must be logged in as admin.');
        setLoading(false);
        return;
      }

      // Convert cast string to array
      const payload = { ...movie, cast: movie.cast.split(',').map(c => c.trim()) };

      const res = await fetch('http://localhost:5000/api/admin/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.msg || 'Error adding movie');
        setLoading(false);
        return;
      }

      setMessage('🎬 Movie added successfully!');
      setMovie({ title: '', year: '', cast: '', trailerUrl: '', synopsis: '' });
      setLoading(false);
    } catch (err) {
      console.error(err);
      setMessage('❌ Something went wrong.');
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      css={css`
        max-width: 800px;
        margin: 3rem auto;
        padding: 2rem;
        background: radial-gradient(circle at top left, #1f0a2f, #000);
        border-radius: 1rem;
        box-shadow: 0 20px 50px rgba(255, 0, 150, 0.3);
        border: 1px solid #ff0096;
      `}
    >
      <h1
        css={css`
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 2rem;
          text-align: center;
          color: #ff0096;
          text-shadow: 0 0 10px #ff0096, 0 0 20px #ff0044;
        `}
      >
        Add New Movie
      </h1>

      <form
        onSubmit={handleSubmit}
        css={css`
          display: flex;
          flex-direction: column;
          gap: 1rem;
        `}
      >
        {['title', 'year', 'cast', 'trailerUrl'].map(field => (
          <input
            key={field}
            name={field}
            value={movie[field]}
            onChange={handleChange}
            placeholder={field === 'trailerUrl' ? 'Trailer URL' : field.charAt(0).toUpperCase() + field.slice(1)}
            css={css`
              padding: 0.75rem 1rem;
              border-radius: 0.5rem;
              background: #111;
              color: #fff;
              border: 1px solid #ff0096;
              transition: 0.3s all;
              &:focus {
                outline: none;
                box-shadow: 0 0 10px #ff0096, 0 0 20px #ff0044;
              }
            `}
          />
        ))}

        <textarea
          name="synopsis"
          value={movie.synopsis}
          onChange={handleChange}
          placeholder="Synopsis"
          css={css`
            padding: 0.75rem 1rem;
            border-radius: 0.5rem;
            background: #111;
            color: #fff;
            border: 1px solid #ff0096;
            resize: vertical;
            min-height: 120px;
            transition: 0.3s all;
            &:focus {
              outline: none;
              box-shadow: 0 0 10px #ff0096, 0 0 20px #ff0044;
            }
          `}
        />

        <button
          type="submit"
          disabled={loading}
          css={css`
            padding: 0.85rem 1rem;
            border-radius: 0.5rem;
            background: linear-gradient(90deg, #ff0096, #ff0044);
            color: #fff;
            font-weight: bold;
            font-size: 1.1rem;
            transition: 0.3s all;
            cursor: pointer;
            &:hover {
              background: linear-gradient(90deg, #ff0044, #ff0096);
              transform: scale(1.05);
              box-shadow: 0 0 15px #ff0096, 0 0 30px #ff0044;
            }
            &:disabled {
              opacity: 0.6;
              cursor: not-allowed;
            }
          `}
        >
          {loading ? 'Adding...' : 'Add Movie'}
        </button>
      </form>

      {message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          css={css`
            margin-top: 1rem;
            font-weight: bold;
            color: ${message.includes('successfully') ? '#00ffcc' : '#ff0044'};
            text-shadow: 0 0 10px ${message.includes('successfully') ? '#00ffcc' : '#ff0044'};
          `}
        >
          {message}
        </motion.p>
      )}
    </motion.div>
  );
}
