/* eslint-disable */
import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import Paths from '../../constants/Paths';
import User from '../User';
import Label from '../Label';
import DueDate from '../DueDate';

import styles from './DisabledCard.module.scss';
import Priority from '../Priority';
import Duration from '../Duration';
import Tasks from '../Card/Tasks';

const DisabledCard = React.memo(
  ({ id, name, dueDate, duration, priority, coverUrl, isPersisted, users, labels, tasks }) => {

    const handleClick = useCallback(() => {
      if (document.activeElement) {
        document.activeElement.blur();
      }
    }, []);

    const contentNode = (
      <>
        {coverUrl && <img src={coverUrl} alt="" className={styles.cover} />}
        <div className={styles.details}>
          {labels.length > 0 && (
            <span className={styles.labels}>
              {labels.map((label) => (
                <span
                  key={label.id}
                  className={classNames(styles.attachment, styles.attachmentLeft)}
                >
                  <Label name={label.name} color={label.color} size="tiny" />
                </span>
              ))}
            </span>
          )}
          <div className={styles.name}>{name}</div>
          {tasks.length > 0 && <Tasks items={tasks} />}
          {(dueDate || duration || priority) && (
            <span className={styles.attachments}>
              {dueDate && (
                <span className={classNames(styles.attachment, styles.attachmentLeft)}>
                  <DueDate value={dueDate} size="tiny" />
                </span>
              )}
              {priority > 0 && (
                <span className={classNames(styles.attachment, styles.attachmentLeft)}>
                  <Priority value={priority} size="tiny" />
                </span>
              )}
              {duration > 0 && (
                <span className={classNames(styles.attachment, styles.attachmentLeft)}>
                  <Duration value={duration} size="tiny" />
                </span>
              )}
            </span>
          )}
          {users.length > 0 && (
            <span className={classNames(styles.attachments, styles.attachmentsRight)}>
              {users.map((user) => (
                <span
                  key={user.id}
                  className={classNames(styles.attachment, styles.attachmentRight)}
                >
                  <User name={user.name} avatarUrl={user.avatarUrl} size="small" />
                </span>
              ))}
            </span>
          )}
        </div>
      </>
    );

    return (
      <div className={styles.wrapper}>
          <div className={styles.card}>
            {isPersisted ? (
              <>
                <Link
                  to={Paths.CARDS.replace(':id', id)}
                  className={styles.content}
                  onClick={handleClick}
                >
                  {contentNode}
                </Link>
              </>
            ) : (
              <span className={styles.content}>{contentNode}</span>
            )}
          </div>
      </div>
    );
  },
);

DisabledCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  dueDate: PropTypes.instanceOf(Date),
  duration: PropTypes.number,
  priority: PropTypes.number,
  coverUrl: PropTypes.string,
  isPersisted: PropTypes.bool.isRequired,
  /* eslint-disable react/forbid-prop-types */
  users: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
  tasks: PropTypes.array.isRequired,
};

DisabledCard.defaultProps = {
  dueDate: undefined,
  priority: 0,
  duration: undefined,
  coverUrl: undefined,
};

export default DisabledCard;
