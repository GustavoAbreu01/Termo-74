import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/home/Home';
import Dueto from './pages/dueto/Dueto';
import Termo from './pages/termo/Termo';
import Quarteto from './pages/quarteto/Quarteto';
import Menu from "./components/menu/Menu";
import 'animate.css';

function App() {

  useEffect(() => {
    if (!localStorage.getItem('termo')) {
      localStorage.setItem('termo', JSON.stringify({
        status: {
          wins: 27,
          games: 29,
          streak: 7,
          streakChance: 0,
          hist: {
            0: 10,
            1: 15,
            2: 4,
            3: 0,
            4: 0,
          }
        }
      }));
    }

    if (!localStorage.getItem('dueto')) {
      localStorage.setItem('dueto', JSON.stringify({
        status: {
          wins: 52,
          games: 60,
          streak: 10,
          streakChance: 0,
          hist: {
            0: 5,
            1: 10,
            2: 20,
            3: 5,
            4: 15,
            5: 15
          }
        }
      }));
    }

    if (!localStorage.getItem('quarteto')) {
      localStorage.setItem('quarteto', JSON.stringify({
        status: {
          wins: 23,
          games: 15,
          streak:7,
          streakChance: 0,
          hist: {
            0: 4,
            1: 3,
            2: 1,
            3: 8,
            4: 7,
            5: 6,
            6: 3,
            7: 4
          }
        }
      }));
    }
  }, []);

  return (
    <>
      <Menu />
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/" element={<Termo />} />
          <Route path="dueto" element={<Dueto />} />
          <Route path='quarteto' element={<Quarteto />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
