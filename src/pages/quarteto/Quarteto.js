import React, { useEffect, useState } from 'react';
import words from '../../data/new.json';

import Keyboard from '../../components/keyboard/Keyboard';

import './Quarteto.css'
import Swal from 'sweetalert2';

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
  const [chanceLast, setChanceLast] = useState(false);
  const [foundLetters, setFoundLetters] = useState([]);
  const [presentLetters, setPresentLetters] = useState([]);
  const [incorrectLetters, setIncorrectLetters] = useState([]);
  const [foundLettersDuo, setFoundLettersDuo] = useState([]);
  const [presentLettersDuo, setPresentLettersDuo] = useState([]);
  const [incorrectLettersDuo, setIncorrectLettersDuo] = useState([]);
  const [foundLettersTrio, setFoundLettersTrio] = useState([]);
  const [presentLettersTrio, setPresentLettersTrio] = useState([]);
  const [incorrectLettersTrio, setIncorrectLettersTrio] = useState([]);
  const [foundLettersQuart, setFoundLettersQuart] = useState([]);
  const [presentLettersQuart, setPresentLettersQuart] = useState([]);
  const [incorrectLettersQuart, setIncorrectLettersQuart] = useState([]);
  const [registerComplete, setRegisterComplete] = useState(false);
  const [gameWin, setGameWin] = useState(false);

  useEffect(() => {
    if (verifyCorrectWord && verifyCorrectWordDuo && verifyCorrectWordTrio && verifyCorrectWordQuart) {
      setGameWin(true);
      setRegisterComplete(true);
      setChanceLast(true);
      Swal.fire({
        title: 'Palavras Descobertas!',
        text: 'As palavras do dia eram ' + wordDay + ', ' + wordDuoDay + ', ' + wordTrioDay + ' e ' + wordQuartDay + '!',
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
        text: 'As palavras do dia eram ' + wordDay + ', ' + wordDuoDay + ', ' + wordTrioDay + ' e ' + wordQuartDay + '!',
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
  }, [verifyCorrectWord, verifyCorrectWordDuo, verifyCorrectWordTrio, verifyCorrectWordQuart]);

  useEffect(() => {
    if (registerComplete && gameWin) {
      const quarteto = JSON.parse(localStorage.getItem('quarteto'));
      quarteto.status.games++;
      quarteto.status.wins++;
      quarteto.status.streakChance++;
      if (quarteto.status.streakChance > quarteto.status.streak) {
        quarteto.status.streak = quarteto.status.streakChance;
      }
      if (currentChance === 0) {
        quarteto.status.hist[0]++;
      } else if (currentChance === 1) {
        quarteto.status.hist[1]++;
      } else if (currentChance === 2) {
        quarteto.status.hist[2]++;
      } else if (currentChance === 3) {
        quarteto.status.hist[3]++;
      } else if (currentChance === 4) {
        quarteto.status.hist[4]++;
      } else if (currentChance === 5) {
        quarteto.status.hist[5]++;
      } else if (currentChance === 6) {
        quarteto.status.hist[6]++;
      } else if (currentChance === 7) {
        quarteto.status.hist[7]++;
      }
      localStorage.setItem('quarteto', JSON.stringify(quarteto));
    } else if (registerComplete && !gameWin) {
      const quarteto = JSON.parse(localStorage.getItem('quarteto'));
      quarteto.status.games++;
      quarteto.status.streakChance = 0;
      quarteto.status.hist[8]++;
      localStorage.setItem('quarteto', JSON.stringify(quarteto));
    }
  }, [registerComplete]);

  const handleLetterSelection = (index, letter) => {
    if (letter === 'Backspace' && chanceLast === false) {
      removeLetter();
    } else if (letter === 'Enter' && chanceLast === false) {
      checkWord();
    } else if (letter !== 'Backspace' && letter !== 'Enter' && chanceLast === false) {
      for (let i = 0; i < 5; i++) {
        const element = document.getElementById(`letter-${i + currentChance * 5}`);
        const elementDuo = document.getElementById(`letterDuo-${i + currentChance * 5}`);
        const elementTrio = document.getElementById(`letterTrio-${i + currentChance * 5}`);
        const elementQuart = document.getElementById(`letterQuart-${i + currentChance * 5}`);
        if (element.innerHTML === '' && elementDuo.innerHTML === '' && elementTrio.innerHTML === '' && elementQuart.innerHTML === '' && chanceLast === false) {
          if (verifyCorrectWord === false && chanceLast === false) {
            element.innerHTML = letter;
            element.className = 'letter_box_quarteto_selected';
          }
          if (verifyCorrectWordDuo === false && chanceLast === false) {
            elementDuo.innerHTML = letter;
            elementDuo.className = 'letter_box_quarteto_selected';
          }
          if (verifyCorrectWordTrio === false && chanceLast === false) {
            elementTrio.innerHTML = letter;
            elementTrio.className = 'letter_box_quarteto_selected';
          }
          if (verifyCorrectWordQuart === false && chanceLast === false) {
            elementQuart.innerHTML = letter;
            elementQuart.className = 'letter_box_quarteto_selected';
          }
          break;
        } else if (element.innerHTML !== '' && chanceLast === false) {
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

        const elementTrio = document.getElementById(`letterTrio-${i + currentChance * 5}`);
        elementTrio.style.animation = 'errorAnimation 0.7s';
        elementTrio.style.animationTimingFunction = 'ease-in-out';
        elementTrio.style.animationFillMode = 'forwards';
        setTimeout(() => {
          elementTrio.style.animation = '';
          elementTrio.style.animationTimingFunction = '';
          elementTrio.style.animationFillMode = '';
        }, 700);

        const elementQuart = document.getElementById(`letterQuart-${i + currentChance * 5}`);
        elementQuart.style.animation = 'errorAnimation 0.7s';
        elementQuart.style.animationTimingFunction = 'ease-in-out';
        elementQuart.style.animationFillMode = 'forwards';
        setTimeout(() => {
          elementQuart.style.animation = '';
          elementQuart.style.animationTimingFunction = '';
          elementQuart.style.animationFillMode = '';
        }, 700);
      }
    } else if (!words.palavras.includes(word) && !words.palavras.includes(wordDuo) && !words.palavras.includes(wordTrio) && !words.palavras.includes(wordQuart)) {
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

        const elementTrio = document.getElementById(`letterTrio-${i + currentChance * 5}`);
        elementTrio.style.animation = 'errorAnimation 0.7s';
        elementTrio.style.animationTimingFunction = 'ease-in-out';
        elementTrio.style.animationFillMode = 'forwards';
        setTimeout(() => {
          elementTrio.style.animation = '';
          elementTrio.style.animationTimingFunction = '';
          elementTrio.style.animationFillMode = '';
        }, 700);

        const elementQuart = document.getElementById(`letterQuart-${i + currentChance * 5}`);
        elementQuart.style.animation = 'errorAnimation 0.7s';
        elementQuart.style.animationTimingFunction = 'ease-in-out';
        elementQuart.style.animationFillMode = 'forwards';
        setTimeout(() => {
          elementQuart.style.animation = '';
          elementQuart.style.animationTimingFunction = '';
          elementQuart.style.animationFillMode = '';
        }, 700);
      }
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

      if (currentChance === 7) {
        setChanceLast(true);
        setRegisterComplete(true);
        Swal.fire({
          title: 'Você falhou!',
          text: 'As palavras do dia eram ' + wordDay + ', ' + wordDuoDay + ', ' + wordTrioDay + ' e ' + wordQuartDay + '!',
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
      if (!verifyCorrectWord && chanceLast === false) {
        if (currentLetter === wordDay[i] && chanceLast === false) {
          element.className = 'letter_box_quarteto_correct';
          element.style.animation = 'scaleUpAnimation 0.5s';
          element.style.animationTimingFunction = 'ease-in-out';
          element.style.animationFillMode = 'forwards';
          setFoundLetters((prevLetters) => (prevLetters || []).concat(currentLetter));
        } else if (currentLetter !== wordDay[i] && wordDay.includes(currentLetter) && chanceLast === false) {
          element.className = 'letter_box_quarteto_present';
          element.style.animation = 'scaleUpAnimation 0.5s';
          element.style.animationTimingFunction = 'ease-in-out';
          element.style.animationFillMode = 'forwards';
          setPresentLetters((prevLetters) => [...prevLetters, currentLetter]);
        } else if (currentLetter !== wordDay[i] && chanceLast === false) {
          element.className = 'letter_box_quarteto_incorrect';
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
      if (!verifyCorrectWordDuo && chanceLast === false) {
        if (currentLetterDuo === wordDuoDay[i] && chanceLast === false) {
          elementDuo.className = 'letter_box_quarteto_correct';
          elementDuo.style.animation = 'scaleUpAnimation 0.5s';
          elementDuo.style.animationTimingFunction = 'ease-in-out';
          elementDuo.style.animationFillMode = 'forwards';
          setFoundLettersDuo((prevLetters) => (prevLetters || []).concat(currentLetterDuo));
        } else if (currentLetterDuo !== wordDuoDay[i] && wordDuoDay.includes(currentLetterDuo) && chanceLast === false) {
          elementDuo.className = 'letter_box_quarteto_present';
          elementDuo.style.animation = 'scaleUpAnimation 0.5s';
          elementDuo.style.animationTimingFunction = 'ease-in-out';
          elementDuo.style.animationFillMode = 'forwards';
          setPresentLettersDuo((prevLetters) => [...prevLetters, currentLetterDuo]);
        } else if (currentLetterDuo !== wordDuoDay[i] && chanceLast === false) {
          elementDuo.className = 'letter_box_quarteto_incorrect';
          elementDuo.style.animation = 'scaleUpAnimation 0.5s';
          elementDuo.style.animationTimingFunction = 'ease-in-out';
          elementDuo.style.animationFillMode = 'forwards';
          setIncorrectLettersDuo((prevLetters) => [...prevLetters, currentLetterDuo]);
        }
      }
    }

    for (let i = 0; i < 5; i++) {
      const elementTrio = document.getElementById(`letterTrio-${i + currentChance * 5}`);
      const currentLetterTrio = wordTrio[i];
      if (!verifyCorrectWordTrio && chanceLast === false) {
        if (currentLetterTrio === wordTrioDay[i] && chanceLast === false) {
          elementTrio.className = 'letter_box_quarteto_correct';
          elementTrio.style.animation = 'scaleUpAnimation 0.5s';
          elementTrio.style.animationTimingFunction = 'ease-in-out';
          elementTrio.style.animationFillMode = 'forwards';
          setFoundLettersTrio((prevLetters) => (prevLetters || []).concat(currentLetterTrio));
        } else if (currentLetterTrio !== wordTrioDay[i] && wordTrioDay.includes(currentLetterTrio) && chanceLast === false) {
          elementTrio.className = 'letter_box_quarteto_present';
          elementTrio.style.animation = 'scaleUpAnimation 0.5s';
          elementTrio.style.animationTimingFunction = 'ease-in-out';
          elementTrio.style.animationFillMode = 'forwards';
          setPresentLettersTrio((prevLetters) => [...prevLetters, currentLetterTrio]);
        } else if (currentLetterTrio !== wordTrioDay[i] && chanceLast === false) {
          elementTrio.className = 'letter_box_quarteto_incorrect';
          elementTrio.style.animation = 'scaleUpAnimation 0.5s';
          elementTrio.style.animationTimingFunction = 'ease-in-out';
          elementTrio.style.animationFillMode = 'forwards';
          setIncorrectLettersTrio((prevLetters) => [...prevLetters, currentLetterTrio]);
        }
      }
    }

    for (let i = 0; i < 5; i++) {
      const elementQuart = document.getElementById(`letterQuart-${i + currentChance * 5}`);
      const currentLetterQuart = wordQuart[i];
      if (!verifyCorrectWordQuart && chanceLast === false) {
        if (currentLetterQuart === wordQuartDay[i] && chanceLast === false) {
          elementQuart.className = 'letter_box_quarteto_correct';
          elementQuart.style.animation = 'scaleUpAnimation 0.5s';
          elementQuart.style.animationTimingFunction = 'ease-in-out';
          elementQuart.style.animationFillMode = 'forwards';
          setFoundLettersQuart((prevLetters) => (prevLetters || []).concat(currentLetterQuart));
        } else if (currentLetterQuart !== wordQuartDay[i] && wordQuartDay.includes(currentLetterQuart)) {
          elementQuart.className = 'letter_box_quarteto_present';
          elementQuart.style.animation = 'scaleUpAnimation 0.5s';
          elementQuart.style.animationTimingFunction = 'ease-in-out';
          elementQuart.style.animationFillMode = 'forwards';
          setPresentLettersQuart((prevLetters) => [...prevLetters, currentLetterQuart]);
        } else if (currentLetterQuart !== wordQuartDay[i] && chanceLast === false) {
          elementQuart.className = 'letter_box_quarteto_incorrect';
          elementQuart.style.animation = 'scaleUpAnimation 0.5s';
          elementQuart.style.animationTimingFunction = 'ease-in-out';
          elementQuart.style.animationFillMode = 'forwards';
          setIncorrectLettersQuart((prevLetters) => [...prevLetters, currentLetterQuart]);
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
      } else if (element.innerHTML === '' && elementDuo.innerHTML === '' && elementTrio.innerHTML === '' && elementQuart.innerHTML === '' && chanceLast === false) {
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
        <Keyboard onLetterClick={handleLetterSelection} onEnterPress={checkWord} foundLetters={foundLetters}
          incorrectLetters={incorrectLetters} presentLetters={presentLetters} foundLettersDuo={foundLettersDuo}
          incorrectLettersDuo={incorrectLettersDuo} presentLettersDuo={presentLettersDuo} foundLettersTrio={foundLettersTrio}
          incorrectLettersTrio={incorrectLettersTrio} presentLettersTrio={presentLettersTrio} foundLettersQuart={foundLettersQuart}
          incorrectLettersQuart={incorrectLettersQuart} presentLettersQuart={presentLettersQuart} gameMode={"Quarteto"}
        />
      </div>
    </div>
  );
}

export default Quarteto