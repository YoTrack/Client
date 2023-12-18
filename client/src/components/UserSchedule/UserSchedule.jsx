import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import styles from './UserSchedule.module.scss';
import ScheduleListContainer from '../../containers/ScheduleListContainer';

const UserSchedule = React.memo(({ currentUserId, datesOfWeek, canEdit }) => {
  const wrapper = useRef(null);
  const prevPosition = useRef(null);

  const handleMouseDown = useCallback(
    (event) => {
      // If button is defined and not equal to 0 (left click)
      if (event.button) {
        return;
      }

      if (event.target !== wrapper.current && !event.target.dataset.dragScroller) {
        return;
      }

      prevPosition.current = event.clientX;
    },
    [wrapper],
  );

  const handleWindowMouseMove = useCallback(
    (event) => {
      if (!prevPosition.current) {
        return;
      }

      event.preventDefault();

      window.scrollBy({
        left: prevPosition.current - event.clientX,
      });

      prevPosition.current = event.clientX;
    },
    [prevPosition],
  );

  const handleWindowMouseUp = useCallback(() => {
    prevPosition.current = null;
  }, [prevPosition]);

  useEffect(() => {
    document.body.style.overflowX = 'auto';

    return () => {
      document.body.style.overflowX = null;
    };
  }, []);

  useEffect(() => {
    window.addEventListener('mouseup', handleWindowMouseUp);
    window.addEventListener('mousemove', handleWindowMouseMove);

    return () => {
      window.removeEventListener('mouseup', handleWindowMouseUp);
      window.removeEventListener('mousemove', handleWindowMouseMove);
    };
  }, [handleWindowMouseUp, handleWindowMouseMove]);

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div className={styles.wrapper} onMouseDown={handleMouseDown}>
        <div>
          <div className={styles.lists}>
            {datesOfWeek.map((date, index) => (
              <ScheduleListContainer date={date} userId={currentUserId} index={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
});

UserSchedule.propTypes = {
  currentUserId: PropTypes.string.isRequired,
  datesOfWeek: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  canEdit: PropTypes.bool.isRequired,
};

export default UserSchedule;
