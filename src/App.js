import React from 'react';

import './App.css';
import Header from './components/Header/Header';
import Sort from './components/Sort/Sort';

function App() {
  return (
    <div className="App">
      <Header />
      <Sort sortName="Insertion" best="n" average="n²" worst="n²" />
    </div>
  );
}

export default App;
