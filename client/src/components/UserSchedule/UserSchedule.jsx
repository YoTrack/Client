import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { closePopup } from '../../lib/popup';

import DroppableTypes from '../../constants/DroppableTypes';
import ListContainer from '../../containers/ListContainer';
import CardModalContainer from '../../containers/CardModalContainer';

import styles from './UserSchedule.module.scss';

// const parseDndId = (dndId) => dndId.split(':')[1];

const UserSchedule = React.memo(({ taskLists, onMove }) => {

});

UserSchedule.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  taskLists: PropTypes.array.isRequired,
  onMove: PropTypes.func.isRequired,
};

export default UserSchedule;
