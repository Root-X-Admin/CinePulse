/** @jsxImportSource @emotion/react */
import { css, Global } from '@emotion/react';

const GlobalStyles = () => (
  <Global
    styles={css`
      /* Reset */
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      /* Fonts & body */
      body {
        font-family: 'Poppins', sans-serif;
        background: radial-gradient(circle at top, #0a0a0a, #111 80%);
        color: #fff;
        min-height: 100vh;
        overflow-x: hidden;
        text-align: center;
        position: relative;
      }

      /* Neon floating particles background */
      body::before {
        content: '';
        position: fixed;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background-image: radial-gradient(#ff0044 1px, transparent 1px), radial-gradient(#00fff7 1px, transparent 1px);
        background-size: 50px 50px;
        background-position: 0 0, 25px 25px;
        animation: floatParticles 60s linear infinite;
        z-index: -1;
        opacity: 0.15;
      }

      @keyframes floatParticles {
        0% {
          transform: translate(0, 0);
        }
        50% {
          transform: translate(100px, 50px);
        }
        100% {
          transform: translate(0, 0);
        }
      }

      /* Root container */
      #root {
        max-width: 1400px;
        margin: 0 auto;
        padding: 3rem 2rem;
      }

      /* Logo animation */
      .logo {
        height: 6em;
        padding: 1.5em;
        transition: all 0.5s ease;
      }
      .logo:hover {
        filter: drop-shadow(0 0 2em #ff0044aa) drop-shadow(0 0 1em #00fff7aa);
        transform: scale(1.1) rotate(-5deg);
      }

      /* Headings */
      h1, h2, h3, h4, h5 {
        color: #ff0044;
        text-shadow: 0 0 10px #ff0044aa, 0 0 20px #00fff7aa;
        font-weight: 800;
        letter-spacing: 1px;
      }

      /* Cinematic Cards */
      .card {
        padding: 2rem;
        border-radius: 1.5rem;
        background: linear-gradient(145deg, #111, #222);
        box-shadow: 0 5px 15px rgba(255, 0, 68, 0.3);
        transition: transform 0.5s ease, box-shadow 0.5s ease, filter 0.5s ease;
        overflow: hidden;
        position: relative;
      }

      .card::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: linear-gradient(45deg, #ff0044, #00fff7, #ff00ff, #ff0044);
        background-size: 400% 400%;
        animation: gradientShift 10s ease infinite;
        filter: blur(80px);
        z-index: 0;
      }

      @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      .card:hover {
        transform: translateY(-10px) scale(1.03);
        box-shadow: 0 20px 50px rgba(255, 0, 68, 0.6), 0 0 40px rgba(0, 255, 247, 0.4);
        filter: brightness(1.1);
      }

      /* Card content above animation */
      .card > * {
        position: relative;
        z-index: 1;
      }

      /* Inputs & buttons */
      input, button {
        border-radius: 12px;
        border: none;
        padding: 0.75rem 1rem;
        font-weight: 600;
      }

      input {
        background: #111;
        color: #fff;
        box-shadow: inset 0 0 10px rgba(255, 0, 68, 0.3);
      }

      button {
        background: linear-gradient(90deg, #ff0044, #00fff7);
        color: #111;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      button:hover {
        transform: scale(1.05);
        filter: brightness(1.2);
      }

      /* Links */
      a {
        color: #ff0044;
        text-decoration: none;
        transition: all 0.3s ease;
      }
      a:hover {
        color: #00fff7;
        text-shadow: 0 0 10px #00fff7aa, 0 0 20px #ff0044aa;
      }
    `}
  />
);

export default GlobalStyles;
