/* eslint-disable */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import selectors from '../selectors';
import ScheduleList from "../components/ScheduleList";

const makeMapStateToProps = () => {
  const selectCardsByUserId = selectors.makeSelectCardsByUserId()
  return (state, { date, currentUserId, index }) => {
    const cards = selectCardsByUserId(state, currentUserId);
    console.log(cards)
    const cardsForDate = cards.filter((card) => card.dueDate!==null && card.dueDate.toLocaleDateString() === date )
    const name = date
    return {
      index,
      name,
      cardsForDate,
      canEdit: false,
    };
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(makeMapStateToProps, mapDispatchToProps)(ScheduleList);