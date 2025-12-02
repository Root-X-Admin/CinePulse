// client/src/pages/MoviePage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import SpoilerText from "../components/SpoilerText";

// Layout containers
const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1.6fr);
  gap: 24px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const PosterShell = styled(motion.div)`
  border-radius: 22px;
  overflow: hidden;
  border: 1px solid var(--card-border);
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.9);
  background: radial-gradient(circle at top, #242445, #050513);
`;

const PosterImg = styled.div`
  height: 420px;
  background-size: cover;
  background-position: center;

  @media (max-width: 600px) {
    height: 360px;
  }
`;

const InfoPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-self: center;
`;

const TitleRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 8px;
`;

const Title = styled.h1`
  font-size: 26px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const Year = styled.span`
  font-size: 16px;
  color: var(--text-muted);
`;

const Tagline = styled.p`
  font-size: 14px;
  color: var(--accent-secondary);
`;

const Overview = styled.p`
  font-size: 14px;
  color: var(--text-muted);
  max-width: 640px;
`;

const MetaRow = styled.div`
  font-size: 12px;
  color: var(--text-muted);
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  span.label {
    color: var(--text-main);
  }
`;

const RatingBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 209, 102, 0.7);
  color: var(--accent-secondary);
  font-size: 11px;
  box-shadow: 0 0 16px rgba(255, 209, 102, 0.3);
`;

const Section = styled.div`
  margin-top: 2px;
`;

const SectionTitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 10px;
`;

const SectionTitle = styled.h2`
  font-size: 15px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const SectionSubtitle = styled.p`
  font-size: 11px;
  color: var(--text-muted);
`;

// Spoiler Zone
const SpoilerZone = styled(motion.div)`
  margin-top: 4px;
  padding: 14px 16px;
  border-radius: 18px;
  border: 1px dashed rgba(255, 51, 102, 0.6);
  background: radial-gradient(circle at top left, #ff336622, #05040f);
  font-size: 13px;
`;

const SpoilerToggle = styled.button`
  border-radius: 999px;
  border: none;
  padding: 6px 14px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.13em;
  background: rgba(3, 4, 11, 0.9);
  color: #ff6b81;
  border: 1px solid rgba(255, 51, 102, 0.8);
  cursor: pointer;
`;

// Trailer
const TrailerCard = styled(motion.div)`
  border-radius: 18px;
  border: 1px solid var(--card-border);
  background: radial-gradient(circle at top left, #1b1b33, #050513);
  box-shadow: 0 22px 60px rgba(0, 0, 0, 0.95);
  padding: 12px 12px 14px;
`;

// ✅ Proper 16:9 aspect ratio
const TrailerFrameWrapper = styled.div`
  position: relative;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  background: #000;
  /* 16:9 ratio using padding trick so it scales nicely */
  padding-top: 56.25%;
`;

const TrailerIframe = styled.iframe`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: none;
`;

// Reviews
const ReviewsLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(0, 1.1fr);
  gap: 18px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ReviewCard = styled(motion.div)`
  padding: 10px 12px;
  border-radius: 14px;
  border: 1px solid var(--card-border);
  background: radial-gradient(circle at top, #17172c, #050513);
  font-size: 13px;
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
`;

const ReviewAuthor = styled.span`
  color: var(--accent-secondary);
  font-size: 12px;
`;

const ReviewMeta = styled.span`
  font-size: 11px;
  color: var(--text-muted);
`;

const ReviewBody = styled.div`
  font-size: 13px;
`;

const ReviewTitle = styled.div`
  font-weight: 600;
  margin-bottom: 4px;
`;

const BadgeSpoiler = styled.span`
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: #ff6b81;
  border-radius: 999px;
  border: 1px solid rgba(255, 107, 129, 0.7);
  padding: 2px 6px;
  margin-left: 8px;
`;

const ReviewFormCard = styled(motion.div)`
  padding: 12px 14px;
  border-radius: 16px;
  border: 1px solid var(--card-border);
  background: radial-gradient(circle at top, #1c1835, #050513);
  font-size: 13px;
`;

const Field = styled.div`
  margin-bottom: 8px;
`;

const Label = styled.label`
  display: block;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  margin-bottom: 4px;
  color: var(--text-muted);
`;

const Input = styled.input`
  width: 100%;
  padding: 7px 9px;
  border-radius: 9px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(3, 4, 11, 0.95);
  color: var(--text-main);
  font-size: 13px;
  outline: none;

  &:focus {
    border-color: #ff3366;
    box-shadow: 0 0 10px rgba(255, 51, 102, 0.5);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: 7px 9px;
  border-radius: 9px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(3, 4, 11, 0.95);
  color: var(--text-main);
  font-size: 13px;
  outline: none;
  resize: vertical;

  &:focus {
    border-color: #ff3366;
    box-shadow: 0 0 10px rgba(255, 51, 102, 0.5);
  }
`;

const CheckboxRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;

  input {
    accent-color: #ff3366;
  }
