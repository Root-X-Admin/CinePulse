// client/src/styles/GlobalStyles.js
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    --bg-main: #03040b;
    --bg-elevated: #080a17;
    --accent-primary: #ff3366;
    --accent-secondary: #ffd166;
    --text-main: #f5f5f5;
    --text-muted: #9a9cb2;
    --card-border: rgba(255, 255, 255, 0.08);
    --glow: 0 0 25px rgba(255, 51, 102, 0.5);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Poppins", "Segoe UI", sans-serif;
    background: radial-gradient(circle at top, #14142b 0%, #03040b 45%, #000000 100%);
    color: var(--text-main);
    min-height: 100vh;
    overflow-x: hidden;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: #050514;
  }
  ::-webkit-scrollbar-thumb {
    background: #26263f;
    border-radius: 10px;
  }
`;

export default GlobalStyles;
