/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslation } from 'react-i18next';
import styles from './ScheduleList.module.scss';
import DisabledCardContainer from '../../containers/DisabledCardContainer';

const ScheduleList = React.memo(
  ({ name, cardsForDateIds, taskMap }) => {
    const [t] = useTranslation();
    const [isAddCardOpened, setIsAddCardOpened] = useState(false);

    const listWrapper = useRef(null);

    console.log(taskMap)
    
    const durationOptions = [
      { key: '', value: 0, text: 'без времени' },
      { key: '15m', value: 0.25, text: '15 minutes' },
      { key: '30m', value: 0.5, text: '30 minutes' },
      { key: '45m', value: 0.75, text: '45 minutes' },
      { key: '1h', value: 1, text: '1 hour' },
      { key: '2h', value: 2, text: '2 hours' },
      { key: '3h', value: 3, text: '3 hours' },
      { key: '4h', value: 4, text: '4 hours' },
      { key: '5h', value: 5, text: '5 hours' },
      { key: '6h', value: 6, text: '6 hours' },
      { key: '7h', value: 7, text: '7 hours' },
      { key: '8h', value: 8, text: '8 hours' },
      { key: '9h', value: 9, text: '9 hours' },
      { key: '10h', value: 10, text: '10 hours' },
      { key: '11h', value: 11, text: '11 hours' },
      { key: '12h', value: 12, text: '12 hours' },
    ];

    useEffect(() => {
      if (isAddCardOpened) {
        listWrapper.current.scrollTop = listWrapper.current.scrollHeight;
      }
    }, [cardsForDateIds, isAddCardOpened]);

    const cardsNode = (
      <div className={styles.cards}>
        {cardsForDateIds.map((cardId, cardIndex) => (
          <DisabledCardContainer key={cardId} id={cardId}  />
        ))}
      </div>
    );
    return (
      <div className={styles.innerWrapper}>
        <div className={styles.outerWrapper}>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
                                           jsx-a11y/no-static-element-interactions */}
          <div // eslint-disable-line react/jsx-props-no-spreading
            className={classNames(styles.header)}
          >
              <div className={styles.headerName}>{name}</div>
          </div>
          <div
            ref={listWrapper}
            className={classNames(
              styles.cardsInnerWrapper,
              (isAddCardOpened) && styles.cardsInnerWrapperFull,
            )}
          >
            <div className={styles.cardsOuterWrapper}>{cardsNode}</div>

            <ul className={styles.tasks}>
          {taskMap.map((item) => (
            <li
              key={item.id}
              className={classNames(styles.task, item.isCompleted && styles.taskCompleted)}
            >
               [{item.dueDate} {durationOptions.find(option => option.value === item.duration)?.key}] {item.name}
            </li>
          ))}
        </ul>

          </div>
        </div>
      </div>
    );
  },
);

ScheduleList.propTypes = {
  name: PropTypes.string.isRequired,
  cardsForDateIds: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default ScheduleList;
