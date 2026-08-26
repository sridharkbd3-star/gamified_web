// ============================================================
// STEM Adventure Platform — TypewriterText Component
// Phase 2
//
// Animates text letter-by-letter with a cinema-style reveal.
// Used inside DialoguePanel for story dialogue.
// ============================================================

import React, { useState, useEffect, useCallback } from 'react';

interface TypewriterTextProps {
  /** Text to animate */
  text: string;
  /** Characters per second */
  speed?: number;
  /** Called when the full text has been revealed */
  onComplete?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  speed = 40,
  onComplete,
  className = '',
  style,
}) => {
  const [displayed, setDisplayed] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  // Reset when text prop changes
  useEffect(() => {
    setDisplayed('');
    setIsComplete(false);
  }, [text]);

  // Typewriter tick
  useEffect(() => {
    if (isComplete) return;
    if (displayed.length >= text.length) {
      setIsComplete(true);
      onComplete?.();
      return;
    }

    const delay = 1000 / speed;
    const timer = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, delay);

    return () => clearTimeout(timer);
  }, [displayed, text, speed, isComplete, onComplete]);

  // Allow clicking to instantly complete
  const skipToEnd = useCallback(() => {
    if (!isComplete) {
      setDisplayed(text);
      setIsComplete(true);
      onComplete?.();
    }
  }, [isComplete, text, onComplete]);

  return (
    <span
      className={className}
      style={style}
      onClick={skipToEnd}
      role="text"
      aria-label={text}
    >
      {displayed}
      {/* Blinking cursor while typing */}
      {!isComplete && (
        <span
          aria-hidden="true"
          style={{
            display: 'inline-block',
            width: '2px',
            height: '1em',
            background: 'var(--color-primary)',
            marginLeft: '2px',
            verticalAlign: 'middle',
            animation: 'cursorBlink 0.8s ease-in-out infinite',
          }}
        />
      )}
    </span>
  );
};
