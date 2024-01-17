/* eslint-disable */
import React, { useCallback, useRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Draggable } from 'react-beautiful-dnd';
import { Button, Checkbox, Icon } from 'semantic-ui-react';
import { usePopup } from '../../../lib/popup';

import NameEdit from './NameEdit';
import ActionsStep from './ActionsStep';

import styles from './Item.module.scss';

const Item = React.memo(
  ({ id, index, name, dueDate, duration, isCompleted, isPersisted, canEdit, onUpdate, onDelete }) => {
    const nameEdit = useRef(null);
    const normalDate = (dueDate && dueDate.slice(0, 10)) || ''
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
    const noormalDuration = durationOptions.find(option => option.value === duration)?.key;

    const handleClick = useCallback(() => {
      if (isPersisted && canEdit) {
        nameEdit.current.open();
      }
    }, [isPersisted, canEdit]);

    const handleNameUpdate = useCallback(
      (newName) => {
        onUpdate({
          name: newName,
        });
      },
      [onUpdate],
    );

    const handledueDateUpdate =useCallback(
      (newDueDate) => {
        onUpdate({
          dueDate: newDueDate,
        });
      },
      [onUpdate],
    ) ;

    const handleDurationeUpdate =useCallback(
      (newDuration) => {
        onUpdate({
          duration: newDuration,
        });
      },
      [onUpdate],
    ) ;

    const handleToggleChange = useCallback(() => {
      onUpdate({
        isCompleted: !isCompleted,
      });
    }, [isCompleted, onUpdate]);

    const handleNameEdit = useCallback(() => {
      nameEdit.current.open();
    }, []);

    const ActionsPopup = usePopup(ActionsStep);

    return (
      <Draggable draggableId={id} index={index} isDragDisabled={!isPersisted || !canEdit}>
        {({ innerRef, draggableProps, dragHandleProps }, { isDragging }) => {
          const contentNode = (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <div {...draggableProps} {...dragHandleProps} ref={innerRef} className={styles.wrapper}>
              <span className={styles.checkboxWrapper}>
                <Checkbox
                  checked={isCompleted}
                  disabled={!isPersisted || !canEdit}
                  className={styles.checkbox}
                  onChange={handleToggleChange}
                />
              </span>
              <NameEdit ref={nameEdit} defaultValue={name} defaultDate={dueDate} defaultDuration={duration} onUpdate={handleNameUpdate} onDataUpdate={handledueDateUpdate} onDurationUpdate={handleDurationeUpdate}>
                <div className={classNames(canEdit && styles.contentHoverable)}>
                  {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                  <span
                    className={classNames(styles.text, canEdit && styles.textEditable)}
                    onClick={handleClick}
                  >
                    <span className={classNames(styles.task, isCompleted && styles.taskCompleted)}>
                    [{normalDate} {noormalDuration}] {name}
                    </span>
                  </span>
                  {isPersisted && canEdit && (
                    <ActionsPopup onNameEdit={handleNameEdit} onDelete={onDelete}>
                      <Button className={classNames(styles.button, styles.target)}>
                        <Icon fitted name="pencil" size="small" />
                      </Button>
                    </ActionsPopup>
                  )}
                </div>
              </NameEdit>
            </div>
          );

          return isDragging ? ReactDOM.createPortal(contentNode, document.body) : contentNode;
        }}
      </Draggable>
    );
  },
);

Item.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  isPersisted: PropTypes.bool.isRequired,
  canEdit: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Item;
