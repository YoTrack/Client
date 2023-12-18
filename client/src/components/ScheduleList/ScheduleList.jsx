import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import CardContainer from '../../containers/CardContainer';

import styles from './ScheduleList.module.scss';

const ScheduleList = React.memo(({ index, name, cardsForDate, canEdit }) => {
  const [t] = useTranslation();
  const [isAddCardOpened, _] = useState(false);

  const nameEdit = useRef(null);
  const listWrapper = useRef(null);

  const cardsNode = (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div className={styles.cards}>
      {cardsForDate.map((card, cardIndex) => (
        <CardContainer key={card.id} id={card.id} index={cardIndex} canEdit={canEdit} />
      ))}
    </div>
  );

  return (
    <Draggable draggableId={`schedule-list:${name}`} index={index} isDragDisabled>
      <div className={styles.innerWrapper}>
        <div className={styles.outerWrapper}>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
                                           jsx-a11y/no-static-element-interactions */}
          <div className={classNames(styles.header, canEdit && styles.headerEditable)}>
            <div className={styles.headerName}>{name}</div>
          </div>
          <div
            ref={listWrapper}
            className={classNames(
              styles.cardsInnerWrapper,
              (isAddCardOpened || !canEdit) && styles.cardsInnerWrapperFull,
            )}
          >
            <div className={styles.cardsOuterWrapper}>{cardsNode}</div>
          </div>
        </div>
      </div>
    </Draggable>
  );
});

ScheduleList.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  cardsForDate: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  canEdit: PropTypes.bool.isRequired,
};

export default ScheduleList;
