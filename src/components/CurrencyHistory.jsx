import React, { Component } from 'react';
import {
  PropTypes, object, bool, func,
} from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import CurrencyChart from './CurrencyChart';

import 'react-datepicker/dist/react-datepicker.css';

class CurrencyHistory extends Component {
  componentWillMount() {
    const { onInit } = this.props;
    onInit();
  }

  render() {
    const {
      minDate, maxDate, selDate, data, visible, onDateSelected, onLabelClick,
    } = this.props;
    return (
      <Container>
        <Row>
          <Col xs={12} md={12} lg={12} style={{ textAlign: 'center' }}>
            <DatePicker
              minDate={minDate}
              maxDate={maxDate}
              selected={selDate}
              onChange={date => onDateSelected(date)}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12} lg={12}>
            <CurrencyChart data={data} visible={visible} onClick={e => onLabelClick(e.label)} />
          </Col>
        </Row>
      </Container>
    );
  }
}

CurrencyHistory.propTypes = {
  minDate: PropTypes.instanceOf(Date).isRequired,
  maxDate: PropTypes.instanceOf(Date).isRequired,
  selDate: PropTypes.instanceOf(Date).isRequired,
  data: object.isRequired,
  visible: PropTypes.shape({
    JPY: bool.isRequired,
    USD: bool.isRequired,
    CNY: bool.isRequired,
    KRW: bool.isRequired,
    EUR: bool.isRequired,
  }).isRequired,
  onDateSelected: func.isRequired,
  onLabelClick: func.isRequired,
  onInit: func.isRequired,
};

export default CurrencyHistory;
