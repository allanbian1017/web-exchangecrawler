import { combineReducers } from 'redux';
import date from './date';
import currencyData from './currencyData';
import currencyFilter from './currencyFilter';

const rootReducer = combineReducers({
  date,
  filter: currencyFilter,
  data: currencyData,
});

export default rootReducer;
