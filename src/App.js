import React from 'react';
import './App.css';

import Home from './pages/Home';
import Rooms from './pages/Rooms';
import SingleRoom from './pages/SingleRoom';
import Error from './pages/Error';

import { Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Navbar/>
      {/* LEARN: the Switch component allows us to render the error page */}
      <Switch>
        {/* LEARN: if you don't have the 'exact' attribute, /rooms/ will also render the Home component because it includes '/' */}
        <Route exact path="/" component={Home}/>
        <Route exact path="/rooms/" component={Rooms}/>
        {/* LEARN: ':slug' is the 'url parameters' */}
        <Route exact path="/rooms/:slug" component={SingleRoom}/>
        {/* LEARN: without the Switch component, the Error component would show up in each and every route */}
        <Route component={Error}/>
      </Switch>
    </>
  );
}

export default App;
