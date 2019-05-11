import React, { Component } from 'react';
import {
  PropTypes, object, bool, func,
} from 'prop-types';
import {
  Container, Row, Col, Button,
} from 'react-bootstrap';
import moment from 'moment-timezone';
import DatePicker from 'react-datepicker';
import CurrencyChart from './CurrencyChart';

import 'react-datepicker/dist/react-datepicker.css';

class CurrencyHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggleCalendar = this.toggleCalendar.bind(this);
  }

  componentWillMount() {
    const { onInit } = this.props;
    onInit();
  }

  handleChange(date) {
    const { onDateSelected } = this.props;
    onDateSelected(date);
    this.toggleCalendar();
  }

  toggleCalendar() {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  }

  render() {
    const {
      minDate, maxDate, selDate, data, visible, onLabelClick,
    } = this.props;
    const { isOpen } = this.state;
    return (
      <Container>
        <Row>
          <Col xs={12} md={12} lg={12} style={{ textAlign: 'center' }}>
            <Button variant="outline-primary" onClick={this.toggleCalendar}>
              {moment(selDate).format('MM-DD-YYYY')}
            </Button>
            {isOpen && (
              <DatePicker
                selected={selDate}
                onChange={this.handleChange}
                minDate={minDate}
                maxDate={maxDate}
                withPortal
                inline
              />
            )}
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
