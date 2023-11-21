import React, { useEffect } from 'react';
import './Keyboard.css';
import { AiOutlineEnter } from 'react-icons/ai';
import { BsBackspace } from 'react-icons/bs';

function Keyboard({ onLetterClick, onEnterPress, wordDay, foundLetters, incorrectLetters, presentLetters }) {
  const [letters, setLetters] = React.useState([
    'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
    'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',
    'z', 'x', 'c', 'v', 'b', 'n', 'm'
  ]);

  const handleKey = (value) => {
    const index = 1;
    onLetterClick(index, value);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        onEnterPress();
        handleKey(event.key);
      } else if (event.key === 'Backspace') {
        handleKey(event.key);
      } else {
        for (let i = 0; i < letters.length; i++) {
          if (event.key === letters[i] || event.key === letters[i].toUpperCase()) {
            handleKey(letters[i]);
          }
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [letters, onEnterPress]);

  const getButtonClass = (letter) => {
    let buttonClass = 'key key_button';
    if (foundLetters.includes(letter)) {
      buttonClass += ' key_found';
    }
    if (incorrectLetters.includes(letter)) {
      buttonClass += ' key_incorrect';
    }
    if (presentLetters.includes(letter)) {
      buttonClass += ' key_present';
    }
    return buttonClass;
  };

  return (
    <div className='keyboard_container'>
      <div className='keyboard_line'>
        {letters.map((letter) => (
          <button
            key={letter}
            onClick={() => handleKey(letter)}
            className={getButtonClass(letter)}
          >
            {letter}
          </button>
        ))}
      </div>
      <div className='keyboard_line_extra'>
        <button onClick={() => handleKey('Backspace')} className='key key_back'><BsBackspace /></button>
        <button onClick={() => handleKey('Enter')} className='key key_enter'><AiOutlineEnter /></button>
      </div>
    </div>
  );
}

export default Keyboard;
