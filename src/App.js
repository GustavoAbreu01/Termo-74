import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/home/Home';
import Dueto from './pages/dueto/Dueto';
import Termo from './pages/termo/Termo';
import Quarteto from './pages/quarteto/Quarteto';
import Menu from "./components/menu/Menu";
import 'animate.css';

function App() {

  localStorage.setItem('dueto', JSON.stringify([
    { id: 0, word: 'CASA', correct: false, present: false, incorrect: false },
    { id: 1, word: 'CASA', correct: false, present: false, incorrect: false },
    { id: 2, word: 'CASA', correct: false, present: false, incorrect: false },
    { id: 3, word: 'CASA', correct: false, present: false, incorrect: false },
  ]));

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
