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
          </Switch>
      </div>
    </Router>
  );
}

export default App;
