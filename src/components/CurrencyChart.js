import React from 'react';
import {object, func} from 'prop-types';
import {Line} from 'react-chartjs-2';

const CurrencyChart = (props) => (
  <Line
    data={{
      labels: Object.keys(props.data),
      datasets: [
        {
          data: Object.keys(props.data).map((k) => props.data[k].JPY),
          label: 'JPY',
          borderColor: '#3e95cd',
          fill: false,
          hidden: !props.visible.JPY,
        },
        {
          data: Object.keys(props.data).map((k) => props.data[k].USD),
          label: 'USD',
          borderColor: '#3ecd6d',
          fill: false,
          hidden: !props.visible.USD,
        },
        {
          data: Object.keys(props.data).map((k) => props.data[k].CNY),
          label: 'CNY',
          borderColor: '#cd3e3e',
          fill: false,
          hidden: !props.visible.CNY,
        },
        {
          data: Object.keys(props.data).map((k) => props.data[k].KRW),
          label: 'KRW',
          borderColor: '#553ecd',
          fill: false,
          hidden: !props.visible.KRW,
        },
        {
          data: Object.keys(props.data).map((k) => props.data[k].EUR),
          label: 'EUR',
          borderColor: '#21c3ef',
          fill: false,
          hidden: !props.visible.EUR,
        },
      ],
    }}
    width={700}
    height={500}
    options={{
      maintainAspectRatio: false,
    }}
    legend={{
      onClick: (e, item) => props.onClick({label: item.text}),
    }}
  />
);

CurrencyChart.propTypes = {
  data: object.isRequired,
  visible: object.isRequired,
  onClick: func.isRequired,
};

export default CurrencyChart;
