import React, { useEffect, useState } from 'react';
import words from '../../data/words.json';

import Keyboard from '../../components/keyboard/Keyboard';

import './Quarteto.css'

function Quarteto() {
  const [wordDay, setWordDay] = useState(getWordDay);
  const [wordDuoDay, setWordDuoDay] = useState(getWordDay);
  const [wordTrioDay, setWordTrioDay] = useState(getWordDay);
  const [wordQuartDay, setWordQuartDay] = useState(getWordDay);
  const [verifyCorrectWord, setVerifyCorrectWord] = useState(false);
  const [verifyCorrectWordDuo, setVerifyCorrectWordDuo] = useState(false);
  const [verifyCorrectWordTrio, setVerifyCorrectWordTrio] = useState(false);
  const [verifyCorrectWordQuart, setVerifyCorrectWordQuart] = useState(false);
  const [currentChance, setCurrentChance] = useState(0);
  const [foundLetters, setFoundLetters] = useState([]);

  useEffect(() => {
    if (verifyCorrectWord && verifyCorrectWordDuo && verifyCorrectWordTrio && verifyCorrectWordQuart) {
      alert('Você ganhou!');
      resetGame();
    }
  }, [verifyCorrectWord, verifyCorrectWordDuo, verifyCorrectWordTrio, verifyCorrectWordQuart]);

  const handleLetterSelection = (index, letter) => {
    console.log(wordDay, wordDuoDay, wordTrioDay, wordQuartDay);
    if (letter === 'Backspace') {
      removeLetter();
    } else if (letter === 'Enter') {
      checkWord();
    } else {
      for (let i = 0; i < 5; i++) {
        const element = document.getElementById(`letter-${i + currentChance * 5}`);
        const elementDuo = document.getElementById(`letterDuo-${i + currentChance * 5}`);
        const elementTrio = document.getElementById(`letterTrio-${i + currentChance * 5}`);
        const elementQuart = document.getElementById(`letterQuart-${i + currentChance * 5}`);
        if (element.innerHTML === '' && elementDuo.innerHTML === '' && elementTrio.innerHTML === '' && elementQuart.innerHTML === '') {
          if (verifyCorrectWord === false) {
            element.innerHTML = letter;
            element.className = 'letter_box_quarteto_selected';
          }
          if (verifyCorrectWordDuo === false) {
            elementDuo.innerHTML = letter;
            elementDuo.className = 'letter_box_quarteto_selected';
          }
          if (verifyCorrectWordTrio === false) {
            elementTrio.innerHTML = letter;
            elementTrio.className = 'letter_box_quarteto_selected';
          }
          if (verifyCorrectWordQuart === false) {
            elementQuart.innerHTML = letter;
            elementQuart.className = 'letter_box_quarteto_selected';
          }
          break;
        } else if (element.innerHTML !== '') {
          element.className = 'letter_box_quarteto';
          elementDuo.className = 'letter_box_quarteto';
          elementTrio.className = 'letter_box_quarteto';
          elementQuart.className = 'letter_box_quarteto';
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
    var wordDuo = '';
    var wordTrio = '';
    var wordQuart = '';
    for (let i = 0; i < 5; i++) {
      const element = document.getElementById(`letter-${i + currentChance * 5}`);
      const elementDuo = document.getElementById(`letterDuo-${i + currentChance * 5}`);
      const elementTrio = document.getElementById(`letterTrio-${i + currentChance * 5}`);
      const elementQuart = document.getElementById(`letterQuart-${i + currentChance * 5}`);
      word += element.innerHTML;
      wordDuo += elementDuo.innerHTML;
      wordTrio += elementTrio.innerHTML;
      wordQuart += elementQuart.innerHTML;
    }
    if (word.length < 5 && wordDuo.length < 5 && wordTrio.length < 5 && wordQuart.length < 5) {

    } else {
      verifyColors(word, wordDuo, wordTrio, wordQuart);
      if (word === wordDay && verifyCorrectWord === false) {
        setVerifyCorrectWord(true);
        changeRows();
      } else if (wordDuo === wordDuoDay && verifyCorrectWordDuo === false) {
        setVerifyCorrectWordDuo(true);
        changeRows();
      } else if (wordTrio === wordTrioDay && verifyCorrectWordTrio === false) {
        setVerifyCorrectWordTrio(true);
        changeRows();
      } else if (wordQuart === wordQuartDay && verifyCorrectWordQuart === false) {
        setVerifyCorrectWordQuart(true);
        changeRows();
      } else if (word !== wordDay || wordDuo !== wordDuoDay || wordTrio !== wordTrioDay || wordQuart !== wordQuartDay) {
        changeRows();
      }

      if (currentChance === 7 && verifyCorrectWord !== true && verifyCorrectWordDuo !== true && verifyCorrectWordTrio !== true && verifyCorrectWordQuart !== true) {
        resetGame();
        alert('Você perdeu!' + '\n' + 'A palavra era: ' + wordDay + ' - ' + wordDuoDay + ' - ' + wordTrioDay + ' - ' + wordQuartDay);
      }
    }
  };

  const changeRows = () => {
    setCurrentChance(currentChance + 1);
  };

  const resetGame = () => {
    setCurrentChance(0);
    getWordDay();
    for (let i = 0; i < 30; i++) {
      const element = document.getElementById(`letter-${i}`);
      const elementDuo = document.getElementById(`letterDuo-${i}`);
      const elementTrio = document.getElementById(`letterTrio-${i}`);
      const elementQuart = document.getElementById(`letterQuart-${i}`);
      element.innerHTML = '';
      element.className = 'letter_box_quarteto';
      element.style.animation = '';
      element.style.animationTimingFunction = '';
      element.style.animationFillMode = '';
      elementDuo.innerHTML = '';
      elementDuo.className = 'letter_box_quarteto';
      elementDuo.style.animation = '';
      elementDuo.style.animationTimingFunction = '';
      elementDuo.style.animationFillMode = '';
      elementTrio.innerHTML = '';
      elementTrio.className = 'letter_box_quarteto';
      elementTrio.style.animation = '';
      elementTrio.style.animationTimingFunction = '';
      elementTrio.style.animationFillMode = '';
      elementQuart.innerHTML = '';
      elementQuart.className = 'letter_box_quarteto';
      elementQuart.style.animation = '';
      elementQuart.style.animationTimingFunction = '';
      elementQuart.style.animationFillMode = '';

    }
    window.location.reload();
  };

  const verifyColors = (word, wordDuo, wordTrio, wordQuart) => {
    for (let i = 0; i < 5; i++) {
      const element = document.getElementById(`letter-${i + currentChance * 5}`);
      const currentLetter = word[i];
      if (!verifyCorrectWord) {
        if (currentLetter === wordDay[i]) {
          element.className = 'letter_box_quarteto_correct';
          element.style.animation = 'scaleUpAnimation 0.5s';
          element.style.animationTimingFunction = 'ease-in-out';
          element.style.animationFillMode = 'forwards';
          setFoundLetters((prevLetters) => [...prevLetters, currentLetter]);
        } else if (currentLetter !== wordDay[i] && wordDay.includes(currentLetter)) {
          element.className = 'letter_box_quarteto_present';
          element.style.animation = 'scaleUpAnimation 0.5s';
          element.style.animationTimingFunction = 'ease-in-out';
          element.style.animationFillMode = 'forwards';
        } else if (currentLetter !== wordDay[i]) {
          element.className = 'letter_box_quarteto_incorrect';
          element.style.animation = 'scaleUpAnimation 0.5s';
          element.style.animationTimingFunction = 'ease-in-out';
          element.style.animationFillMode = 'forwards';
        }
      }
    }

    for (let i = 0; i < 5; i++) {
      const elementDuo = document.getElementById(`letterDuo-${i + currentChance * 5}`);
      const currentLetterDuo = wordDuo[i];
      if (!verifyCorrectWordDuo) {
        if (currentLetterDuo === wordDuoDay[i]) {
          elementDuo.className = 'letter_box_quarteto_correct';
          elementDuo.style.animation = 'scaleUpAnimation 0.5s';
          elementDuo.style.animationTimingFunction = 'ease-in-out';
          elementDuo.style.animationFillMode = 'forwards';
          setFoundLetters((prevLetters) => [...prevLetters, currentLetterDuo]);
        } else if (currentLetterDuo !== wordDuoDay[i] && wordDuoDay.includes(currentLetterDuo)) {
          elementDuo.className = 'letter_box_quarteto_present';
          elementDuo.style.animation = 'scaleUpAnimation 0.5s';
          elementDuo.style.animationTimingFunction = 'ease-in-out';
          elementDuo.style.animationFillMode = 'forwards';
        } else if (currentLetterDuo !== wordDuoDay[i]) {
          elementDuo.className = 'letter_box_quarteto_incorrect';
          elementDuo.style.animation = 'scaleUpAnimation 0.5s';
          elementDuo.style.animationTimingFunction = 'ease-in-out';
          elementDuo.style.animationFillMode = 'forwards';
        }
      }
    }

    for (let i = 0; i < 5; i++) {
      const elementTrio = document.getElementById(`letterTrio-${i + currentChance * 5}`);
      const currentLetterTrio = wordTrio[i];
      if (!verifyCorrectWordTrio) {
        if (currentLetterTrio === wordTrioDay[i]) {
          elementTrio.className = 'letter_box_quarteto_correct';
          elementTrio.style.animation = 'scaleUpAnimation 0.5s';
          elementTrio.style.animationTimingFunction = 'ease-in-out';
          elementTrio.style.animationFillMode = 'forwards';
          setFoundLetters((prevLetters) => [...prevLetters, currentLetterTrio]);
        } else if (currentLetterTrio !== wordTrioDay[i] && wordTrioDay.includes(currentLetterTrio)) {
          elementTrio.className = 'letter_box_quarteto_present';
          elementTrio.style.animation = 'scaleUpAnimation 0.5s';
          elementTrio.style.animationTimingFunction = 'ease-in-out';
          elementTrio.style.animationFillMode = 'forwards';
        } else if (currentLetterTrio !== wordTrioDay[i]) {
          elementTrio.className = 'letter_box_quarteto_incorrect';
          elementTrio.style.animation = 'scaleUpAnimation 0.5s';
          elementTrio.style.animationTimingFunction = 'ease-in-out';
          elementTrio.style.animationFillMode = 'forwards';
        }
      }
    }

    for (let i = 0; i < 5; i++) {
      const elementQuart = document.getElementById(`letterQuart-${i + currentChance * 5}`);
      const currentLetterQuart = wordQuart[i];
      if (!verifyCorrectWordQuart) {
        if (currentLetterQuart === wordQuartDay[i]) {
          elementQuart.className = 'letter_box_quarteto_correct';
          elementQuart.style.animation = 'scaleUpAnimation 0.5s';
          elementQuart.style.animationTimingFunction = 'ease-in-out';
          elementQuart.style.animationFillMode = 'forwards';
          setFoundLetters((prevLetters) => [...prevLetters, currentLetterQuart]);
        } else if (currentLetterQuart !== wordQuartDay[i] && wordQuartDay.includes(currentLetterQuart)) {
          elementQuart.className = 'letter_box_quarteto_present';
          elementQuart.style.animation = 'scaleUpAnimation 0.5s';
          elementQuart.style.animationTimingFunction = 'ease-in-out';
          elementQuart.style.animationFillMode = 'forwards';
        } else if (currentLetterQuart !== wordQuartDay[i]) {
          elementQuart.className = 'letter_box_quarteto_incorrect';
          elementQuart.style.animation = 'scaleUpAnimation 0.5s';
          elementQuart.style.animationTimingFunction = 'ease-in-out';
          elementQuart.style.animationFillMode = 'forwards';
        }
      }
    }
  };

  const removeLetter = () => {
    for (let i = 4; i >= 0; i--) {
      const element = document.getElementById(`letter-${i + currentChance * 5}`);
      const elementDuo = document.getElementById(`letterDuo-${i + currentChance * 5}`);
      const elementTrio = document.getElementById(`letterTrio-${i + currentChance * 5}`);
      const elementQuart = document.getElementById(`letterQuart-${i + currentChance * 5}`);
      if (element.innerHTML !== '' || elementDuo.innerHTML !== '' || elementTrio.innerHTML !== '' || elementQuart.innerHTML !== '') {
        if (verifyCorrectWord === false) {
          element.innerHTML = '';
          element.className = 'letter_box_quarteto_selected';
        }
        if (verifyCorrectWordDuo === false) {
          elementDuo.innerHTML = '';
          elementDuo.className = 'letter_box_quarteto_selected';
        }
        if (verifyCorrectWordTrio === false) {
          elementTrio.innerHTML = '';
          elementTrio.className = 'letter_box_quarteto_selected';
        }
        if (verifyCorrectWordQuart === false) {
          elementQuart.innerHTML = '';
          elementQuart.className = 'letter_box_quarteto_selected';
        }
        break;
      } else if (element.innerHTML === '' && elementDuo.innerHTML === '' && elementTrio.innerHTML === '' && elementQuart.innerHTML === '') {
        element.className = 'letter_box_quarteto';
        elementDuo.className = 'letter_box_quarteto';
        elementTrio.className = 'letter_box_quarteto';
        elementQuart.className = 'letter_box_quarteto';
        continue;
      }
    }
  };

  return (
    <div className='container_game'>
      <div className='container_dueto'>
        <div className='box_quarteto'>
          <div className='container_row'>
            <div id='letter-0' className='letter_box_quarteto'></div>
            <div id='letter-1' className='letter_box_quarteto'></div>
            <div id='letter-2' className='letter_box_quarteto'></div>
            <div id='letter-3' className='letter_box_quarteto'></div>
            <div id='letter-4' className='letter_box_quarteto'></div>
          </div>
          <div className='container_row'>
            <div id='letter-5' className='letter_box_quarteto'></div>
            <div id='letter-6' className='letter_box_quarteto'></div>
            <div id='letter-7' className='letter_box_quarteto'></div>
            <div id='letter-8' className='letter_box_quarteto'></div>
            <div id='letter-9' className='letter_box_quarteto'></div>
          </div>
          <div className='container_row'>
            <div id='letter-10' className='letter_box_quarteto'></div>
            <div id='letter-11' className='letter_box_quarteto'></div>
            <div id='letter-12' className='letter_box_quarteto'></div>
            <div id='letter-13' className='letter_box_quarteto'></div>
            <div id='letter-14' className='letter_box_quarteto'></div>
          </div>
          <div className='container_row'>
            <div id='letter-15' className='letter_box_quarteto'></div>
            <div id='letter-16' className='letter_box_quarteto'></div>
            <div id='letter-17' className='letter_box_quarteto'></div>
            <div id='letter-18' className='letter_box_quarteto'></div>
            <div id='letter-19' className='letter_box_quarteto'></div>
          </div>
          <div className='container_row'>
            <div id='letter-20' className='letter_box_quarteto'></div>
            <div id='letter-21' className='letter_box_quarteto'></div>
            <div id='letter-22' className='letter_box_quarteto'></div>
            <div id='letter-23' className='letter_box_quarteto'></div>
            <div id='letter-24' className='letter_box_quarteto'></div>
          </div>
          <div className='container_row'>
            <div id='letter-25' className='letter_box_quarteto'></div>
            <div id='letter-26' className='letter_box_quarteto'></div>
            <div id='letter-27' className='letter_box_quarteto'></div>
            <div id='letter-28' className='letter_box_quarteto'></div>
            <div id='letter-29' className='letter_box_quarteto'></div>
          </div>
          <div className='container_row'>
            <div id='letter-30' className='letter_box_quarteto'></div>
            <div id='letter-31' className='letter_box_quarteto'></div>
            <div id='letter-32' className='letter_box_quarteto'></div>
            <div id='letter-33' className='letter_box_quarteto'></div>
            <div id='letter-34' className='letter_box_quarteto'></div>
          </div>
          <div className='container_row'>
            <div id='letter-35' className='letter_box_quarteto'></div>
            <div id='letter-36' className='letter_box_quarteto'></div>
            <div id='letter-37' className='letter_box_quarteto'></div>
            <div id='letter-38' className='letter_box_quarteto'></div>
            <div id='letter-39' className='letter_box_quarteto'></div>
          </div>
        </div>
        <div className='box_quarteto'>
          <div className='container_row'>
            <div id='letterDuo-0' className='letter_box_quarteto'></div>
            <div id='letterDuo-1' className='letter_box_quarteto'></div>
            <div id='letterDuo-2' className='letter_box_quarteto'></div>
            <div id='letterDuo-3' className='letter_box_quarteto'></div>
            <div id='letterDuo-4' className='letter_box_quarteto'></div>
          </div>
          <div className='container_row'>
            <div id='letterDuo-5' className='letter_box_quarteto'></div>
            <div id='letterDuo-6' className='letter_box_quarteto'></div>
            <div id='letterDuo-7' className='letter_box_quarteto'></div>
            <div id='letterDuo-8' className='letter_box_quarteto'></div>
            <div id='letterDuo-9' className='letter_box_quarteto'></div>
          </div>
          <div className='container_row'>
            <div id='letterDuo-10' className='letter_box_quarteto'></div>
            <div id='letterDuo-11' className='letter_box_quarteto'></div>
            <div id='letterDuo-12' className='letter_box_quarteto'></div>
            <div id='letterDuo-13' className='letter_box_quarteto'></div>
            <div id='letterDuo-14' className='letter_box_quarteto'></div>
          </div>
          <div className='container_row'>
            <div id='letterDuo-15' className='letter_box_quarteto'></div>
            <div id='letterDuo-16' className='letter_box_quarteto'></div>
            <div id='letterDuo-17' className='letter_box_quarteto'></div>
            <div id='letterDuo-18' className='letter_box_quarteto'></div>
            <div id='letterDuo-19' className='letter_box_quarteto'></div>
          </div>
          <div className='container_row'>
            <div id='letterDuo-20' className='letter_box_quarteto'></div>
            <div id='letterDuo-21' className='letter_box_quarteto'></div>
            <div id='letterDuo-22' className='letter_box_quarteto'></div>
            <div id='letterDuo-23' className='letter_box_quarteto'></div>
            <div id='letterDuo-24' className='letter_box_quarteto'></div>
          </div>
          <div className='container_row'>
            <div id='letterDuo-25' className='letter_box_quarteto'></div>
            <div id='letterDuo-26' className='letter_box_quarteto'></div>
            <div id='letterDuo-27' className='letter_box_quarteto'></div>
            <div id='letterDuo-28' className='letter_box_quarteto'></div>
            <div id='letterDuo-29' className='letter_box_quarteto'></div>
          </div>
          <div className='container_row'>
            <div id='letterDuo-30' className='letter_box_quarteto'></div>
            <div id='letterDuo-31' className='letter_box_quarteto'></div>
            <div id='letterDuo-32' className='letter_box_quarteto'></div>
            <div id='letterDuo-33' className='letter_box_quarteto'></div>
            <div id='letterDuo-34' className='letter_box_quarteto'></div>
          </div>
          <div className='container_row'>
            <div id='letterDuo-35' className='letter_box_quarteto'></div>
            <div id='letterDuo-36' className='letter_box_quarteto'></div>
            <div id='letterDuo-37' className='letter_box_quarteto'></div>
            <div id='letterDuo-38' className='letter_box_quarteto'></div>
            <div id='letterDuo-39' className='letter_box_quarteto'></div>
          </div>
        </div>
        <div className='box_quarteto'>
          <div className='container_row'>
            <div id='letterTrio-0' className='letter_box_quarteto'></div>
            <div id='letterTrio-1' className='letter_box_quarteto'></div>
            <div id='letterTrio-2' className='letter_box_quarteto'></div>
            <div id='letterTrio-3' className='letter_box_quarteto'></div>
            <div id='letterTrio-4' className='letter_box_quarteto'></div>
          </div>
          <div className='container_row'>
            <div id='letterTrio-5' className='letter_box_quarteto'></div>
            <div id='letterTrio-6' className='letter_box_quarteto'></div>
            <div id='letterTrio-7' className='letter_box_quarteto'></div>
            <div id='letterTrio-8' className='letter_box_quarteto'></div>
            <div id='letterTrio-9' className='letter_box_quarteto'></div>
          </div>
          <div className='container_row'>
            <div id='letterTrio-10' className='letter_box_quarteto'></div>
            <div id='letterTrio-11' className='letter_box_quarteto'></div>
            <div id='letterTrio-12' className='letter_box_quarteto'></div>
            <div id='letterTrio-13' className='letter_box_quarteto'></div>
            <div id='letterTrio-14' className='letter_box_quarteto'></div>
          </div>
          <div className='container_row'>
            <div id='letterTrio-15' className='letter_box_quarteto'></div>
            <div id='letterTrio-16' className='letter_box_quarteto'></div>
            <div id='letterTrio-17' className='letter_box_quarteto'></div>
            <div id='letterTrio-18' className='letter_box_quarteto'></div>
            <div id='letterTrio-19' className='letter_box_quarteto'></div>
          </div>
          <div className='container_row'>
            <div id='letterTrio-20' className='letter_box_quarteto'></div>
            <div id='letterTrio-21' className='letter_box_quarteto'></div>
            <div id='letterTrio-22' className='letter_box_quarteto'></div>
            <div id='letterTrio-23' className='letter_box_quarteto'></div>
            <div id='letterTrio-24' className='letter_box_quarteto'></div>
          </div>
          <div className='container_row'>
            <div id='letterTrio-25' className='letter_box_quarteto'></div>
            <div id='letterTrio-26' className='letter_box_quarteto'></div>
            <div id='letterTrio-27' className='letter_box_quarteto'></div>
            <div id='letterTrio-28' className='letter_box_quarteto'></div>
            <div id='letterTrio-29' className='letter_box_quarteto'></div>
          </div>
          <div className='container_row'>
            <div id='letterTrio-30' className='letter_box_quarteto'></div>
            <div id='letterTrio-31' className='letter_box_quarteto'></div>
            <div id='letterTrio-32' className='letter_box_quarteto'></div>
            <div id='letterTrio-33' className='letter_box_quarteto'></div>
            <div id='letterTrio-34' className='letter_box_quarteto'></div>
          </div>
          <div className='container_row'>
            <div id='letterTrio-35' className='letter_box_quarteto'></div>
            <div id='letterTrio-36' className='letter_box_quarteto'></div>
            <div id='letterTrio-37' className='letter_box_quarteto'></div>
            <div id='letterTrio-38' className='letter_box_quarteto'></div>
            <div id='letterTrio-39' className='letter_box_quarteto'></div>
          </div>
        </div>
        <div className='box_quarteto'>
          <div className='container_row'>
            <div id='letterQuart-0' className='letter_box_quarteto'></div>
            <div id='letterQuart-1' className='letter_box_quarteto'></div>
            <div id='letterQuart-2' className='letter_box_quarteto'></div>
            <div id='letterQuart-3' className='letter_box_quarteto'></div>
            <div id='letterQuart-4' className='letter_box_quarteto'></div>
          </div>
          <div className='container_row'>
            <div id='letterQuart-5' className='letter_box_quarteto'></div>
            <div id='letterQuart-6' className='letter_box_quarteto'></div>
            <div id='letterQuart-7' className='letter_box_quarteto'></div>
            <div id='letterQuart-8' className='letter_box_quarteto'></div>
            <div id='letterQuart-9' className='letter_box_quarteto'></div>
          </div>
          <div className='container_row'>
            <div id='letterQuart-10' className='letter_box_quarteto'></div>
            <div id='letterQuart-11' className='letter_box_quarteto'></div>
            <div id='letterQuart-12' className='letter_box_quarteto'></div>
            <div id='letterQuart-13' className='letter_box_quarteto'></div>
            <div id='letterQuart-14' className='letter_box_quarteto'></div>
          </div>
          <div className='container_row'>
            <div id='letterQuart-15' className='letter_box_quarteto'></div>
            <div id='letterQuart-16' className='letter_box_quarteto'></div>
            <div id='letterQuart-17' className='letter_box_quarteto'></div>
            <div id='letterQuart-18' className='letter_box_quarteto'></div>
            <div id='letterQuart-19' className='letter_box_quarteto'></div>
          </div>
          <div className='container_row'>
            <div id='letterQuart-20' className='letter_box_quarteto'></div>
            <div id='letterQuart-21' className='letter_box_quarteto'></div>
            <div id='letterQuart-22' className='letter_box_quarteto'></div>
            <div id='letterQuart-23' className='letter_box_quarteto'></div>
            <div id='letterQuart-24' className='letter_box_quarteto'></div>
          </div>
          <div className='container_row'>
            <div id='letterQuart-25' className='letter_box_quarteto'></div>
            <div id='letterQuart-26' className='letter_box_quarteto'></div>
            <div id='letterQuart-27' className='letter_box_quarteto'></div>
            <div id='letterQuart-28' className='letter_box_quarteto'></div>
            <div id='letterQuart-29' className='letter_box_quarteto'></div>
          </div>
          <div className='container_row'>
            <div id='letterQuart-30' className='letter_box_quarteto'></div>
            <div id='letterQuart-31' className='letter_box_quarteto'></div>
            <div id='letterQuart-32' className='letter_box_quarteto'></div>
            <div id='letterQuart-33' className='letter_box_quarteto'></div>
            <div id='letterQuart-34' className='letter_box_quarteto'></div>
          </div>
          <div className='container_row'>
            <div id='letterQuart-35' className='letter_box_quarteto'></div>
            <div id='letterQuart-36' className='letter_box_quarteto'></div>
            <div id='letterQuart-37' className='letter_box_quarteto'></div>
            <div id='letterQuart-38' className='letter_box_quarteto'></div>
            <div id='letterQuart-39' className='letter_box_quarteto'></div>
          </div>
        </div>
      </div>
      <div className='container_keyboard_quarteto'>
        <Keyboard onLetterClick={handleLetterSelection} onEnterPress={checkWord} />
      </div>
    </div>
  );
}

export default Quarteto