let lineChart = new Chart(document.getElementById('line-chart'), {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'JPY',
        borderColor: '#3e95cd',
        fill: false,
        hidden: false,
      },
      {
        data: [],
        label: 'USD',
        borderColor: '#3ecd6d',
        fill: false,
        hidden: true,
      },
      {
        data: [],
        label: 'CNY',
        borderColor: '#cd3e3e',
        fill: false,
        hidden: true,
      },
      {
        data: [],
        label: 'KRW',
        borderColor: '#553ecd',
        fill: false,
        hidden: true,
      },
      {
        data: [],
        label: 'EUR',
        borderColor: '#21c3ef',
        fill: false,
        hidden: true,
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
    legend: {
      onClick: (evt, item) => {
        let ci = this.chart;
        ci.data.datasets.forEach((x) => {
          if (x.label === item.text) {
            x.hidden = false;
          } else {
            x.hidden = true;
          }
        });
        ci.update();
      },
      display: true,
    },
  },
});

function cleanData(chart) {
  chart.data.labels = [];
  chart.data.datasets.forEach((dataset) => {
    dataset.data = [];
  });
  chart.update();
}

function addLabel(chart, label) {
  chart.data.labels.push(label);
}

function addData(chart, data, type) {
  chart.data.datasets.forEach((dataset) => {
    if (dataset.label === type) {
      dataset.data.push(data);
    }
  });
  chart.update();
}

let endpoint = 'https://api.allanbian.me/currency/history/';
function fetchMultipleHistory(dates) {
  Promise.all(
    dates.map((date) =>
      fetch(endpoint + date, {method: 'GET'}).then((response) =>
        response.json()
      )
    )
  )
    .then((data) => {
      cleanData(lineChart);
      let hist = data
        .filter((x) => x.History.length != 0)
        .map((x) => x.History[x.History.length - 1]);

      hist.forEach((x) => {
        let date = moment(x.date)
          .tz('Asia/Taipei')
          .format('MM-DD');
        addLabel(lineChart, date);

        ['JPY', 'USD', 'CNY', 'KRW', 'EUR'].forEach((type) => {
          addData(lineChart, x[type], type);
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

function fetchHistory(date) {
  let url = endpoint + date;
  fetch(url, {method: 'GET'})
    .then((response) => response.json())
    .then((response) => {
      cleanData(lineChart);
      response.History.forEach((x) => {
        let date = moment(x.date)
          .tz('Asia/Taipei')
          .format('HH:mm');
        addLabel(lineChart, date);

        ['JPY', 'USD', 'CNY', 'KRW', 'EUR'].forEach((type) => {
          addData(lineChart, x[type], type);
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

document.addEventListener('DOMContentLoaded', (event) => {
  if (window.location.pathname === '/hours') {
    let datePicker = new Pikaday({
      field: document.getElementById('date-picker'),
      minDate: new Date(2017, 8, 21),
      maxDate: new Date(),
      onSelect: (date) => {
        fetchHistory(moment(date).format('YYYYMMDD'));
      },
    });

    datePicker.setDate(moment().format('YYYY-MM-DD'));
  } else {
    let datePicker = new Pikaday({
      field: document.getElementById('date-picker'),
      minDate: new Date(2017, 8, 21),
      maxDate: new Date(),
      onSelect: (date) => {
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

        fetchMultipleHistory(dates);
      },
    });
    datePicker.setDate(
      moment()
        .subtract(7, 'days')
        .format('YYYY-MM-DD')
    );
  }
});
