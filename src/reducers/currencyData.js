const currencyData = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_DATA':
      return action.data;
    default:
      return state;
  }
};

export default currencyData;
