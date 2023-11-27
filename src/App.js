import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/home/Home';
import Dueto from './pages/dueto/Dueto';
import Termo from './pages/termo/Termo';
import Quarteto from './pages/quarteto/Quarteto';
import Menu from "./components/menu/Menu";
import Infinity from "./pages/infinity/Infinity";
import 'animate.css';

function App() {

  useEffect(() => {
    const today = new Date();
    if (!localStorage.getItem('termo')) {
      localStorage.setItem('termo', JSON.stringify({
        status: {
          wins: 0,
          games: 0,
          streak: 0,
          streakChance: 0,
          hist: {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0
          }
        },
        state: {
          curDay: today.getDate() + today.getMonth() * 31,
          wordDay: '',
          curChance: 0,
          result: false,
          lock: false,
          tries: {
            0: ['', '', '', '', ''],
            1: ['', '', '', '', ''],
            2: ['', '', '', '', ''],
            3: ['', '', '', '', ''],
            4: ['', '', '', '', '']
          }
        }
      }));
    }

    if (!localStorage.getItem('dueto')) {
      localStorage.setItem('dueto', JSON.stringify({
        status: {
          wins: 0,
          games: 0,
          streak: 0,
          streakChance: 0,
          hist: {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0
          }
        },
        state: {
          curDay: today.getDate() + today.getMonth() * 31,
          wordDay: '',
          curChance: 0,
          result: false,
          lock: false,
          tries: {
            0: ['', '', '', '', ''],
            1: ['', '', '', '', ''],
            2: ['', '', '', '', ''],
            3: ['', '', '', '', ''],
            4: ['', '', '', '', ''],
            5: ['', '', '', '', '']
          }
        }
      }));
    }

    if (!localStorage.getItem('quarteto')) {
      localStorage.setItem('quarteto', JSON.stringify({
        status: {
          wins: 0,
          games: 0,
          streak: 0,
          streakChance: 0,
          hist: {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0
          }
        },
        state: {
          curDay: today.getDate() + today.getMonth() * 31,
          wordDay: '',
          curChance: 0,
          result: false,
          lock: false,
          tries: {
            0: ['', '', '', '', ''],
            1: ['', '', '', '', ''],
            2: ['', '', '', '', ''],
            3: ['', '', '', '', ''],
            4: ['', '', '', '', ''],
            5: ['', '', '', '', ''],
            6: ['', '', '', '', ''],
            7: ['', '', '', '', '']
          }
        }
      }));
    }
    if (today.getDate() + today.getMonth() * 31 !== JSON.parse(localStorage.getItem('termo')).state.curDay) {
      const termo = JSON.parse(localStorage.getItem('termo'));
      termo.state.curDay = today.getDate() + today.getMonth() * 31;
      termo.state.wordDay = '';
      termo.state.curChance = 0;
      termo.state.result = false;
      termo.state.lock = false;
      for (let i = 0; i < termo.state.tries.length ; i++) {
        termo.state.tries[i] = ['', '', '', '', ''];
      }
      localStorage.setItem('termo', JSON.stringify(termo));
    }
  }, []);

  return (
    <>
      <Menu />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Termo />} />
          <Route path="dueto" element={<Dueto />} />
          <Route path='quarteto' element={<Quarteto />} />
          <Route path='infinito' element={<Infinity />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
