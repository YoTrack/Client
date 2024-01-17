import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Progress } from 'semantic-ui-react';
import { useToggle } from '../../lib/hooks';

import styles from './Tasks.module.scss';

const Tasks = React.memo(({ items }) => {
  const [isOpened, toggleOpened] = useToggle();

  const handleToggleClick = useCallback(
    (event) => {
      event.preventDefault();

      toggleOpened();
    },
    [toggleOpened],
  );

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
  const completedItems = items.filter((item) => item.isCompleted);

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
                                   jsx-a11y/no-static-element-interactions */}
      <div className={styles.button} onClick={handleToggleClick}>
        <span className={styles.progressWrapper}>
          <Progress
            autoSuccess
            value={completedItems.length}
            total={items.length}
            color="blue"
            size="tiny"
            className={styles.progress}
          />
        </span>
        <span
          className={classNames(styles.count, isOpened ? styles.countOpened : styles.countClosed)}
        >
          {completedItems.length}/{items.length}
        </span>
      </div>
      {isOpened && (
        <ul className={styles.tasks}>
          {items.map((item) => (
            <li
              key={item.id}
              className={classNames(styles.task, item.isCompleted && styles.taskCompleted)}
            >
               [{(item.dueDate && item.dueDate.slice(0, 10)) || ''} {durationOptions.find(option => option.value === item.duration)?.key}] {item.name}
            </li>
          ))}
        </ul>
      )}
    </>
  );
});

Tasks.propTypes = {
  items: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Tasks;
