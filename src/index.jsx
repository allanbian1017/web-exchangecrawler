import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import TagManager from 'react-gtm-module';
import configureStore from './store/configureStore';
import { HoursContainer, DayContainer, SettingContainer } from './containers';

const tagManagerArgs = {
  gtmId: 'GTM-MGT88WX',
};

TagManager.initialize(tagManagerArgs);

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
