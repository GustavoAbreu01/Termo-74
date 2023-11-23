import React, { useEffect, useState } from 'react';
import words from '../../data/new.json';

import Keyboard from '../../components/keyboard/Keyboard';

import './Dueto.css'
import Swal from 'sweetalert2';

function Dueto() {
  const [wordDay, setWordDay] = useState(getWordDay);
  const [wordDuoDay, setWordDuoDay] = useState(getWordDay);
  const [verifyCorrectWord, setVerifyCorrectWord] = useState(false);
  const [verifyCorrectWordDuo, setVerifyCorrectWordDuo] = useState(false);
  const [currentChance, setCurrentChance] = useState(0);
  const [chanceLast, setChanceLast] = useState(false);
  const [foundLetters, setFoundLetters] = useState([]);
  const [presentLetters, setPresentLetters] = useState([]);
  const [incorrectLetters, setIncorrectLetters] = useState([]);
  const [foundLettersDuo, setFoundLettersDuo] = useState([]);
  const [presentLettersDuo, setPresentLettersDuo] = useState([]);
  const [incorrectLettersDuo, setIncorrectLettersDuo] = useState([]);
  const [registerComplete, setRegisterComplete] = useState(false);
  const [gameWin, setGameWin] = useState(false);

  useEffect(() => {
    if (verifyCorrectWord && verifyCorrectWordDuo) {
      setGameWin(true);
      setRegisterComplete(true);
      setChanceLast(true);
      Swal.fire({
        title: 'Palavras Descobertas!',
        text: 'As palavras do dia eram ' + wordDay + ' e ' + wordDuoDay + '!',
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
    } else if (currentChance === 5) {
      setChanceLast(true);
      setRegisterComplete(true);
      Swal.fire({
        title: 'Você falhou!',
        text: 'As palavras do dia eram ' + wordDay + ' e ' + wordDuoDay + '!',
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
    }
  }, [verifyCorrectWord, verifyCorrectWordDuo,]);

  useEffect(() => {
    if (registerComplete && gameWin) {
      const dueto = JSON.parse(localStorage.getItem('dueto'));
      dueto.status.games++;
      dueto.status.wins++;
      dueto.status.streakChance++;
      if (dueto.status.streakChance > dueto.status.streak) {
        dueto.status.streak = dueto.status.streakChance;
      }
      if (currentChance === 0) {
        dueto.status.hist[0]++;
      } else if (currentChance === 1) {
        dueto.status.hist[1]++;
      } else if (currentChance === 2) {
        dueto.status.hist[2]++;
      } else if (currentChance === 3) {
        dueto.status.hist[3]++;
      } else if (currentChance === 4) {
        dueto.status.hist[4]++;
      } else if (currentChance === 5) {
        dueto.status.hist[5]++;
      }
      localStorage.setItem('dueto', JSON.stringify(dueto));
    } else if (registerComplete && !gameWin) {
      const dueto = JSON.parse(localStorage.getItem('dueto'));
      dueto.status.games++;
      dueto.status.streakChance = 0;
      localStorage.setItem('dueto', JSON.stringify(dueto));
    }
  }, [registerComplete]);

  const handleLetterSelection = (index, letter) => {
    console.log(wordDay, wordDuoDay);
    if (letter === 'Backspace' && chanceLast === false) {
      removeLetter();
    } else if (letter === 'Enter' && chanceLast === false) {
      checkWord();
    } else {
      for (let i = 0; i < 5; i++) {
        const element = document.getElementById(`letter-${i + currentChance * 5}`);
        const elementDuo = document.getElementById(`letterDuo-${i + currentChance * 5}`);
        if (element.innerHTML === '' && elementDuo.innerHTML === '' && chanceLast === false) {
          if (verifyCorrectWord === false && chanceLast === false) {
            element.innerHTML = letter;
            element.className = 'letter_box_selected';
          }
          if (verifyCorrectWordDuo === false && chanceLast === false) {
            elementDuo.innerHTML = letter;
            elementDuo.className = 'letter_box_selected';
          }
          break;
        } else if (element.innerHTML !== '' && chanceLast === false) {
          element.className = 'letter_box';
          elementDuo.className = 'letter_box';
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
    for (let i = 0; i < 5; i++) {
      const element = document.getElementById(`letter-${i + currentChance * 5}`);
      const elementDuo = document.getElementById(`letterDuo-${i + currentChance * 5}`);
      word += element.innerHTML;
      wordDuo += elementDuo.innerHTML;
    }
    if (word.length < 5 && wordDuo.length < 5) {
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

        const elementDuo = document.getElementById(`letterDuo-${i + currentChance * 5}`);
        elementDuo.style.animation = 'errorAnimation 0.7s';
        elementDuo.style.animationTimingFunction = 'ease-in-out';
        elementDuo.style.animationFillMode = 'forwards';
        setTimeout(() => {
          elementDuo.style.animation = '';
          elementDuo.style.animationTimingFunction = '';
          elementDuo.style.animationFillMode = '';
        }, 700);
      }
    } else if (!words.palavras.includes(word) && !words.palavras.includes(wordDuo)) {
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

        const elementDuo = document.getElementById(`letterDuo-${i + currentChance * 5}`);
        elementDuo.style.animation = 'errorAnimation 0.7s';
        elementDuo.style.animationTimingFunction = 'ease-in-out';
        elementDuo.style.animationFillMode = 'forwards';
        setTimeout(() => {
          elementDuo.style.animation = '';
          elementDuo.style.animationTimingFunction = '';
          elementDuo.style.animationFillMode = '';
        }, 700);
      }
    } else {
      verifyColors(word, wordDuo);
      if (word === wordDay && verifyCorrectWord === false) {
        setVerifyCorrectWord(true);
        changeRows();
      } else if (wordDuo === wordDuoDay && verifyCorrectWordDuo === false) {
        setVerifyCorrectWordDuo(true);
        changeRows();
      } else if (word !== wordDay || wordDuo !== wordDuoDay) {
        changeRows();
      }

      if (currentChance === 5) {
        setChanceLast(true);
        setRegisterComplete(true);  
        Swal.fire({
          title: 'Você falhou!',
          text: 'As palavras do dia eram ' + wordDay + ' e ' + wordDuoDay + '!',
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
      }
    }
  };

  const changeRows = () => {
    setCurrentChance(currentChance + 1);
  };

  const resetGame = () => {
    window.location.reload();
  };

  const verifyColors = (word, wordDuo) => {
    for (let i = 0; i < 5; i++) {
      const element = document.getElementById(`letter-${i + currentChance * 5}`);
      const currentLetter = word[i];
      if (!verifyCorrectWord) {
        if (currentLetter === wordDay[i] && chanceLast === false && verifyCorrectWord === false) {
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
    }

    for (let i = 0; i < 5; i++) {
      const elementDuo = document.getElementById(`letterDuo-${i + currentChance * 5}`);
      const currentLetterDuo = wordDuo[i];
      if (!verifyCorrectWordDuo) {
        if (currentLetterDuo === wordDuoDay[i] && chanceLast === false) {
          elementDuo.className = 'letter_box_correct';
          elementDuo.style.animation = 'scaleUpAnimation 0.5s';
          elementDuo.style.animationTimingFunction = 'ease-in-out';
          elementDuo.style.animationFillMode = 'forwards';
          setFoundLettersDuo((prevLetters) => [...prevLetters, currentLetterDuo]);
        } else if (currentLetterDuo !== wordDuoDay[i] && wordDuoDay.includes(currentLetterDuo) && chanceLast === false) {
          elementDuo.className = 'letter_box_present';
          elementDuo.style.animation = 'scaleUpAnimation 0.5s';
          elementDuo.style.animationTimingFunction = 'ease-in-out';
          elementDuo.style.animationFillMode = 'forwards';
          setPresentLettersDuo((prevLetters) => [...prevLetters, currentLetterDuo]);
        } else if (currentLetterDuo !== wordDuoDay[i] && chanceLast === false) {
          elementDuo.className = 'letter_box_incorrect';
          elementDuo.style.animation = 'scaleUpAnimation 0.5s';
          elementDuo.style.animationTimingFunction = 'ease-in-out';
          elementDuo.style.animationFillMode = 'forwards';
          setIncorrectLettersDuo((prevLetters) => [...prevLetters, currentLetterDuo]);
        }
      }
    }
  };

  const removeLetter = () => {
    for (let i = 4; i >= 0; i--) {
      const element = document.getElementById(`letter-${i + currentChance * 5}`);
      const elementDuo = document.getElementById(`letterDuo-${i + currentChance * 5}`);
      if (element.innerHTML !== '' || elementDuo.innerHTML !== '') {
        if (verifyCorrectWord === false) {
          element.innerHTML = '';
          element.className = 'letter_box_selected';
        }
        if (verifyCorrectWordDuo === false) {
          elementDuo.innerHTML = '';
          elementDuo.className = 'letter_box_selected';
        }
        break;
      } else if (element.innerHTML === '' && elementDuo.innerHTML === '') {
        element.className = 'letter_box';
        elementDuo.className = 'letter_box';
        continue;
      }
    }
  };

  return (
    <div className='container_game'>
      <div className='container_dueto'>
        <div className='box_dueto'>
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
          <div className='container_row'>
            <div id='letter-25' className='letter_box'></div>
            <div id='letter-26' className='letter_box'></div>
            <div id='letter-27' className='letter_box'></div>
            <div id='letter-28' className='letter_box'></div>
            <div id='letter-29' className='letter_box'></div>
          </div>
        </div>
        <div className='box_dueto'>
          <div className='container_row'>
            <div id='letterDuo-0' className='letter_box'></div>
            <div id='letterDuo-1' className='letter_box'></div>
            <div id='letterDuo-2' className='letter_box'></div>
            <div id='letterDuo-3' className='letter_box'></div>
            <div id='letterDuo-4' className='letter_box'></div>
          </div>
          <div className='container_row'>
            <div id='letterDuo-5' className='letter_box'></div>
            <div id='letterDuo-6' className='letter_box'></div>
            <div id='letterDuo-7' className='letter_box'></div>
            <div id='letterDuo-8' className='letter_box'></div>
            <div id='letterDuo-9' className='letter_box'></div>
          </div>
          <div className='container_row'>
            <div id='letterDuo-10' className='letter_box'></div>
            <div id='letterDuo-11' className='letter_box'></div>
            <div id='letterDuo-12' className='letter_box'></div>
            <div id='letterDuo-13' className='letter_box'></div>
            <div id='letterDuo-14' className='letter_box'></div>
          </div>
          <div className='container_row'>
            <div id='letterDuo-15' className='letter_box'></div>
            <div id='letterDuo-16' className='letter_box'></div>
            <div id='letterDuo-17' className='letter_box'></div>
            <div id='letterDuo-18' className='letter_box'></div>
            <div id='letterDuo-19' className='letter_box'></div>
          </div>
          <div className='container_row'>
            <div id='letterDuo-20' className='letter_box'></div>
            <div id='letterDuo-21' className='letter_box'></div>
            <div id='letterDuo-22' className='letter_box'></div>
            <div id='letterDuo-23' className='letter_box'></div>
            <div id='letterDuo-24' className='letter_box'></div>
          </div>
          <div className='container_row'>
            <div id='letterDuo-25' className='letter_box'></div>
            <div id='letterDuo-26' className='letter_box'></div>
            <div id='letterDuo-27' className='letter_box'></div>
            <div id='letterDuo-28' className='letter_box'></div>
            <div id='letterDuo-29' className='letter_box'></div>
          </div>
        </div>
      </div>
      <div className='container_keyboard'>
        <Keyboard onLetterClick={handleLetterSelection} onEnterPress={checkWord} foundLetters={foundLetters}
          incorrectLetters={incorrectLetters} presentLetters={presentLetters} foundLettersDuo={foundLettersDuo}
          incorrectLettersDuo={incorrectLettersDuo} presentLettersDuo={presentLettersDuo} gameMode={"Dueto"} />
      </div>
    </div>
  );
}

export default Dueto