import React from 'react';
import ReactDOM from 'react-dom';
import {Container, Row, Col} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment-timezone';
import {CurrencyChart} from '../components';
import {CurrencyAPI} from '../api';

import 'react-datepicker/dist/react-datepicker.css';

export default class DayContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minDate: new Date(2017, 8, 21),
      maxDate: new Date(),
      date: moment()
        .subtract(7, 'days')
        .toDate(),
      data: {},
      visible: {
        JPY: true,
        USD: false,
        CNY: false,
        KRW: false,
        EUR: false,
      },
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getDatesFromDateToNow = this.getDatesFromDateToNow.bind(this);
    this.getHistoryDataByDates = this.getHistoryDataByDates.bind(this);
  }

  getDatesFromDateToNow(date) {
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

  getHistoryDataByDates(dates) {
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

      return Promise.resolve(data);
    });
  }

  componentDidMount() {
    let dates = this.getDatesFromDateToNow(
      moment(this.state.date).format('YYYYMMDD')
    );

    this.getHistoryDataByDates(dates)
      .then((data) => {
        console.log(data);
        this.setState({data: data});
      })
      .catch((err) => console.log(err));
  }

  handleChange(date) {
    let dates = this.getDatesFromDateToNow(moment(date).format('YYYYMMDD'));

    this.getHistoryDataByDates(dates)
      .then((data) => {
        console.log(data);
        this.setState({date: date, data: data});
      })
      .catch((err) => console.log(err));
  }

  handleClick(e) {
    let visible = {
      JPY: false,
      USD: false,
      CNY: false,
      KRW: false,
      EUR: false,
    };
    visible[e.label] = true;
    this.setState({visible: visible});
  }

  render() {
    return (
      <Container>
        <Row>
          <Col xs={12} style={{textAlign: 'center'}}>
            <DatePicker
              minDate={this.state.minDate}
              maxDate={this.state.maxDate}
              selected={this.state.date}
              onChange={this.handleChange}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <CurrencyChart
              data={this.state.data}
              visible={this.state.visible}
              onClick={this.handleClick}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}
