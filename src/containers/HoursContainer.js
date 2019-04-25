import React from 'react';
import ReactDOM from 'react-dom';
import {Container, Row, Col} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment-timezone';
import {CurrencyChart} from '../components';
import {CurrencyAPI} from '../api';

import 'react-datepicker/dist/react-datepicker.css';

export default class HoursContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minDate: new Date(2017, 8, 21),
      maxDate: new Date(),
      date: new Date(),
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
  }

  componentDidMount() {
    new CurrencyAPI()
      .getHistoryDataByDate(moment(this.state.date).format('YYYYMMDD'))
      .then((body) => {
        let data = {};

        body.History.forEach((x) => {
          let date = moment(x.date)
            .tz('Asia/Taipei')
            .format('HH:mm');
          data[date] = x;
        });

        console.log(data);
        this.setState({data: data});
      })
      .catch((err) => console.log(err));
  }

  handleChange(date) {
    new CurrencyAPI()
      .getHistoryDataByDate(moment(date).format('YYYYMMDD'))
      .then((body) => {
        let data = {};

        body.History.forEach((x) => {
          let date = moment(x.date)
            .tz('Asia/Taipei')
            .format('HH:mm');
          data[date] = x;
        });

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
