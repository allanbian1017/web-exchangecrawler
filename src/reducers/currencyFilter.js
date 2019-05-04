let initialFilter = {
  JPY: true,
  USD: false,
  CNY: false,
  KRW: false,
  EUR: false,
};

const currencyFilter = (state = initialFilter, action) => {
  switch (action.type) {
    case 'SET_CURRENCY_FILTER':
      let filter = {
        JPY: false,
        USD: false,
        CNY: false,
        KRW: false,
        EUR: false,
      };

      filter[action.filter] = true;
      return filter;
    default:
      return state;
  }
};

export default currencyFilter;
