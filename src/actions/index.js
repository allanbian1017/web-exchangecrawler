import moment from 'moment-timezone';
import {CurrencyAPI} from '../api';

export const setCurrencyFilter = (filter) => {
  return {
    type: 'SET_CURRENCY_FILTER',
    filter,
  };
};

function getDatesFromDateToNow(date) {
  let from = moment(date);
  let now = moment();

  let dates = [];
  for (let m = from; m.isBefore(now); m.add(1, 'days')) {
    let day = m.toDate().getDay();
    let isWeekend = day == 6 || day == 0;
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

function fetchRangeHistory(dates) {
  return (dispatch) => {
    return Promise.all(
      dates.map((date) => new CurrencyAPI().getHistoryDataByDate(date))
    ).then((body) => {
      let hist = body
        .filter((x) => x.History.length != 0)
        .map((x) => x.History[x.History.length - 1]);

      let data = {};
      hist.forEach((x) => {
        let date = moment(x.date)
          .tz('Asia/Taipei')
          .format('MM-DD');
        data[date] = x;
      });

      return dispatch(receiveData(data));
    });
  };
}

export const selectStartDate = (date) => {
  return (dispatch) => {
    dispatch(changeDate(date));
    let dates = getDatesFromDateToNow(date);
    return dispatch(fetchRangeHistory(dates));
  };
};

function fetchDayHistory(date) {
  return (dispatch) => {
    return new CurrencyAPI()
      .getHistoryDataByDate(moment(date).format('YYYYMMDD'))
      .then((body) => {
        let data = {};
        body.History.forEach((x) => {
          let date = moment(x.date)
            .tz('Asia/Taipei')
            .format('HH:mm');
          data[date] = x;
        });

        return dispatch(receiveData(data));
      });
  };
}

export const selectDate = (date) => {
  return (dispatch) => {
    dispatch(changeDate(date));
    return dispatch(fetchDayHistory(date));
  };
};

export const receiveData = (data) => {
  return {
    type: 'RECEIVE_DATA',
    data,
  };
};
