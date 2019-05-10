const initialFilter = {
  JPY: true,
  USD: false,
  CNY: false,
  KRW: false,
  EUR: false,
};

const currencyFilter = (state = initialFilter, action) => {
  const filter = {
    JPY: false,
    USD: false,
    CNY: false,
    KRW: false,
    EUR: false,
  };

  switch (action.type) {
    case 'SET_CURRENCY_FILTER':
      filter[action.filter] = true;
      return filter;
    default:
      return state;
  }
};

export default currencyFilter;
