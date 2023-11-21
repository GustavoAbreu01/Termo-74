import React, { useEffect } from 'react';
import './Keyboard.css';
import { AiOutlineEnter } from 'react-icons/ai';
import { BsBackspace } from 'react-icons/bs';

function Keyboard({ onLetterClick, onEnterPress, foundLetters,
  incorrectLetters, presentLetters, foundLettersDuo,
  incorrectLettersDuo, presentLettersDuo, gameMode }) {
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
    if (gameMode === 'Termo') {
      if (foundLetters.includes(letter)) {
        buttonClass += ' key_found';
      } else if (incorrectLetters.includes(letter)) {
        buttonClass += ' key_incorrect';
      } else if (presentLetters.includes(letter)) {
        buttonClass += ' key_present';
      }
    } else if (gameMode === 'Dueto') {
      if (foundLetters.includes(letter) && foundLettersDuo.includes(letter)) {
        buttonClass += ' key_found';
      } else if (incorrectLetters.includes(letter) && incorrectLettersDuo.includes(letter)) {
        buttonClass += ' key_incorrect';
      } else if (presentLetters.includes(letter) && presentLettersDuo.includes(letter)) {
        buttonClass += ' key_present';
      } else if (foundLetters.includes(letter) && presentLettersDuo.includes(letter)) {
        buttonClass += ' r_present_l_found';
      } else if (foundLettersDuo.includes(letter) && presentLetters.includes(letter)) {
        buttonClass += ' l_present_r_found';
      } else if (foundLetters.includes(letter) && incorrectLettersDuo.includes(letter)) {
        buttonClass += ' l_incorrect_r_found';
      } else if (foundLettersDuo.includes(letter) && incorrectLetters.includes(letter)) {
        buttonClass += ' r_incorrect_l_found';
      } else if (incorrectLetters.includes(letter) && presentLettersDuo.includes(letter)) {
        buttonClass += ' r_incorrect_l_present';
      } else if (incorrectLettersDuo.includes(letter) && presentLetters.includes(letter)) {
        buttonClass += ' l_incorrect_r_present';
      }
    } else if (gameMode === 'Quarteto') {

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
