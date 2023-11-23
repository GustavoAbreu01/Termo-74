import React, { useEffect, useState } from 'react';
import words from '../../data/new.json';

import Keyboard from '../../components/keyboard/Keyboard';

import './Termo.css';
import Swal from 'sweetalert2';

function Termo() {
  const [wordDay, setWordDay] = useState(getWordDay);
  const [currentChance, setCurrentChance] = useState(0);
  const [chanceLast, setChanceLast] = useState(false);
  const [foundLetters, setFoundLetters] = useState([]);
  const [presentLetters, setPresentLetters] = useState([]);
  const [incorrectLetters, setIncorrectLetters] = useState([]);
  const [registerComplete, setRegisterComplete] = useState(false);
  const [gameWin, setGameWin] = useState(false);

  const handleLetterSelection = (index, letter) => {
    if (letter === 'Backspace' && chanceLast === false) {
      removeLetter();
    } else if (letter === 'Enter' && chanceLast === false) {
      checkWord();
    } else if (chanceLast === false) {
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

  useEffect(() => {
    if (registerComplete && gameWin) {
      const termo = JSON.parse(localStorage.getItem('termo'));
      termo.status.games++;
      termo.status.wins++;
      termo.status.streakChance++;
      if (termo.status.streakChance > termo.status.streak) {
        termo.status.streak = termo.status.streakChance;
      }
      if (currentChance === 0) {
        termo.status.hist[0]++;
      } else if (currentChance === 1) {
        termo.status.hist[1]++;
      } else if (currentChance === 2) {
        termo.status.hist[2]++;
      } else if (currentChance === 3) {
        termo.status.hist[3]++;
      } else if (currentChance === 4) {
        termo.status.hist[4]++;
      }
      localStorage.setItem('termo', JSON.stringify(termo));
    } else if (registerComplete && !gameWin) {
      const termo = JSON.parse(localStorage.getItem('termo'));
      termo.status.games++;
      termo.status.streakChance = 0;
      localStorage.setItem('termo', JSON.stringify(termo));
    }
  }, [registerComplete]);

  function getWordDay() {
    const words = words.palavras;
    const today = new Date();
    const dayOfYear = today.getDate() + today.getMonth() * 31;
    const word = words.palavras[dayOfYear % words.palavras.length];

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
      Swal.fire({
        title: 'Palavra deve ter 5 letras!',
        color: 'var(--platinum)',
        showConfirmButton: false,
        showCancelButton: false,
        background: 'var(--jet)',
        timerProgressBar: true,
        timer: 2000,
        toast: true,
        position: 'bottom-end',
        width: 400,
        showClass: {
          popup: 'animate__animated animate__backInRight'
        },
        hideClass: {
          popup: 'animate__animated animate__backOutRight'
        }
      })
      for (let i = 0; i < 5; i++) {
        const element = document.getElementById(`letter-${i + currentChance * 5}`);
        element.style.animation = 'errorAnimation 0.7s';
        element.style.animationTimingFunction = 'ease-in-out';
        element.style.animationFillMode = 'forwards';
        setTimeout(() => {
          element.style.animation = '';
          element.style.animationTimingFunction = '';
          element.style.animationFillMode = '';
        }, 700);
      }
    } else if (!words.palavras.includes(word)) {
      Swal.fire({
        title: 'Palavra inválida!',
        color: 'var(--platinum)',
        showConfirmButton: false,
        showCancelButton: false,
        background: 'var(--jet)',
        timerProgressBar: true,
        timer: 2000,
        toast: true,
        position: 'bottom-end',
        width: 400,
        showClass: {
          popup: 'animate__animated animate__backInRight'
        },
        hideClass: {
          popup: 'animate__animated animate__backOutRight'
        }
      })
      for (let i = 0; i < 5; i++) {
        const element = document.getElementById(`letter-${i + currentChance * 5}`);
        element.style.animation = 'errorAnimation 0.7s';
        element.style.animationTimingFunction = 'ease-in-out';
        element.style.animationFillMode = 'forwards';
        setTimeout(() => {
          element.style.animation = '';
          element.style.animationTimingFunction = '';
          element.style.animationFillMode = '';
        }, 700);
      }
    } else {
      verifyColors(word);
      if (word === wordDay) {
        setGameWin(true);
        setRegisterComplete(true);
        setChanceLast(true);
        Swal.fire({
          title: 'Palavra Descoberta!',
          text: 'A palavra do dia era ' + wordDay + '!',
          color: 'var(--platinum)',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: 'REINICIAR',
          confirmButtonColor: 'var(--african-violet)',
          background: 'var(--jet)',
          timerProgressBar: true,
          toast: true,
          width: 400,
          showClass: {
            popup: 'animate__animated animate__backInRight'
          },
          hideClass: {
            popup: 'animate__animated animate__backOutRight'
          },
        }).then((result) => {
          if (result.isConfirmed) {
            resetGame();
          }
        })
      } else if (currentChance === 4) {
        setChanceLast(true);
        setRegisterComplete(true);  
        Swal.fire({
          title: 'Você falhou!',
          text: 'A palavra do dia era ' + wordDay + '!',
          color: 'var(--platinum)',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: 'REINICIAR',
          confirmButtonColor: 'var(--african-violet)',
          background: 'var(--jet)',
          timerProgressBar: true,
          toast: true,
          width: 400,
          showClass: {
            popup: 'animate__animated animate__backInRight'
          },
          hideClass: {
            popup: 'animate__animated animate__backOutRight'
          },
        }).then((result) => {
          if (result.isConfirmed) {
            resetGame();
          }
        })
      } else if (word !== wordDay) {
        changeRows();
      }
    }
  };

  const changeRows = () => {
    setCurrentChance(currentChance + 1);
  };

  const resetGame = () => {
    window.location.reload();
  };

  const verifyColors = (word) => {
    for (let i = 0; i < 5; i++) {
      const element = document.getElementById(`letter-${i + currentChance * 5}`);
      const currentLetter = word[i];

      if (currentLetter === wordDay[i] && chanceLast === false) {
        element.className = 'letter_box_correct';
        element.style.animation = 'scaleUpAnimation 0.5s';
        element.style.animationTimingFunction = 'ease-in-out';
        element.style.animationFillMode = 'forwards';
        setFoundLetters((prevLetters) => [...prevLetters, currentLetter]);
      } else if (currentLetter !== wordDay[i] && wordDay.includes(currentLetter) && chanceLast === false) {
        element.className = 'letter_box_present';
        element.style.animation = 'scaleUpAnimation 0.5s';
        element.style.animationTimingFunction = 'ease-in-out';
        element.style.animationFillMode = 'forwards';
        setPresentLetters((prevLetters) => [...prevLetters, currentLetter]);
      } else if (currentLetter !== wordDay[i] && chanceLast === false) {
        element.className = 'letter_box_incorrect';
        element.style.animation = 'scaleUpAnimation 0.5s';
        element.style.animationTimingFunction = 'ease-in-out';
        element.style.animationFillMode = 'forwards';
        setIncorrectLetters((prevLetters) => [...prevLetters, currentLetter]);
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
        <Keyboard onLetterClick={handleLetterSelection} onEnterPress={checkWord} foundLetters={foundLetters}
          incorrectLetters={incorrectLetters} presentLetters={presentLetters} gameMode={"Termo"} />
      </div>
    </div>
  );
}

export default Termo;
