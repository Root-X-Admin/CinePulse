/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';

export default function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/movies/${id}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.msg || 'Failed to fetch movie');
        }

        setMovie(data.movie);
        setReviews(data.reviews || []);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return (
    <div css={css`color: #fff; text-align: center; margin-top: 5rem; font-size: 1.5rem;`}>
      Loading...
    </div>
  );

  if (error) return (
    <div css={css`color: #ff0044; text-align: center; margin-top: 5rem; font-size: 1.5rem;`}>
      Error: {error}
    </div>
  );

  if (!movie) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      css={css`
        max-width: 1000px;
        margin: 2rem auto;
        padding: 2rem;
        background: radial-gradient(circle at top right, #1a1a1a, #000);
        border-radius: 1rem;
        box-shadow: 0 15px 40px rgba(255, 0, 150, 0.15);
        border: 1px solid #333;
        color: #fff;
      `}
    >
      <div css={css`
        display: grid;
        grid-template-columns: 300px 1fr;
        gap: 2rem;
        @media (max-width: 768px) {
          grid-template-columns: 1fr;
        }
      `}>
        {/* Left Column: Poster */}
        <div>
          <img 
            src={movie.posterUrl || 'https://via.placeholder.com/300x450?text=No+Poster'} 
            alt={movie.title}
            css={css`
              width: 100%;
              border-radius: 0.5rem;
              box-shadow: 0 0 20px rgba(0,0,0,0.5);
              object-fit: cover;
            `} 
          />
        </div>

        {/* Right Column: Details */}
        <div>
          <h1 css={css`
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
            color: #ff0096;
            text-shadow: 0 0 10px rgba(255, 0, 150, 0.5);
          `}>
            {movie.title} <span css={css`font-size: 1.5rem; color: #888;`}>({movie.releaseYear})</span>
          </h1>

          <div css={css`
            display: flex;
            gap: 1rem;
            margin-bottom: 1.5rem;
            font-size: 0.9rem;
            color: #ccc;
            flex-wrap: wrap;
          `}>
            <span css={css`padding: 0.2rem 0.6rem; background: #222; border-radius: 4px; border: 1px solid #444;`}>
              {movie.genre}
            </span>
            <span css={css`color: #f5c518; font-weight: bold;`}>
              ⭐ IMDb: {movie.imdbRating}
            </span>
            <span css={css`color: #00ffcc; font-weight: bold;`}>
              🎬 Nio: {movie.nioRating}
            </span>
          </div>

          <h3 css={css`color: #fff; margin-bottom: 0.5rem;`}>Synopsis</h3>
          <p css={css`color: #bbb; line-height: 1.6; margin-bottom: 1.5rem;`}>
            {movie.description}
          </p>

          <h3 css={css`color: #fff; margin-bottom: 0.5rem;`}>Cast</h3>
          <p css={css`color: #bbb; margin-bottom: 1.5rem;`}>
            {movie.cast}
          </p>

          {/* Trailer Section */}
          {movie.trailerUrl && (
            <div css={css`margin-top: 2rem;`}>
              <h3 css={css`margin-bottom: 1rem;`}>Trailer</h3>
              <div css={css`
                position: relative;
                padding-bottom: 56.25%; /* 16:9 */
                height: 0;
                overflow: hidden;
                border-radius: 0.5rem;
                border: 1px solid #333;
              `}>
                <iframe
                  src={movie.trailerUrl.replace('watch?v=', 'embed/')}
                  title="Trailer"
                  css={css`
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    border: none;
                  `}
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}