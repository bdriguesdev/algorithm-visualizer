import React from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';

import './App.scss';
import Header from './components/Header/Header';
import Sort from './components/Sort/Sort';
import Search from './components/Search/Search';

function App() {
  return ( 
    <Router>
      <div className="App">
      
          <Header />
          <Switch >
            <Redirect exact from="/" to="/sort/insertion" />
            {/* SORT ROUTE */}
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
            <Route path='/sort/quick'>
              <Sort sortName="quick" best="n log(n)" average="n log(n)" worst="n²" />
            </Route>
            {/* SEARCH ROUTE */}
            <Route path='/search/breadth'>
              <Search searchName="breadth first" time="v + e" />
            </Route>
            <Route path='/search/depth'>
              <Search searchName="depth first" time="v + e" />
            </Route>
          </Switch>
      </div>
    </Router>
  );
}

export default App;
