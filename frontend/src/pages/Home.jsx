/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import MovieCard from '../components/MovieCard';

const sampleMovies = [
  { _id: 1, title: "Inception", year: 2010, posterUrl: "", synopsis: "Dream heist thriller." },
  { _id: 2, title: "Interstellar", year: 2014, posterUrl: "", synopsis: "Space exploration epic." },
  { _id: 3, title: "The Dark Knight", year: 2008, posterUrl: "", synopsis: "Batman faces Joker." },
];

export default function Home() {
  return (
    <div
      css={css`
        max-width: 1280px;
        margin: 0 auto;
        padding: 2rem;
      `}
    >
      <h1
        css={css`
          font-size: 2.5rem;
          font-weight: bold;
          text-align: center;
          color: #fff;
          margin-bottom: 2rem;
        `}
      >
        Trending Movies
      </h1>
      <motion.div
        css={css`
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        `}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.15
            }
          }
        }}
      >
        {sampleMovies.map(movie => (
          <motion.div
            key={movie._id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
          >
            <MovieCard movie={movie} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
