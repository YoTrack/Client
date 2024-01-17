/* eslint-disable */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import selectors from '../selectors';
import entryActions from '../entry-actions';
import { BoardMembershipRoles } from '../constants/Enums';
import Card from '../components/Card';
import { selectCardsByUserId } from "../selectors/user-schedule";
import DisabledCard from "../components/DisabledCard";

const makeMapStateToProps = () => {
  const selectCardById = selectors.makeSelectCardById();
  const selectUsersByCardId = selectors.makeSelectUsersByCardId();
  const selectLabelsByCardId = selectors.makeSelectLabelsByCardId();
  const selectTasksByCardId = selectors.makeSelectTasksByCardId();

  return (state, {id}) => {
    let {
      name,
      dueDate,
      coverUrl,
      isPersisted,
      duration,
      priority,
    } = selectCardById(state, id);
    const users = selectUsersByCardId(state, id);
    const labels = selectLabelsByCardId(state, id);
    const tasks = selectTasksByCardId(state, id);

    return {
      id,
      name,
      dueDate,
      duration,
      priority,
      coverUrl,
      isPersisted,
      users,
      labels,
      tasks,
    };
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default connect(makeMapStateToProps, mapDispatchToProps)(DisabledCard);