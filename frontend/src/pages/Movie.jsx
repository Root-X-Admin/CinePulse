/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';

export default function Movie() {
  const { id } = useParams();

  // Placeholder movie data
  const movie = {
    title: "Inception",
    year: 2010,
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt"],
    trailerUrl: "https://www.youtube.com/embed/YoHD9XEInc0",
    synopsis: "A thief who steals corporate secrets through dream-sharing technology is given a chance to erase his criminal past."
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      css={css`
        max-width: 900px;
        margin: 2rem auto;
        padding: 2rem;
        background: linear-gradient(to bottom, #111, #000);
        border-radius: 1rem;
        box-shadow: 0 15px 40px rgba(255,0,150,0.2);
      `}
    >
      <h1
        css={css`
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
          color: #fff;
        `}
      >
        {movie.title} ({movie.year})
      </h1>
      <p
        css={css`
          color: #ccc;
          margin-bottom: 1rem;
        `}
      >
        {movie.synopsis}
      </p>

      <h2
        css={css`
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #fff;
        `}
      >
        Cast
      </h2>
      <ul
        css={css`
          list-style: disc;
          list-style-position: inside;
          margin-bottom: 1.5rem;
          color: #ddd;
        `}
      >
        {movie.cast.map((actor, idx) => (
          <li key={idx}>{actor}</li>
        ))}
      </ul>

      <h2
        css={css`
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #fff;
        `}
      >
        Trailer
      </h2>
      <div
        css={css`
          aspect-ratio: 16/9;
          width: 100%;
          border-radius: 1rem;
          overflow: hidden;
        `}
      >
        <iframe
          src={movie.trailerUrl}
          title="Trailer"
          css={css`
            width: 100%;
            height: 100%;
          `}
          allowFullScreen
        />
      </div>
    </motion.div>
  );
}
