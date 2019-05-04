import React, {Component} from 'react';
import {PropTypes, object, func} from 'prop-types';
import {Container, Row, Col} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import CurrencyChart from './CurrencyChart';

import 'react-datepicker/dist/react-datepicker.css';

class CurrencyHistory extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.onInit();
  }

  render() {
    let props = this.props;
    return (
      <Container>
        <Row>
          <Col xs={12} style={{textAlign: 'center'}}>
            <DatePicker
              minDate={props.minDate}
              maxDate={props.maxDate}
              selected={props.selDate}
              onChange={(date) => props.onDateSelected(date)}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <CurrencyChart
              data={props.data}
              visible={props.visible}
              onClick={(e) => props.onLabelClick(e.label)}
            />
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
  visible: object.isRequired,
  onDateSelected: func.isRequired,
  onLabelClick: func.isRequired,
  onInit: func.isRequired,
};

export default CurrencyHistory;
