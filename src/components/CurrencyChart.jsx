import React from 'react';
import {
  PropTypes, object, bool, func,
} from 'prop-types';
import { Line } from 'react-chartjs-2';

const CurrencyChart = ({ data, visible, onClick }) => (
  <Line
    data={{
      labels: Object.keys(data),
      datasets: [
        {
          data: Object.keys(data).map(k => data[k].JPY),
          label: 'JPY',
          borderColor: '#3e95cd',
          fill: false,
          hidden: !visible.JPY,
        },
        {
          data: Object.keys(data).map(k => data[k].USD),
          label: 'USD',
          borderColor: '#3ecd6d',
          fill: false,
          hidden: !visible.USD,
        },
        {
          data: Object.keys(data).map(k => data[k].CNY),
          label: 'CNY',
          borderColor: '#cd3e3e',
          fill: false,
          hidden: !visible.CNY,
        },
        {
          data: Object.keys(data).map(k => data[k].KRW),
          label: 'KRW',
          borderColor: '#553ecd',
          fill: false,
          hidden: !visible.KRW,
        },
        {
          data: Object.keys(data).map(k => data[k].EUR),
          label: 'EUR',
          borderColor: '#21c3ef',
          fill: false,
          hidden: !visible.EUR,
        },
      ],
    }}
    options={{
      responsive: true,
      aspectRatio: 1.4,
      maintainAspectRatio: true,
    }}
    legend={{
      labels: {
        boxWidth: 60,
        fontSize: 18,
      },
      position: 'bottom',
      onClick: (e, item) => onClick({ label: item.text }),
    }}
  />
);

CurrencyChart.propTypes = {
  data: object.isRequired,

  visible: PropTypes.shape({
    JPY: bool.isRequired,
    USD: bool.isRequired,
    CNY: bool.isRequired,
    KRW: bool.isRequired,
    EUR: bool.isRequired,
  }).isRequired,
  onClick: func.isRequired,
};

export default CurrencyChart;
