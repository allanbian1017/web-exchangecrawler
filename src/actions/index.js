import moment from 'moment-timezone';
import { CurrencyAPI } from '../api';

export const setCurrencyFilter = filter => ({
  type: 'SET_CURRENCY_FILTER',
  filter,
});

function getDatesFromDateToNow(date) {
  const from = moment(date);
  const now = moment();

  const dates = [];
  for (let m = from; m.isBefore(now); m.add(1, 'days')) {
    const day = m.toDate().getDay();
    const isWeekend = day === 6 || day === 0;
    if (isWeekend === false) {
      dates.push(m.format('YYYYMMDD'));
    }
  }

  return dates;
}

function changeDate(date) {
  return {
    type: 'CHANGE_DATE',
    date,
  };
}

export const receiveData = data => ({
  type: 'RECEIVE_DATA',
  data,
});

function fetchRangeHistory(dates) {
  const api = new CurrencyAPI();
  return dispatch => Promise.all(dates.map(date => api.getHistoryDataByDate(date))).then((body) => {
    const hist = body
      .filter(x => x.History.length !== 0)
      .map(x => x.History[x.History.length - 1]);

    const data = {};
    hist.forEach((x) => {
      const date = moment(x.date)
        .tz('Asia/Taipei')
        .format('MM-DD');
      data[date] = x;
    });

    return dispatch(receiveData(data));
  });
}

export const selectStartDate = date => (dispatch) => {
  dispatch(changeDate(date));
  const dates = getDatesFromDateToNow(date);
  return dispatch(fetchRangeHistory(dates));
};

function fetchDayHistory(date) {
  const api = new CurrencyAPI();
  return dispatch => api.getHistoryDataByDate(moment(date).format('YYYYMMDD')).then((body) => {
    const data = {};
    body.History.forEach((x) => {
      const histDate = moment(x.date)
        .tz('Asia/Taipei')
        .format('HH:mm');
      data[histDate] = x;
    });

    return dispatch(receiveData(data));
  });
}

export const selectDate = date => (dispatch) => {
  dispatch(changeDate(date));
  return dispatch(fetchDayHistory(date));
};
