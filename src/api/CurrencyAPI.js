export default class CurrencyAPI {
  constructor() {
    this.endpoint = 'https://api.allanbian.me/currency/history/';
  }

  getHistoryDataByDate = async (date) => {
    const response = await fetch(this.endpoint + date);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };
}
