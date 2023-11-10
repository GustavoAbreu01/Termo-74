import React, { useEffect } from 'react';
import words from '../../data/words.json';

import './Termo.css';

function Termo() {
  const [termo, setTermo] = React.useState('');
  const [letras, setLetras] = React.useState(Array.from({ length: 5 }, (_, index) => index + 1));
  const [chances, setChances] = React.useState(Array.from({ length: 5 }, (_, index) => index + 1));
  const [inputValues, setInputValues] = React.useState(Array.from({ length: 5 }, () => ''));
  const [currentChance, setCurrentChance] = React.useState(0);

  const getWord = () => {
    const index = Math.floor(Math.random() * 1000);
    setTermo(words.palavras[index]);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      validateInputs();
    }
  };


  useEffect(() => {
    getWord();
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleInputChange = (chanceIndex, letraIndex, value) => {
    const newInputValues = [...inputValues];
    newInputValues[chanceIndex * letras.length + letraIndex] = value;
    setInputValues(newInputValues);
  };

  const validateInputs = () => {
    handleNextChance();
  };

  const handleNextChance = () => {
    setCurrentChance((prevChance) => {
      if (prevChance < chances.length - 1) {
        return prevChance + 1;
      }
      return prevChance;
    });
  };

  return (
    <div className='container_termo'>
      <div>
        {chances.map((chance, chanceIndex) => (
          <div key={chanceIndex} className={`box_chances ${chanceIndex === currentChance ? 'current-chance' : ''}`}>
            {letras.map((letra, letraIndex) => (
              <div key={letraIndex} className='box_letras'>
                <div className='box_letter_detail'>
                  <input
                    maxLength={1}
                    type='text'
                    className={`box_letter_input ${chanceIndex === currentChance ? 'future-chance' : ''}`}
                    value={inputValues[chanceIndex * letras.length + letraIndex]}
                    onChange={(e) => handleInputChange(chanceIndex, letraIndex, e.target.value)}
                    disabled={chanceIndex !== currentChance}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Termo;
