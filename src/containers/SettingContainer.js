import { connect } from 'react-redux';
import { getSubscribeStatus, subscribe, unsubscribe } from '../actions';
import { Setting } from '../components';

const mapStateToProps = state => ({
  isLoading: state.loadSubStatus,
  isSubscribed: state.subStatus,
});

const mapDispatchToProps = dispatch => ({
  onInit: (token) => {
    dispatch(getSubscribeStatus(token));
  },
  onSubscribeClick: (token) => {
    dispatch(subscribe(token));
  },
  onUnsbuscribeClick: (token) => {
    dispatch(unsubscribe(token));
  },
});

const SettingContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Setting);

export default SettingContainer;
