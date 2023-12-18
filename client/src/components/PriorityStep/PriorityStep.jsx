import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Dropdown } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

import styles from './PriorityStep.module.scss';
import { Popup } from '../../lib/custom-ui';

const priorityOptions = [
  { key: 0, value: 0, text: 'Не определен' },
  { key: 1, value: 1, text: 'Низкий' },
  { key: 2, value: 2, text: 'Средний' },
  { key: 3, value: 3, text: 'Высокий' },
];

const PriorityStep = React.memo(({ onUpdate, onClose }) => {
  const [t] = useTranslation();

  const priorityDropdownRef = useRef(null);

  const handleSubmit = useCallback(() => {
    const selectedValue = priorityDropdownRef.current.state.value;

    if (selectedValue !== undefined) {
      onUpdate(selectedValue);
      onClose();
    }
  }, [onUpdate, onClose]);

  return (
    <>
      <Popup.Header>
        {t('common.editPriority', {
          context: 'title',
        })}
      </Popup.Header>
      <Popup.Content>
        <Form onSubmit={handleSubmit}>
          <div className={styles.fieldBox}>
            <div className={styles.text}>Выберите приоритет</div>
            <Dropdown
              ref={priorityDropdownRef}
              selection
              options={priorityOptions}
            />
          </div>
          <div></div>
          <Button positive content={t('action.save')} />
        </Form>
      </Popup.Content>
    </>
  )
    ;
});

PriorityStep.propTypes = {
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onUpdate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

PriorityStep.defaultProps = {
  defaultValue: priorityOptions[0].value,
};

export default PriorityStep;