import React, { useEffect } from 'react'
import './Keyboard.css'

import { AiOutlineEnter } from 'react-icons/ai'
import { BsBackspace } from 'react-icons/bs'

function Keyboard({ onLetterClick, onEnterPress }) {

  const [letters, setLetters] = React.useState(['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a',
    's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v',
    'b', 'n', 'm']);

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
            handleKey(event.key);
          }
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [letters, onEnterPress]);


  return (
    <div className='keyboard_container'>
      <div className='keyboard_line'>
        <button onClick={() => handleKey('q')} className='key key_button'>q</button>
        <button onClick={() => handleKey('w')} className='key key_button'>w</button>
        <button onClick={() => handleKey('e')} className='key key_button'>e</button>
        <button onClick={() => handleKey('r')} className='key key_button'>r</button>
        <button onClick={() => handleKey('t')} className='key key_button'>t</button>
        <button onClick={() => handleKey('y')} className='key key_button'>y</button>
        <button onClick={() => handleKey('u')} className='key key_button'>u</button>
        <button onClick={() => handleKey('i')} className='key key_button'>i</button>
        <button onClick={() => handleKey('o')} className='key key_button'>o</button>
        <button onClick={() => handleKey('p')} className='key key_button'>p</button>
      </div>
      <div className='keyboard_line'>
        <button onClick={() => handleKey('a')} className='key key_button'>a</button>
        <button onClick={() => handleKey('s')} className='key key_button'>s</button>
        <button onClick={() => handleKey('d')} className='key key_button'>d</button>
        <button onClick={() => handleKey('f')} className='key key_button'>f</button>
        <button onClick={() => handleKey('g')} className='key key_button'>g</button>
        <button onClick={() => handleKey('h')} className='key key_button'>h</button>
        <button onClick={() => handleKey('j')} className='key key_button'>j</button>
        <button onClick={() => handleKey('k')} className='key key_button'>k</button>
        <button onClick={() => handleKey('l')} className='key key_button'>l</button>
        <button onClick={() => handleKey('Backspace')} className='key key_back'><BsBackspace /></button>
      </div>
      <div className='keyboard_line'>
        <button onClick={() => handleKey('z')} className='key key_button'>z</button>
        <button onClick={() => handleKey('x')} className='key key_button'>x</button>
        <button onClick={() => handleKey('c')} className='key key_button'>c</button>
        <button onClick={() => handleKey('v')} className='key key_button'>v</button>
        <button onClick={() => handleKey('b')} className='key key_button'>b</button>
        <button onClick={() => handleKey('n')} className='key key_button'>n</button>
        <button onClick={() => handleKey('m')} className='key key_button'>m</button>
        <button onClick={() => handleKey('Enter')} className='key key_enter'><AiOutlineEnter /></button>
      </div>
    </div>
  )
}

export default Keyboard