import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import selectors from '../selectors';
import UserSchedule from '../components/UserSchedule';

function getCurrentWeekDates() {
  const today = new Date();
  const currentDayOfWeek = today.getDay();
  const startingDate = new Date(today.getTime() - (currentDayOfWeek - 1) * 24 * 60 * 60 * 1000); // Понедельник текущей недели

  const weekDates = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 7; i++) {
    const date = new Date(startingDate.getTime() + i * 24 * 60 * 60 * 1000);
    weekDates.push(date);
  }

  return weekDates;
}

const mapStateToProps = () => {
  // eslint-disable-next-line no-use-before-define
  const datesOfWeek = getCurrentWeekDates();
  const currentUserId = selectors.selectCurrentUserId;
  const cards = selectors.selectCardsByUserId(state, currentUserId);
  const canEdit = true;
  return {
    datesOfWeek,
    cards,
    canEdit,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserSchedule);
