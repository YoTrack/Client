/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslation } from 'react-i18next';
import styles from './ScheduleList.module.scss';
import DisabledCardContainer from '../../containers/DisabledCardContainer';

const ScheduleList = React.memo(
  ({ name, cardsForDateIds }) => {
    const [t] = useTranslation();
    const [isAddCardOpened, setIsAddCardOpened] = useState(false);

    const listWrapper = useRef(null);


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