`;

const SubmitButton = styled(motion.button)`
  margin-top: 4px;
  padding: 8px 16px;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg, #ff3366, #ffd166);
  color: var(--text-main);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  cursor: pointer;
`;

const SmallHint = styled.p`
  font-size: 11px;
  color: var(--text-muted);
  margin-top: 4px;
`;

const ErrorText = styled.div`
  font-size: 12px;
  color: #ff6b81;
  margin-top: 4px;
`;

const EmptyState = styled.div`
  font-size: 12px;
  color: var(--text-muted);
  padding: 8px 0;
`;

// Loading shimmer
const LoadingBlock = styled.div`
  border-radius: 16px;
  height: ${(props) => props.height || "80px"};
  background: linear-gradient(90deg, #191927, #26263c, #191927);
  background-size: 300% 100%;
  animation: shimmer 1.4s infinite;

  @keyframes shimmer {
    0% {
      background-position: -150% 0;
    }
    100% {
      background-position: 150% 0;
    }
  }
`;

const MoviePage = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [movie, setMovie] = useState(null);
  const [showSpoilers, setShowSpoilers] = useState(false);
  const [movieLoading, setMovieLoading] = useState(true);

  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  const [reviewForm, setReviewForm] = useState({
    rating: "",
    title: "",
    body: "",
    containsSpoilers: false,
  });
  const [reviewError, setReviewError] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setMovieLoading(true);
        const { data } = await axios.get(`http://localhost:5000/api/movies/${id}`);
        setMovie(data);
      } catch (err) {
        console.error("Error fetching movie:", err);
      } finally {
        setMovieLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        setReviewsLoading(true);
        const { data } = await axios.get(
          `http://localhost:5000/api/reviews/movie/${id}`
        );
        setReviews(data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      } finally {
        setReviewsLoading(false);
      }
    };

    fetchMovie();
    fetchReviews();
  }, [id]);

  const handleReviewChange = (e) => {
    const { name, value, type, checked } = e.target;
    setReviewForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const extractYoutubeId = (url) => {
    if (!url) return null;
    try {
      const u = new URL(url);
      if (u.hostname.includes("youtube.com")) {
        return u.searchParams.get("v");
      }
      if (u.hostname.includes("youtu.be")) {
        return u.pathname.slice(1);
      }
    } catch (e) {
      return null;
    }
    return null;
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setReviewError("");

    if (!user) {
      setReviewError("You need to log in to post a review.");
      return;
    }

    const numericRating = Number(reviewForm.rating);
    if (Number.isNaN(numericRating) || numericRating < 0 || numericRating > 10) {
      setReviewError("Rating must be between 0 and 10.");
      return;
    }

    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/reviews/movie/${id}`,
        {
          rating: numericRating,
          title: reviewForm.title,
          body: reviewForm.body,
          containsSpoilers: reviewForm.containsSpoilers,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setReviews((prev) => [data.review, ...prev]);
      setMovie((prev) => (prev ? { ...prev, avgRating: data.avgRating } : prev));

      setReviewForm({
        rating: "",
        title: "",
        body: "",
        containsSpoilers: false,
      });
    } catch (err) {
      console.error(err);
      setReviewError(
        err?.response?.data?.message || "Failed to post review. Try again."
      );
    }
  };

  if (movieLoading) {
    return (
      <Page>
        <HeroGrid>
          <LoadingBlock height="420px" />
          <div>
            <LoadingBlock height="60px" />
            <div style={{ height: 10 }} />
            <LoadingBlock height="120px" />
          </div>
        </HeroGrid>
      </Page>
    );
  }

  if (!movie) return <div>Movie not found.</div>;

  const youtubeId = extractYoutubeId(movie.trailerUrl);

  return (
    <Page>
      {/* HERO: Poster + basic info */}
      <HeroGrid>
        <PosterShell
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <PosterImg
            style={{
              backgroundImage: `url(${
                movie.posterUrl || "https://via.placeholder.com/500x750"
              })`,
            }}
          />
        </PosterShell>

        <InfoPanel>
          <TitleRow>
            <Title>{movie.title}</Title>
            {movie.year && <Year>({movie.year})</Year>}
          </TitleRow>

          {movie.tagline && <Tagline>“{movie.tagline}”</Tagline>}

          <Overview>{movie.overview}</Overview>

          <MetaRow>
            {movie.runtime && (
              <span>
                <span className="label">Runtime:</span> {movie.runtime} min
              </span>
            )}
            {movie.genre && movie.genre.length > 0 && (
              <span>
                <span className="label">Genre:</span> {movie.genre.join(", ")}
              </span>
            )}
          </MetaRow>

          <RatingBadge>
            ★ {movie.avgRating ? movie.avgRating.toFixed(1) : "0.0"} / 10
          </RatingBadge>
        </InfoPanel>
      </HeroGrid>

      {/* SPOILER ZONE (full width below hero, so it doesn't stretch only right side) */}
      {movie.spoilerSummary && (
        <Section>
          <SectionTitleRow>
            <SectionTitle>Spoiler Zone</SectionTitle>
            <SectionSubtitle>
              Hidden by default · reveal only if you’ve watched the movie.
            </SectionSubtitle>
          </SectionTitleRow>
          <SpoilerZone
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div
              style={{
                marginBottom: 8,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>⚠ Contains major plot details</span>
              <SpoilerToggle onClick={() => setShowSpoilers((prev) => !prev)}>
                {showSpoilers ? "Hide Spoilers" : "Reveal Spoilers"}
              </SpoilerToggle>
            </div>
            {showSpoilers ? (
              <p>{movie.spoilerSummary}</p>
            ) : (
              <p>
                Click “Reveal Spoilers” to see twists, endings, and hidden details.
              </p>
            )}
          </SpoilerZone>
        </Section>
      )}

      {/* TRAILER (proper 16:9) */}
      {youtubeId && (
        <Section>
          <SectionTitleRow>
            <SectionTitle>Trailer</SectionTitle>
            <SectionSubtitle>
              Official trailer embedded in a 16:9 frame.
            </SectionSubtitle>
          </SectionTitleRow>
          <TrailerCard
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <TrailerFrameWrapper>
              <TrailerIframe
                src={`https://www.youtube.com/embed/${youtubeId}`}
                title="Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </TrailerFrameWrapper>
          </TrailerCard>
        </Section>
      )}

      {/* REVIEWS */}
      <Section>
        <SectionTitleRow>
          <SectionTitle>Reviews</SectionTitle>
          <SectionSubtitle>
            See what others think · share your own take with spoiler tags.
          </SectionSubtitle>
        </SectionTitleRow>

        <ReviewsLayout>
          <div>
            {reviewsLoading ? (
              <>
                <LoadingBlock height="70px" />
                <div style={{ height: 10 }} />
                <LoadingBlock height="70px" />
              </>
            ) : reviews.length === 0 ? (
              <EmptyState>
                No reviews yet. Be the first to drop your filmy thoughts.
              </EmptyState>
            ) : (
              <ReviewList>
                {reviews.map((rev) => (
                  <ReviewCard
                    key={rev._id}
                    whileHover={{
                      y: -2,
                      boxShadow: "0 18px 45px rgba(0,0,0,0.9)",
                    }}
                    transition={{ type: "spring", stiffness: 140, damping: 16 }}
                  >
                    <ReviewHeader>
                      <ReviewAuthor>{rev.user?.username || "Anonymous"}</ReviewAuthor>
                      <ReviewMeta>
                        ★ {rev.rating.toFixed(1)} ·{" "}
                        {new Date(rev.createdAt).toLocaleDateString()}
                      </ReviewMeta>
                    </ReviewHeader>
                    <ReviewBody>
                      {rev.title && (
                        <ReviewTitle>
                          {rev.title}
                          {rev.containsSpoilers && (
                            <BadgeSpoiler>SPOILERS</BadgeSpoiler>
                          )}
                        </ReviewTitle>
                      )}
                      <SpoilerText text={rev.body} />
                    </ReviewBody>
                  </ReviewCard>
                ))}
              </ReviewList>
            )}
          </div>

          <ReviewFormCard
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3
              style={{
                fontSize: 13,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                marginBottom: 8,
              }}
            >
              Your Review
            </h3>
            {user ? (
              <form onSubmit={handleSubmitReview}>
                <Field>
                  <Label htmlFor="rating">Rating (0 – 10)</Label>
                  <Input
                    id="rating"
                    name="rating"
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={reviewForm.rating}
                    onChange={handleReviewChange}
                    required
                  />
                </Field>

                <Field>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={reviewForm.title}
                    onChange={handleReviewChange}
                    placeholder="Short headline"
                  />
                </Field>

                <Field>
                  <Label htmlFor="body">Review</Label>
                  <TextArea
                    id="body"
                    name="body"
                    value={reviewForm.body}
                    onChange={handleReviewChange}
                    required
                    placeholder="Share your thoughts. Use [spoiler]text[/spoiler] for specific spoilers."
                  />
                </Field>

                <Field>
                  <CheckboxRow>
                    <input
                      id="containsSpoilers"
                      name="containsSpoilers"
                      type="checkbox"
                      checked={reviewForm.containsSpoilers}
                      onChange={handleReviewChange}
                    />
                    <label htmlFor="containsSpoilers">
                      This review contains spoilers
                    </label>
                  </CheckboxRow>
                  <SmallHint>
                    Spoiler chunks inside the text can be wrapped as{" "}
                    <code>[spoiler]Darth Vader is Luke’s father[/spoiler]</code>.
                  </SmallHint>
                </Field>

                <SubmitButton
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Post Review
                </SubmitButton>

                {reviewError && <ErrorText>{reviewError}</ErrorText>}
              </form>
            ) : (
              <SmallHint>Log in to rate and review this movie.</SmallHint>
            )}
          </ReviewFormCard>
        </ReviewsLayout>
      </Section>
    </Page>
  );
};

export default MoviePage;
