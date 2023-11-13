import React, { useEffect, useState } from 'react';
import words from '../../data/words.json';

import Keyboard from '../../components/keyboard/Keyboard';

import './Termo.css';

function Termo() {
  const [wordDay, setWordDay] = useState(words.palavras[Math.floor(Math.random() * words.palavras.length)]);
  const [currentChance, setCurrentChance] = useState(0);

  const handleLetterSelection = (index, letter) => {
    console.log(wordDay);
    console.log(letter);
    if (letter === 'Backspace') {
      removeLetter();
    } else if (letter === 'Enter') {
      checkWord();
    } else {
      for (let i = 0; i < 5; i++) {
        const element = document.getElementsByClassName('letter_box')[i + currentChance * 5];
        if (element.innerHTML === '') {
          element.innerHTML = letter;
          break;
        }
      }
    }
  };

  const checkWord = () => {
    var word = '';
    for (let i = 0; i < 5; i++) {
      const element = document.getElementsByClassName('letter_box')[i + currentChance * 5];
      word += element.innerHTML;
    }
    if (word.length < 5) {
      
    } else {
      if (word === wordDay) {
        alert('Parabéns, você acertou!');
        resetGame();
      } else if (currentChance === 4) {
        alert('Você perdeu!');
        resetGame();
      } else if (word !== wordDay) {
        changeRows();
      }
    }
  };

  const changeRows = () => {
    for (let i = 0; i < 5; i++) {
      const element = document.getElementsByClassName('letter_box')[i + currentChance * 5];
      element
    }
    setCurrentChance((prevChance) => prevChance + 1);
  };

  const resetGame = () => {
    setCurrentChance(0);
    setWordDay(words.palavras[Math.floor(Math.random() * words.palavras.length)]);
    for (let i = 0; i < 25; i++) {
      const element = document.getElementsByClassName('letter_box')[i];
      element.innerHTML = '';
    }
  };

  const removeLetter = () => {
    for (let i = 4; i >= 0; i--) {
      const element = document.getElementsByClassName('letter_box')[i + currentChance * 5];
      if (element.innerHTML !== '') {
        element.innerHTML = '';
        break;
      }
    }
  };

  return (
    <div className='container_game'>
      <div className='container_termo'>
        <div className='container_row'>
          <div className='letter_box'></div>
          <div className='letter_box'></div>
          <div className='letter_box'></div>
          <div className='letter_box'></div>
          <div className='letter_box'></div>
        </div>
        <div className='container_row'>
          <div className='letter_box'></div>
          <div className='letter_box'></div>
          <div className='letter_box'></div>
          <div className='letter_box'></div>
          <div className='letter_box'></div>
        </div>
        <div className='container_row'>
          <div className='letter_box'></div>
          <div className='letter_box'></div>
          <div className='letter_box'></div>
          <div className='letter_box'></div>
          <div className='letter_box'></div>
        </div>
        <div className='container_row'>
          <div className='letter_box'></div>
          <div className='letter_box'></div>
          <div className='letter_box'></div>
          <div className='letter_box'></div>
          <div className='letter_box'></div>
        </div>
        <div className='container_row'>
          <div className='letter_box'></div>
          <div className='letter_box'></div>
          <div className='letter_box'></div>
          <div className='letter_box'></div>
          <div className='letter_box'></div>
        </div>
      </div>
      <div className='container_keyboard'>
        <Keyboard onLetterClick={handleLetterSelection} />
      </div>
    </div>
  );
}

export default Termo;
