// client/src/App.js

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import styled from "styled-components";
import { motion } from "framer-motion";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminMovieForm from "./pages/AdminMovieForm";
import { useAuth } from "./context/AuthContext";

const AppShell = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const NavBar = styled.nav`
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 40px;
  backdrop-filter: blur(18px);
  background: linear-gradient(
    to right,
    rgba(3, 4, 11, 0.95),
    rgba(8, 10, 23, 0.85),
    rgba(3, 4, 11, 0.95)
  );
  border-bottom: 1px solid var(--card-border);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.7);
`;

const Brand = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  font-size: 14px;
`;

const BrandLogo = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 999px;
  background: radial-gradient(
    circle at 30% 30%,
    #ffd166,
    #ff3366 50%,
    #3a0ca3 100%
  );
  box-shadow: var(--glow);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;

const NavButton = styled(motion.button)`
  border-radius: 999px;
  padding: 8px 18px;
  border: none;
  cursor: pointer;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  background: ${(props) =>
    props.variant === "outline"
      ? "transparent"
      : "linear-gradient(135deg, #ff3366, #ff6b6b)"};
  border: ${(props) =>
    props.variant === "outline" ? "1px solid rgba(255,255,255,0.2)" : "none"};
  color: var(--text-main);
  box-shadow: ${(props) =>
    props.variant === "outline"
      ? "none"
      : "0 0 15px rgba(255, 51, 102, 0.5)"};
`;

const Main = styled.main`
  flex: 1;
  padding: 30px 40px 60px;
`;

const NavBarInner = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  return (
    <NavBar>
      <Brand
        initial={{ opacity: 0, x: -15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        <BrandLogo>🎬</BrandLogo>
        <span>MOVIEVERSE</span>
      </Brand>
      <NavActions>
        {isAdmin && (
          <NavButton
            variant="outline"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/admin/movies/new")}
          >
            Admin
          </NavButton>
        )}

        {user ? (
          <>
            <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
              {user.username} {isAdmin && "· Admin"}
            </span>
            <NavButton
              variant="outline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={logout}
            >
              Logout
            </NavButton>
          </>
        ) : (
          <>
            <NavButton
              variant="outline"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.25)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/login")}
            >
              Log in
            </NavButton>
            <NavButton
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate("/register")}
            >
              Join Free
            </NavButton>
          </>
        )}
      </NavActions>
    </NavBar>
  );
};

const AppLayout = () => (
  <>
    <NavBarInner />
    <Main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin/movies/new" element={<AdminMovieForm />} />
      </Routes>
    </Main>
  </>
);

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <AppShell>
        <AppLayout />
      </AppShell>
    </Router>
  );
};

export default App;
