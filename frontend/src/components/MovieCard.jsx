/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { motion } from 'framer-motion';

export default function MovieCard({ movie }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(255,0,150,0.5)' }}
      css={css`
        background: linear-gradient(to bottom, #1f1f1f, #000);
        border-radius: 1rem;
        overflow: hidden;
        cursor: pointer;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      `}
    >
      <img
        src={movie.posterUrl || 'https://via.placeholder.com/400x600?text=Poster'}
        alt={movie.title}
        css={css`
          width: 100%;
          height: 20rem;
          object-fit: cover;
        `}
      />
      <div
        css={css`
          padding: 1rem;
        `}
      >
        <h2
          css={css`
            font-size: 1.25rem;
            font-weight: bold;
            color: #fff;
            margin-bottom: 0.25rem;
          `}
        >
          {movie.title} ({movie.year})
        </h2>
        <p
          css={css`
            font-size: 0.875rem;
            color: #ccc;
          `}
        >
          {movie.synopsis}
        </p>
      </div>
    </motion.div>
  );
}
