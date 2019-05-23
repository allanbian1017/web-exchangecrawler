export default class CurrencyAPI {
  constructor() {
    this.endpoint = 'https://api.allanbian.me/currency/';
  }

  getHistoryDataByDate = async (date) => {
    const response = await fetch(this.endpoint + 'history/' + date);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  getUserSubscription = async (token) => {
    const response = await fetch(this.endpoint + 'line/subscription', {
      headers: {
        Authorization: token,
      },
      method: 'GET',
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  subscribe = async (token) => {
    const response = await fetch(this.endpoint + 'line/subscription', {
      headers: {
        Authorization: token,
      },
      method: 'POST',
      body: JSON.stringify({
        action: 1,
      }),
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  unsubscribe = async (token) => {
    const response = await fetch(this.endpoint + 'line/subscription', {
      headers: {
        Authorization: token,
      },
      method: 'POST',
      body: JSON.stringify({
        action: 0,
      }),
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };
}
