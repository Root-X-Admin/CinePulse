// client/src/pages/HomePage.js
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Hero = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 2.1fr) minmax(0, 1.2fr);
  gap: 32px;
  margin-bottom: 40px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(32px, 4vw, 42px);
  line-height: 1.12;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

const Highlight = styled.span`
  background: linear-gradient(135deg, #ff3366, #ffd166);
  -webkit-background-clip: text;
  color: transparent;
`;

const HeroSub = styled(motion.p)`
  font-size: 15px;
  max-width: 540px;
  color: var(--text-muted);
`;

const GlowingTag = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 14px;
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(255, 51, 102, 0.15), rgba(58, 12, 163, 0.5));
  border: 1px solid rgba(255, 51, 102, 0.5);
  box-shadow: 0 0 20px rgba(255, 51, 102, 0.7);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.17em;
`;

const HeroStatRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 10px;
`;

const HeroStat = styled.div`
  font-size: 12px;
  color: var(--text-muted);

  span {
    color: var(--accent-secondary);
    font-weight: 600;
  }
`;

const HeroPoster = styled(motion.div)`
  border-radius: 22px;
  background: radial-gradient(circle at 10% 0%, #ffd16622, transparent 45%),
    radial-gradient(circle at 100% 0%, #ff336622, transparent 40%),
    linear-gradient(145deg, #050614, #0c0f24);
  border: 1px solid var(--card-border);
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.9), 0 0 45px rgba(255, 51, 102, 0.4);
  position: relative;
  padding: 18px;
  overflow: hidden;
  min-height: 260px;
`;

const HeroPosterInner = styled.div`
  position: absolute;
  inset: 0;
  background-image: url("https://images.pexels.com/photos/7991373/pexels-photo-7991373.jpeg");
  background-size: cover;
  background-position: center;
  opacity: 0.35;
  filter: blur(1px);
  transform: scale(1.05);
`;

const HeroOverlay = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-end;
  height: 100%;
`;

const HeroBadge = styled.div`
  padding: 10px 16px;
  border-radius: 18px;
  background: rgba(3, 4, 11, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.2);
  max-width: 260px;
  font-size: 13px;
`;

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  gap: 18px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 14px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const MovieCard = styled(motion.div)`
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  cursor: pointer;
  background: radial-gradient(circle at top, #29294b, #050510);
  border: 1px solid var(--card-border);
  box-shadow: 0 15px 45px rgba(0, 0, 0, 0.85);
`;

const MoviePoster = styled.div`
  height: 240px;
  background-size: cover;
  background-position: center;
`;

const MovieInfo = styled.div`
  padding: 10px 12px 12px;
`;

const MovieTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

const MovieMeta = styled.div`
  font-size: 11px;
  color: var(--text-muted);
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
`;

const RatingPill = styled.div`
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 209, 102, 0.7);
  color: var(--accent-secondary);
`;

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/movies");
        setMovies(data);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };
    fetchMovies();
  }, []);

  return (
    <>
      <Hero>
        <HeroContent>
          <GlowingTag
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span>NEW</span> Spoiler-safe movie universe
          </GlowingTag>

          <HeroTitle
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Enter the <Highlight>Movieverse</Highlight> —
            reviews, ratings & spoilers on your terms.
          </HeroTitle>

          <HeroSub
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.18 }}
          >
            A cinematic hub where every poster glows, every list feels like a festival lineup,
            and spoilers stay locked behind a curtain until you decide to peek.
          </HeroSub>

          <HeroStatRow>
            <HeroStat>
              <span>Filmy UI</span> · Neon cards, animated hover, cinematic gradients
            </HeroStat>
            <HeroStat>
              <span>Spoiler Zone</span> · Separate safe area for twists & endings
            </HeroStat>
          </HeroStatRow>
        </HeroContent>

        <HeroPoster
          initial={{ opacity: 0, x: 24, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 70, damping: 12 }}
          whileHover={{ scale: 1.01 }}
        >
          <HeroPosterInner />
          <HeroOverlay>
            <HeroBadge>
              “Feels like browsing movies inside a cinema lobby, not a spreadsheet.”
            </HeroBadge>
          </HeroOverlay>
        </HeroPoster>
      </Hero>

      <SectionTitle>Now Showing</SectionTitle>
      <MovieGrid>
        {movies.map((movie) => (
          <MovieCard
            key={movie._id}
            whileHover={{
              y: -6,
              boxShadow: "0 25px 65px rgba(0,0,0,0.95)",
            }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
            onClick={() => navigate(`/movie/${movie._id}`)}
          >
            <MoviePoster
              style={{
                backgroundImage: `url(${movie.posterUrl || "https://via.placeholder.com/300x450"})`,
              }}
            />
            <MovieInfo>
              <MovieTitle>{movie.title}</MovieTitle>
              <MovieMeta>
                <span>{movie.year || "—"}</span>
                <RatingPill>★ {movie.avgRating?.toFixed(1) || "0.0"}</RatingPill>
              </MovieMeta>
            </MovieInfo>
          </MovieCard>
        ))}
      </MovieGrid>
    </>
  );
};

export default HomePage;
