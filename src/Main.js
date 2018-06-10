import React from 'react';

import { HashRouter, Switch, Route } from 'react-router-dom';
import Home from './Home';
import Board from './Board';

export const Main = () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/board/:hash" component={Board} />
    </Switch>
  </HashRouter>
);
