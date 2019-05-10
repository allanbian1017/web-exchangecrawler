import { connect } from 'react-redux';
import moment from 'moment-timezone';
import { setCurrencyFilter, selectDate } from '../actions';
import { CurrencyHistory } from '../components';

const mapStateToProps = state => ({
  minDate: new Date(2017, 8, 21),
  maxDate: new Date(),
  selDate: moment(state.date).toDate(),
  data: state.data,
  visible: state.filter,
});

const mapDispatchToProps = dispatch => ({
  onInit: () => {
    dispatch(selectDate(moment().toDate()));
  },
  onDateSelected: (date) => {
    dispatch(selectDate(date));
  },
  onLabelClick: (label) => {
    dispatch(setCurrencyFilter(label));
  },
});

const HoursContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CurrencyHistory);

export default HoursContainer;
