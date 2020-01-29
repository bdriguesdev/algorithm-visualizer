import React from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';

import './App.css';
import Header from './components/Header/Header';
import Sort from './components/Sort/Sort';

function App() {
  return ( 
    <Router>
      <div className="App">
      
          <Header />
          <Switch >
            <Redirect exact from="/" to="/sort/insertion" />
            <Route path='/sort/insertion'>
              <Sort sortName="insertion" best="n" average="n²" worst="n²" />
            </Route>
            <Route path='/sort/bubble'>
              <Sort sortName="bubble" best="n" average="n²" worst="n²" />
            </Route>
            <Route path='/sort/selection'>
              <Sort sortName="selection" best="n²" average="n²" worst="n²" />
            </Route>
            <Route path='/sort/heap'>
              <Sort sortName="heap" best="n log(n)" average="n log(n)" worst="n log(n)" />
            </Route>
            <Route path='/sort/merge'>
              <Sort sortName="merge" best="n log(n)" average="n log(n)" worst="n log(n)" />
            </Route>
          </Switch>
      </div>
    </Router>
  );
}

export default App;
