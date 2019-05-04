import moment from 'moment-timezone';

let initialDate = moment().toDate();

const date = (state = initialDate, action) => {
  switch (action.type) {
    case 'CHANGE_DATE':
      return action.date;
    default:
      return state;
  }
};

export default date;
