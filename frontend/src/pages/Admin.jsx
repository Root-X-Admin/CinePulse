/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Admin() {
  const [movie, setMovie] = useState({
    title: '',
    genre: '',
    releaseYear: '',
    imdbRating: '',
    nioRating: '',
    description: '',
    posterUrl: '',
    trailerUrl: '',
    cast: ''
  });
  
  const [moviesList, setMoviesList] = useState([]); // Store fetched movies
  const [selectedMovie, setSelectedMovie] = useState(null); // For the popup
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch movies on mount
  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/movies');
      const data = await res.json();
      if (res.ok) {
        setMoviesList(data);
      }
    } catch (err) {
      console.error('Failed to fetch movies', err);
    }
  };

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

      const payload = {
        ...movie,
        releaseYear: parseInt(movie.releaseYear) || 0,
        imdbRating: parseFloat(movie.imdbRating) || 0,
        nioRating: parseFloat(movie.nioRating) || 0,
        cast: movie.cast 
      };

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
      // Reset form
      setMovie({
        title: '', genre: '', releaseYear: '', imdbRating: '',
        nioRating: '', description: '', posterUrl: '', trailerUrl: '', cast: ''
      });
      
      // Refresh the list immediately
      fetchMovies();
      setLoading(false);
    } catch (err) {
      console.error(err);
      setMessage('❌ Something went wrong.');
      setLoading(false);
    }
  };

  // Styles
  const inputStyles = css`
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    background: #111;
    color: #fff;
    border: 1px solid #ff0096;
    transition: 0.3s all;
    width: 100%;
    box-sizing: border-box;
    &:focus {
      outline: none;
      box-shadow: 0 0 10px #ff0096, 0 0 20px #ff0044;
    }
  `;

  return (
    <div css={css`padding-bottom: 5rem;`}>
      {/* --- ADD MOVIE FORM --- */}
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
        <h1 css={css`font-size: 2.5rem; margin-bottom: 2rem; text-align: center; color: #ff0096; text-shadow: 0 0 10px #ff0096;`}>
          Admin Dashboard
        </h1>

        <form onSubmit={handleSubmit} css={css`display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; @media(max-width:600px){grid-template-columns: 1fr;}`}>
          <div css={css`grid-column: 1 / -1;`}>
            <input name="title" value={movie.title} onChange={handleChange} placeholder="Movie Title" required css={inputStyles} />
          </div>
          <input name="genre" value={movie.genre} onChange={handleChange} placeholder="Genre" required css={inputStyles} />
          <input name="releaseYear" type="number" value={movie.releaseYear} onChange={handleChange} placeholder="Release Year" required css={inputStyles} />
          <input name="imdbRating" type="number" step="0.1" value={movie.imdbRating} onChange={handleChange} placeholder="IMDb Rating" css={inputStyles} />
          <input name="nioRating" type="number" step="0.1" value={movie.nioRating} onChange={handleChange} placeholder="Nio Rating" css={inputStyles} />
          <div css={css`grid-column: 1 / -1;`}><input name="posterUrl" value={movie.posterUrl} onChange={handleChange} placeholder="Poster URL" css={inputStyles} /></div>
          <div css={css`grid-column: 1 / -1;`}><input name="trailerUrl" value={movie.trailerUrl} onChange={handleChange} placeholder="Trailer URL" css={inputStyles} /></div>
          <div css={css`grid-column: 1 / -1;`}><input name="cast" value={movie.cast} onChange={handleChange} placeholder="Cast" css={inputStyles} /></div>
          <div css={css`grid-column: 1 / -1;`}>
            <textarea name="description" value={movie.description} onChange={handleChange} placeholder="Description" css={css`${inputStyles}; resize: vertical; min-height: 100px; font-family: inherit;`} />
          </div>
          <button type="submit" disabled={loading} css={css`grid-column: 1 / -1; padding: 0.85rem; border-radius: 0.5rem; background: #ff0096; color: #fff; font-weight: bold; cursor: pointer; border: none; &:hover{background: #ff0044;}`}>
            {loading ? 'Adding...' : 'Add Movie'}
          </button>
        </form>
        {message && <p css={css`text-align: center; margin-top: 1rem; color: #00ffcc;`}>{message}</p>}
      </motion.div>

      {/* --- MOVIE LIST SECTION --- */}
      <div css={css`max-width: 1000px; margin: 0 auto; padding: 0 1rem;`}>
        <h2 css={css`color: #fff; font-size: 2rem; margin-bottom: 1.5rem; border-bottom: 1px solid #333; padding-bottom: 0.5rem;`}>
          Manage Movies ({moviesList.length})
        </h2>
        
        <div css={css`
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 1.5rem;
        `}>
          {moviesList.map((m) => (
            <motion.div
              key={m._id}
              layoutId={m._id}
              onClick={() => setSelectedMovie(m)}
              whileHover={{ scale: 1.05 }}
              css={css`
                background: #111;
                border-radius: 0.5rem;
                overflow: hidden;
                cursor: pointer;
                box-shadow: 0 4px 15px rgba(0,0,0,0.5);
                border: 1px solid #333;
                &:hover { border-color: #ff0096; }
              `}
            >
              <div css={css`height: 270px; overflow: hidden;`}>
                <img 
                  src={m.posterUrl || 'https://via.placeholder.com/200x300?text=No+Poster'} 
                  alt={m.title}
                  css={css`width: 100%; height: 100%; object-fit: cover;`}
                />
              </div>
              <div css={css`padding: 0.75rem; text-align: center;`}>
                <h3 css={css`font-size: 1rem; color: #fff; margin: 0; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;`}>
                  {m.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- POPUP MODAL --- */}
      <AnimatePresence>
        {selectedMovie && (
          <div css={css`position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 1000; display: flex; justify-content: center; align-items: center; padding: 1rem; box-sizing: border-box;`}>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMovie(null)}
              css={css`position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); backdrop-filter: blur(5px);`}
            />
            
            {/* Modal Content */}
            <motion.div
              layoutId={selectedMovie._id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              css={css`
                position: relative;
                background: #1a1a1a;
                width: 100%;
                max-width: 600px;
                max-height: 90vh;
                overflow-y: auto;
                border-radius: 1rem;
                border: 1px solid #ff0096;
                box-shadow: 0 0 30px rgba(255, 0, 150, 0.3);
                color: #fff;
              `}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedMovie(null)}
                css={css`
                  position: absolute; top: 1rem; right: 1rem;
                  background: rgba(0,0,0,0.5); color: #fff; border: none;
                  width: 30px; height: 30px; border-radius: 50%;
                  cursor: pointer; font-weight: bold;
                  &:hover { background: #ff0044; }
                `}
              >
                ✕
              </button>

              {/* Modal Image */}
              <div css={css`height: 250px; overflow: hidden;`}>
                <img 
                  src={selectedMovie.posterUrl || 'https://via.placeholder.com/600x300?text=No+Poster'} 
                  alt={selectedMovie.title}
                  css={css`width: 100%; height: 100%; object-fit: cover; opacity: 0.7;`}
                />
              </div>

              {/* Modal Details */}
              <div css={css`padding: 2rem;`}>
                <h2 css={css`font-size: 2rem; margin: 0 0 0.5rem 0; color: #ff0096;`}>{selectedMovie.title}</h2>
                <div css={css`display: flex; gap: 1rem; font-size: 0.9rem; color: #ccc; margin-bottom: 1.5rem;`}>
                  <span>{selectedMovie.releaseYear}</span>
                  <span>|</span>
                  <span>{selectedMovie.genre}</span>
                  <span>|</span>
                  <span css={css`color: #f5c518;`}>★ {selectedMovie.imdbRating}</span>
                </div>

                <p css={css`line-height: 1.6; color: #ddd; margin-bottom: 1.5rem;`}>
                  {selectedMovie.description}
                </p>

                <div css={css`margin-bottom: 1rem;`}>
                  <strong css={css`color: #ff0096;`}>Cast:</strong> <span css={css`color: #bbb;`}>{selectedMovie.cast}</span>
                </div>
                
                <div css={css`margin-bottom: 1rem;`}>
                   <strong css={css`color: #ff0096;`}>Nio Rating:</strong> <span css={css`color: #bbb;`}>{selectedMovie.nioRating}</span>
                </div>

                <div css={css`margin-top: 2rem; display: flex; gap: 1rem;`}>
                  <button onClick={() => setSelectedMovie(null)} css={css`padding: 0.5rem 1rem; background: #333; color: white; border: none; border-radius: 5px; cursor: pointer;`}>Close</button>
                  {/* You could add Edit/Delete buttons here later */}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}