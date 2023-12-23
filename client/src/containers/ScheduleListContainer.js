/* eslint-disable */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ScheduleList from "../components/ScheduleList";
import selectors from "../selectors";

const weekDays = ["Вс","Пн","Вт","Ср","Чт","Пт","Сб"]

const makeMapStateToProps = () => {
  return (state, { date, userCards}) => {
    const cardsForDateIds = userCards
      .filter((card) => card.dueDate!==null && card.dueDate.toLocaleDateString() === date.toLocaleDateString() )
      .map((card) => card.id)
    console.log(cardsForDateIds)
    const name = date.toLocaleDateString() + ', ' + weekDays[date.getDay()]
    console.log(name)
    return {
      name,
      cardsForDateIds,
    };
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(makeMapStateToProps, mapDispatchToProps)(ScheduleList);