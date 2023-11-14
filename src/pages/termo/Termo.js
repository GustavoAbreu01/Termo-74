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
          element.className = 'letter_box_selected';
          break;
        } else if (element.innerHTML !== '') {
          element.className = 'letter_box';
          continue;
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
        resetGame();
        alert('Parabéns, você acertou!');
      } else if (currentChance === 4) {
        resetGame();
        alert('Você perdeu!' + '\n' + 'A palavra era: ' + wordDay);
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
    getWordDay();
    for (let i = 0; i < 25; i++) {
      const element = document.getElementById(`letter-${i}`);
      element.innerHTML = '';
      element.className = 'letter_box';
      element.style.animation = '';
      element.style.animationTimingFunction = '';
      element.style.animationFillMode = '';
    }
    window.location.reload();
  };

  const verifyColors = (word) => {
    for (let i = 0; i < 5; i++) {
      const element = document.getElementById(`letter-${i + currentChance * 5}`);
      const currentLetter = word[i];

      if (currentLetter === wordDay[i]) {
        element.className = 'letter_box_correct';
        element.style.animation = 'scaleUpAnimation 0.5s';
        element.style.animationTimingFunction = 'ease-in-out';
        element.style.animationFillMode = 'forwards';
        setFoundLetters((prevLetters) => [...prevLetters, currentLetter]);
      } else if (currentLetter !== wordDay[i] && wordDay.includes(currentLetter)) {
        element.className = 'letter_box_present';
        element.style.animation = 'scaleUpAnimation 0.5s';
        element.style.animationTimingFunction = 'ease-in-out';
        element.style.animationFillMode = 'forwards';
      } else if (currentLetter !== wordDay[i]) {
        element.className = 'letter_box_incorrect';
        element.style.animation = 'scaleUpAnimation 0.5s';
        element.style.animationTimingFunction = 'ease-in-out';
        element.style.animationFillMode = 'forwards';
      }
    }
  };

  const removeLetter = () => {
    for (let i = 4; i >= 0; i--) {
      const element = document.getElementById(`letter-${i + currentChance * 5}`);
      if (element.innerHTML !== '') {
        element.innerHTML = '';
        element.className = 'letter_box_selected';
        break;
      } else if (element.innerHTML === '') {
        element.className = 'letter_box';
        continue;
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
