import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {HoursContainer, DayContainer} from './containers';

const App = () => (
  <Switch>
    <Route path="/hours" component={HoursContainer} />
    <Route path="/day" component={DayContainer} />
    <Route path="*" component={DayContainer} />
  </Switch>
);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app')
);
