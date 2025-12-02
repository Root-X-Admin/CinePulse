// client/src/pages/AdminMovieForm.js
import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  max-width: 920px;
  margin: 0 auto;
`;

const Card = styled(motion.div)`
  margin-top: 24px;
  padding: 22px 22px 20px;
  border-radius: 20px;
  border: 1px solid var(--card-border);
  background: radial-gradient(circle at top, #181832, #050513);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.9);
`;

const Title = styled.h2`
  font-size: 18px;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  font-size: 13px;
  color: var(--text-muted);
  margin-bottom: 16px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px 18px;
`;

const FullRow = styled.div`
  grid-column: 1 / -1;
`;

const Label = styled.label`
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  display: block;
  margin-bottom: 6px;
  color: var(--text-muted);
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(3, 4, 11, 0.95);
  color: var(--text-main);
  font-size: 13px;
  outline: none;

  &:focus {
    border-color: #ff3366;
    box-shadow: 0 0 12px rgba(255, 51, 102, 0.5);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(3, 4, 11, 0.95);
  color: var(--text-main);
  font-size: 13px;
  outline: none;
  resize: vertical;

  &:focus {
    border-color: #ff3366;
    box-shadow: 0 0 12px rgba(255, 51, 102, 0.5);
  }
`;

const ButtonRow = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Button = styled(motion.button)`
  border-radius: 999px;
  border: none;
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 11px;
  background: ${(props) =>
    props.secondary
      ? "transparent"
      : "linear-gradient(135deg, #ff3366, #ffd166)"};
  color: var(--text-main);
  border: ${(props) =>
    props.secondary ? "1px solid rgba(255,255,255,0.3)" : "none"};
  cursor: pointer;
`;

const BadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 10px;
  font-size: 11px;
  color: var(--text-muted);

  span.highlight {
    color: #ff6b81;
  }
`;

// TMDb search UI
const TmdbCard = styled(motion.div)`
  margin-bottom: 16px;
  padding: 12px 12px 10px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: radial-gradient(circle at top, #222348, #050515);
`;

const TmdbRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 2.4fr) minmax(0, 1fr);
  gap: 10px;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const TmdbResults = styled.div`
  margin-top: 10px;
  max-height: 190px;
  overflow-y: auto;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: radial-gradient(circle at top left, #15162b, #050510);
`;

const TmdbResultItem = styled(motion.button)`
  width: 100%;
  text-align: left;
  border: none;
  padding: 8px 9px;
  background: transparent;
  cursor: pointer;
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr);
  gap: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);

  &:last-child {
    border-bottom: none;
  }
`;

const TmdbThumb = styled.div`
  width: 44px;
  height: 60px;
  border-radius: 6px;
  background-size: cover;
  background-position: center;
  background-color: #11111f;
`;

const TmdbMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const TmdbTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
`;

const TmdbYear = styled.span`
  font-size: 11px;
  color: var(--text-muted);
`;

const TmdbOverview = styled.span`
  font-size: 11px;
  color: var(--text-muted);
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const TmdbButton = styled(motion.button)`
  margin-top: 18px;
  border-radius: 999px;
  border: none;
  padding: 8px 14px;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 10px;
  background: linear-gradient(135deg, #3a0ca3, #7209b7);
  color: var(--text-main);
  cursor: pointer;
`;

const Pill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 999px;
  background: rgba(3, 4, 11, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const ErrorText = styled.div`
  font-size: 12px;
  color: #ff6b81;
  margin-top: 8px;
`;

const SuccessText = styled.div`
  font-size: 12px;
  color: #8be99b;
  margin-top: 8px;
`;

const Tiny = styled.span`
  font-size: 10px;
  color: var(--text-muted);
`;

const AdminMovieForm = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [status, setStatus] = useState({ error: "", success: "" });

  const [form, setForm] = useState({
    title: "",
    year: "",
    genre: "",
    runtime: "",
    posterUrl: "",
    backdropUrl: "",
    trailerUrl: "",
    tagline: "",
    overview: "",
    spoilerSummary: "",
  });

  // TMDb search state
  const [tmdbQuery, setTmdbQuery] = useState("");
  const [tmdbYear, setTmdbYear] = useState("");
  const [tmdbResults, setTmdbResults] = useState([]);
  const [tmdbLoading, setTmdbLoading] = useState(false);
  const [tmdbError, setTmdbError] = useState("");

  if (!user || !isAdmin) {
    return <div>You need admin access to view this page.</div>;
  }

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleTmdbSearch = async () => {
    setTmdbError("");
    setTmdbResults([]);

    if (!tmdbQuery.trim()) {
      setTmdbError("Enter a movie title to search.");
      return;
    }

    try {
      setTmdbLoading(true);
      const { data } = await axios.get("http://localhost:5000/api/tmdb/search", {
        params: {
          query: tmdbQuery,
          year: tmdbYear || undefined,
        },
      });
      setTmdbResults(data);
    } catch (err) {
      console.error(err);
      setTmdbError("TMDb search failed. Check backend / API key.");
    } finally {
      setTmdbLoading(false);
    }
  };

  const handleTmdbSelect = async (tmdbId) => {
    try {
      setTmdbLoading(true);
      setTmdbError("");
      const { data } = await axios.get(
        `http://localhost:5000/api/tmdb/movie/${tmdbId}`
      );

      setForm((prev) => ({
        ...prev,
        title: data.title || prev.title,
        year: data.year || prev.year,
        overview: data.overview || prev.overview,
        tagline: data.tagline || prev.tagline,
        runtime: data.runtime || prev.runtime,
        posterUrl: data.posterUrl || prev.posterUrl,
        backdropUrl: data.backdropUrl || prev.backdropUrl,
        trailerUrl: data.trailerUrl || prev.trailerUrl,
        genre: data.genres && data.genres.length ? data.genres.join(", ") : prev.genre,
      }));

      setStatus({
        error: "",
        success: `Imported details from TMDb: ${data.title}`,
      });
    } catch (err) {
      console.error(err);
      setTmdbError("Failed to fetch TMDb movie details.");
    } finally {
      setTmdbLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ error: "", success: "" });

    const payload = {
      ...form,
      year: form.year ? Number(form.year) : undefined,
      runtime: form.runtime ? Number(form.runtime) : undefined,
      genre: form.genre
        ? form.genre
            .split(",")
            .map((g) => g.trim())
            .filter(Boolean)
        : [],
    };

    try {
      const { data } = await axios.post("http://localhost:5000/api/movies", payload, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setStatus({ error: "", success: `Movie "${data.title}" created.` });
      setForm({
        title: "",
        year: "",
        genre: "",
        runtime: "",
        posterUrl: "",
        backdropUrl: "",
        trailerUrl: "",
        tagline: "",
        overview: "",
        spoilerSummary: "",
      });
    } catch (err) {
      console.error(err);
      setStatus({
        error: err?.response?.data?.message || "Failed to create movie",
        success: "",
      });
    }
  };

  return (
    <Wrapper>
      <Card
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <Title>New Movie</Title>
        <Subtitle>
          Use TMDb search to auto-fill core details, then tweak fields and add spoiler content.
        </Subtitle>

        <BadgeRow>
          <span>
            Role: <span className="highlight">Admin</span>
          </span>
          <span>· TMDb-powered autofill for posters, overview & runtime.</span>
        </BadgeRow>

        {/* TMDb SEARCH BLOCK */}
        <TmdbCard
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
              alignItems: "baseline",
            }}
          >
            <span
              style={{
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
              }}
            >
              TMDb Search
            </span>
            <Tiny>Search The Movie Database · click a result to import</Tiny>
          </div>

          <TmdbRow>
            <div>
              <Label htmlFor="tmdbQuery">Title</Label>
              <Input
                id="tmdbQuery"
                value={tmdbQuery}
                onChange={(e) => setTmdbQuery(e.target.value)}
                placeholder="e.g. Interstellar"
              />
            </div>
            <div>
              <Label htmlFor="tmdbYear">Year (optional)</Label>
              <Input
                id="tmdbYear"
                value={tmdbYear}
                onChange={(e) => setTmdbYear(e.target.value)}
                placeholder="2014"
              />
            </div>
          </TmdbRow>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 6,
            }}
          >
            <TmdbButton
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleTmdbSearch}
              disabled={tmdbLoading}
            >
              {tmdbLoading ? "Searching..." : "Search TMDb"}
            </TmdbButton>
            <Pill>
              🎬 <span>Best used as a starting point, you can edit everything below.</span>
            </Pill>
          </div>

          {tmdbError && <ErrorText>{tmdbError}</ErrorText>}

          {tmdbResults.length > 0 && (
            <TmdbResults>
              {tmdbResults.map((movie) => (
                <TmdbResultItem
                  key={movie.tmdbId}
                  type="button"
                  onClick={() => handleTmdbSelect(movie.tmdbId)}
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.04)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <TmdbThumb
                    style={{
                      backgroundImage: movie.posterUrl
                        ? `url(${movie.posterUrl})`
                        : "none",
                    }}
                  />
                  <TmdbMeta>
                    <TmdbTitle>{movie.title}</TmdbTitle>
                    <TmdbYear>{movie.year || "Year unknown"}</TmdbYear>
                    <TmdbOverview>{movie.overview}</TmdbOverview>
                  </TmdbMeta>
                </TmdbResultItem>
              ))}
            </TmdbResults>
          )}
        </TmdbCard>

        {/* MAIN FORM */}
        <form onSubmit={handleSubmit}>
          <Grid>
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                name="year"
                type="number"
                value={form.year}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="runtime">Runtime (min)</Label>
              <Input
                id="runtime"
                name="runtime"
                type="number"
                value={form.runtime}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="genre">Genres (comma separated)</Label>
              <Input
                id="genre"
                name="genre"
                placeholder="Sci-Fi, Thriller"
                value={form.genre}
                onChange={handleChange}
              />
            </div>

            <FullRow>
              <Label htmlFor="tagline">Tagline</Label>
              <Input
                id="tagline"
                name="tagline"
                placeholder="In space, no one can hear you scream."
                value={form.tagline}
                onChange={handleChange}
              />
            </FullRow>

            <FullRow>
              <Label htmlFor="posterUrl">Poster URL</Label>
              <Input
                id="posterUrl"
                name="posterUrl"
                placeholder="https://..."
                value={form.posterUrl}
                onChange={handleChange}
              />
            </FullRow>

            <FullRow>
              <Label htmlFor="backdropUrl">Backdrop URL (optional)</Label>
              <Input
                id="backdropUrl"
                name="backdropUrl"
                placeholder="https://..."
                value={form.backdropUrl}
                onChange={handleChange}
              />
            </FullRow>

            <FullRow>
              <Label htmlFor="trailerUrl">Trailer URL (YouTube, etc.)</Label>
              <Input
                id="trailerUrl"
                name="trailerUrl"
                placeholder="https://youtube.com/..."
                value={form.trailerUrl}
                onChange={handleChange}
              />
            </FullRow>

            <FullRow>
              <Label htmlFor="overview">Overview (non-spoiler)</Label>
              <TextArea
                id="overview"
                name="overview"
                value={form.overview}
                onChange={handleChange}
              />
            </FullRow>

            <FullRow>
              <Label htmlFor="spoilerSummary">
                Spoiler Summary (only visible in spoiler zone)
              </Label>
              <TextArea
                id="spoilerSummary"
                name="spoilerSummary"
                placeholder="Twists, endings, hidden reveals..."
                value={form.spoilerSummary}
                onChange={handleChange}
              />
            </FullRow>
          </Grid>

          <ButtonRow>
            <Button
              type="button"
              secondary
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/")}
            >
              Back
            </Button>
            <Button
              type="submit"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Save Movie
            </Button>
          </ButtonRow>
        </form>

        {status.error && <ErrorText>{status.error}</ErrorText>}
        {status.success && <SuccessText>{status.success}</SuccessText>}
      </Card>
    </Wrapper>
  );
};

export default AdminMovieForm;
