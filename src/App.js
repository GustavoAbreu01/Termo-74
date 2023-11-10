import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/home/Home';
import Dueto from './pages/dueto/Dueto';
import Termo from './pages/termo/Termo';
import Quarteto from './pages/quarteto/Quarteto';
import Menu from "./components/menu/Menu";

function App() {
  return (
    <>
      <Menu />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="dueto" element={<Dueto />} />
          <Route path="termo" element={<Termo />} />
          <Route path='quarteto' element={<Quarteto />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
