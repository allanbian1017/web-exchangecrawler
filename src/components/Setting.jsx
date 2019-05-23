import React from 'react';
import { bool, func } from 'prop-types';
import {
  Container, Row, Col, Button,
} from 'react-bootstrap';

const { liff } = window;

class Setting extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: '',
    };
    this.initialize = this.initialize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('load', this.initialize);
  }

  initialize() {
    const { onInit } = this.props;
    liff.init(() => {
      const token = liff.getAccessToken();
      this.setState({
        token,
      });
      onInit(token);
    });
  }

  render() {
    const {
      isLoading, isSubscribed, onUnsbuscribeClick, onSubscribeClick,
    } = this.props;
    const { token } = this.state;

    let buttonText = '載入中';
    if (!isLoading) {
      if (isSubscribed) {
        buttonText = '取消訂閱';
      } else {
        buttonText = '訂閱';
      }
    }
    return (
      <Container>
        <Row>
          <Col xs={12} md={12} lg={12} style={{ textAlign: 'center' }}>
            <Button
              variant="outline-primary"
              disabled={isLoading}
              onClick={() => {
                if (isSubscribed) {
                  onUnsbuscribeClick(token);
                } else {
                  onSubscribeClick(token);
                }
              }}
              block
            >
              {buttonText}
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

Setting.propTypes = {
  isLoading: bool.isRequired,
  isSubscribed: bool.isRequired,
  onInit: func.isRequired,
  onSubscribeClick: func.isRequired,
  onUnsbuscribeClick: func.isRequired,
};

export default Setting;
