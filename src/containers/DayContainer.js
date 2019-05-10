import { connect } from 'react-redux';
import moment from 'moment-timezone';
import { setCurrencyFilter, selectStartDate } from '../actions';
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
    dispatch(
      selectStartDate(
        moment()
          .subtract(7, 'days')
          .toDate(),
      ),
    );
  },
  onDateSelected: (date) => {
    dispatch(selectStartDate(date));
  },
  onLabelClick: (label) => {
    dispatch(setCurrencyFilter(label));
  },
});

const DayContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CurrencyHistory);

export default DayContainer;
