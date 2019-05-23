import { combineReducers } from 'redux';
import date from './date';
import currencyData from './currencyData';
import currencyFilter from './currencyFilter';
import subStatus from './subStatus';
import loadSubStatus from './loadSubStatus';

const rootReducer = combineReducers({
  date,
  filter: currencyFilter,
  data: currencyData,
  subStatus: subStatus,
  loadSubStatus: loadSubStatus,
});

export default rootReducer;
