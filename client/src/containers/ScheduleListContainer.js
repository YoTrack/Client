/* eslint-disable */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ScheduleList from "../components/ScheduleList";
import selectors from "../selectors";


const weekDays = ["Вс","Пн","Вт","Ср","Чт","Пт","Сб"]

const selectTasksByCardId = selectors.makeSelectTasksByCardId();

const makeMapStateToProps = () => {
  return (state, { date, userCards}) => {
    const cardsForDateIds = userCards
      .filter((card) => card.dueDate!==null && card.dueDate.toLocaleDateString() === date.toLocaleDateString() )
      .map((card) => card.id)
    const cardsMap = userCards.map((card)=>card.id)
      var taskers=[]
      for (var cardId of cardsMap){
        taskers.push(selectTasksByCardId(state, cardId));
  }
  taskers = [].concat(...taskers)
  for (var ta of taskers){
    if (ta.dueDate!=null && ta.dueDate.includes("-")){
      let parts = ta.dueDate.slice(0, 10).split("-"); // Разбиваем строку на массив с помощью "-"
      ta.dueDate = parts[2] + "." + parts[1] + "." + parts[0]; // Форматируем дату
      console.log(ta.dueDate)
    }
  }
  const taskMap = taskers.filter((tasker) => tasker.dueDate!==null && tasker.dueDate === date.toLocaleDateString());
    const name = date.toLocaleDateString() + ', ' + weekDays[date.getDay()]
    console.log(name)
    return {
      name,
      cardsForDateIds,
      taskMap,
    };
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(makeMapStateToProps, mapDispatchToProps)(ScheduleList);