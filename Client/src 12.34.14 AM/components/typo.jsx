import React, { useState, useEffect } from 'react';

const Typewriter = ({ sentences, speed = 150, delay = 2000 }) => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(speed);

  useEffect(() => {
    // Current index of the sentences array
    const i = loopNum % sentences.length;
    const fullText = sentences[i];

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing: Add one character
        setText(fullText.substring(0, text.length + 1));
        setTypingSpeed(speed);
      } else {
        // Deleting: Remove one character
        setText(fullText.substring(0, text.length - 1));
        setTypingSpeed(speed / 2); // Deleting is usually faster
      }

      // If word is complete, pause before deleting
      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), delay);
      } 
      // If word is deleted, move to the next sentence
      else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, sentences, speed, delay]);

  return (
    <span className="font-mono">
      {text}
      <span className="border-r-2 border-orange-500 ml-1 animate-pulse"></span>
    </span>
  );
};

export default Typewriter;