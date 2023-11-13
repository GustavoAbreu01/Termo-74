import React, { useEffect, useState } from 'react';
import words from '../../data/words.json';

import Keyboard from '../../components/keyboard/Keyboard';

import './Termo.css';

function Termo() {
  const [wordDay, setWordDay] = useState(getWordDay);
  const [currentChance, setCurrentChance] = useState(0);
  const [foundLetters, setFoundLetters] = useState([]);

  const handleLetterSelection = (index, letter) => {
    if (letter === 'Backspace') {
      removeLetter();
    } else if (letter === 'Enter') {
      checkWord();
    } else {
      for (let i = 0; i < 5; i++) {
        const element = document.getElementById(`letter-${i + currentChance * 5}`);
        if (element.innerHTML === '') {
          element.innerHTML = letter;
          break;
        }
      }
    }
  };

  function getWordDay() {
    const word = words.palavras[Math.floor(Math.random() * words.palavras.length)];
    let cleanedWord = word
      .replace(/ç/g, 'c')
      .replace(/á/g, 'a')
      .replace(/ã/g, 'a')
      .replace(/â/g, 'a')
      .replace(/é/g, 'e')
      .replace(/ê/g, 'e')
      .replace(/í/g, 'i')
      .replace(/ó/g, 'o')
      .replace(/ô/g, 'o')
      .replace(/õ/g, 'o')
      .replace(/ú/g, 'u');

    return cleanedWord;
  }

  const checkWord = () => {
    var word = '';
    for (let i = 0; i < 5; i++) {
      const element = document.getElementById(`letter-${i + currentChance * 5}`);
      word += element.innerHTML;
    }
    if (word.length < 5) {

    } else {
      verifyColors(word);
      if (word === wordDay) {
        alert('Parabéns, você acertou!');
        resetGame();
      } else if (currentChance === 4) {
        alert('Você perdeu!' + '\n' + 'A palavra era: ' + wordDay);
        resetGame();
      } else if (word !== wordDay) {
        changeRows();
      }
    }
  };

  const changeRows = () => {

    setCurrentChance(currentChance + 1);
  };

  const resetGame = () => {
    setCurrentChance(0);
    setWordDay(words.palavras[Math.floor(Math.random() * words.palavras.length)]);
    for (let i = 0; i < 25; i++) {
      const element = document.getElementById(`letter-${i}`);
      element.innerHTML = '';
      element.className = 'letter_box';
    }
  };

  const verifyColors = (word) => {
    for (let i = 0; i < 5; i++) {
      const element = document.getElementById(`letter-${i + currentChance * 5}`);
      const currentLetter = word[i];

      if (foundLetters.includes(currentLetter)) {
        element.className = 'letter_box_correct';
      } if (currentLetter === wordDay[i]) {
        element.className = 'letter_box_correct';
        setFoundLetters((prevLetters) => [...prevLetters, currentLetter]);
      } else if (currentLetter !== wordDay[i] && wordDay.includes(currentLetter)) {
        element.className = 'letter_box_present';
      } else if (currentLetter !== wordDay[i]) {
        element.className = 'letter_box_incorrect';
      }
    }
  };

  const removeLetter = () => {
    for (let i = 4; i >= 0; i--) {
      const element = document.getElementById(`letter-${i + currentChance * 5}`);
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
          <div id='letter-0' className='letter_box'></div>
          <div id='letter-1' className='letter_box'></div>
          <div id='letter-2' className='letter_box'></div>
          <div id='letter-3' className='letter_box'></div>
          <div id='letter-4' className='letter_box'></div>
        </div>
        <div className='container_row'>
          <div id='letter-5' className='letter_box'></div>
          <div id='letter-6' className='letter_box'></div>
          <div id='letter-7' className='letter_box'></div>
          <div id='letter-8' className='letter_box'></div>
          <div id='letter-9' className='letter_box'></div>
        </div>
        <div className='container_row'>
          <div id='letter-10' className='letter_box'></div>
          <div id='letter-11' className='letter_box'></div>
          <div id='letter-12' className='letter_box'></div>
          <div id='letter-13' className='letter_box'></div>
          <div id='letter-14' className='letter_box'></div>
        </div>
        <div className='container_row'>
          <div id='letter-15' className='letter_box'></div>
          <div id='letter-16' className='letter_box'></div>
          <div id='letter-17' className='letter_box'></div>
          <div id='letter-18' className='letter_box'></div>
          <div id='letter-19' className='letter_box'></div>
        </div>
        <div className='container_row'>
          <div id='letter-20' className='letter_box'></div>
          <div id='letter-21' className='letter_box'></div>
          <div id='letter-22' className='letter_box'></div>
          <div id='letter-23' className='letter_box'></div>
          <div id='letter-24' className='letter_box'></div>
        </div>
      </div>
      <div className='container_keyboard'>
        <Keyboard onLetterClick={handleLetterSelection} onEnterPress={checkWord} />
      </div>
    </div>
  );
}

export default Termo;
