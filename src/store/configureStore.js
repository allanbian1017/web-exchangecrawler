import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

export default function configureStore() {
  const logger = createLogger();
  return createStore(rootReducer, applyMiddleware(thunk, logger));
}
