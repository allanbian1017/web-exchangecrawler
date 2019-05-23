import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { HoursContainer, DayContainer, SettingContainer } from './containers';

const store = configureStore();

const App = () => (
  <Switch>
    <Route path="/hours" component={HoursContainer} />
    <Route path="/day" component={DayContainer} />
    <Route path="/setting" component={SettingContainer} />
    <Route path="*" component={DayContainer} />
  </Switch>
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app'),
);
