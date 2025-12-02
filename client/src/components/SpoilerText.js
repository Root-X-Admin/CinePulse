// client/src/components/SpoilerText.js
import React, { useState } from "react";
import styled from "styled-components";

const SpoilerSpan = styled.span`
  filter: blur(${(props) => (props.revealed ? 0 : 5)}px);
  background: ${(props) =>
    props.revealed ? "transparent" : "rgba(0, 0, 0, 0.6)"};
  border-radius: 6px;
  padding: ${(props) => (props.revealed ? "0" : "1px 4px")};
  cursor: pointer;
  position: relative;
`;

const SpoilerHint = styled.span`
  position: absolute;
  top: -14px;
  left: 0;
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #ff6b81;
`;

const SpoilerText = ({ text }) => {
  const [revealedIndexes, setRevealedIndexes] = useState({});

  if (!text) return null;

  const parts = [];
  const regex = /\[spoiler\]([\s\S]*?)\[\/spoiler\]/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({
        type: "text",
        content: text.slice(lastIndex, match.index),
      });
    }
    parts.push({
      type: "spoiler",
      content: match[1],
    });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push({
      type: "text",
      content: text.slice(lastIndex),
    });
  }

  const handleToggle = (idx) => {
    setRevealedIndexes((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  return (
    <>
      {parts.map((part, index) => {
        if (part.type === "text") {
          return <span key={index}>{part.content}</span>;
        }
        const revealed = !!revealedIndexes[index];
        return (
          <SpoilerSpan
            key={index}
            revealed={revealed}
            onClick={() => handleToggle(index)}
          >
            {!revealed && <SpoilerHint>spoiler</SpoilerHint>}
            {part.content}
          </SpoilerSpan>
        );
      })}
    </>
  );
};

export default SpoilerText;
