import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/home/Home';
import Dueto from './pages/dueto/Dueto';
import Termo from './pages/termo/Termo';
import Quarteto from './pages/quarteto/Quarteto';
import Menu from "./components/menu/Menu";
import 'animate.css';

function App() {

  localStorage.setItem('termo', JSON.stringify({
    status: {
      wins: 0,
      games: 0,
      streak: 0,
      hist: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
      }
    }
  }));

  localStorage.setItem('dueto', JSON.stringify({
    status: {
      wins: 0,
      games: 0,
      streak: 0,
      hist: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
      }
    }
  }));

  localStorage.setItem('quarteto', JSON.stringify({
    status: {
      wins: 0,
      games: 0,
      streak: 0,
      hist: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
      }
    }
  }));

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
