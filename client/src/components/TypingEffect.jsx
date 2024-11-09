import React, { useEffect, useState } from 'react';
import '../style/TypingEffect.css';

function TypingEffect({ phrases, typingSpeed = 100, deleteSpeed = 50, pause = 1000 }) {
    const [displayedText, setDisplayedText] = useState('');
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [letterIndex, setLetterIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
  
    useEffect(() => {
      const currentPhrase = phrases[phraseIndex];
  
      const type = () => {
        if (isDeleting) {
          // Delete letters
          if (letterIndex > 0) {
            setDisplayedText(currentPhrase.substring(0, letterIndex - 1));
            setLetterIndex(letterIndex - 1);
          } else {
            // Move to the next phrase after complete deletion
            setIsDeleting(false);
            setPhraseIndex((phraseIndex + 1) % phrases.length);
          }
        } else {
          // Add letters
          if (letterIndex < currentPhrase.length) {
            setDisplayedText(currentPhrase.substring(0, letterIndex + 1));
            setLetterIndex(letterIndex + 1);
          } else {
            // Mark end of typing and wait before starting deletion
            setTimeout(() => setIsDeleting(true), pause);
          }
        }
      };
  
      // Determine typing speed based on the state (adding/deleting)
      const speed = isDeleting ? deleteSpeed : typingSpeed;
      const timer = setTimeout(type, speed);
  
      return () => clearTimeout(timer);
    }, [displayedText, letterIndex, isDeleting, phraseIndex, phrases, typingSpeed, deleteSpeed, pause]);
  
    return <span className="typing-text">{displayedText}</span>;
  }
  
  export default TypingEffect;
