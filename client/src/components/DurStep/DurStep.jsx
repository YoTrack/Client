import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Dropdown } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

import styles from './DurStep.module.scss';
import { Popup } from '../../lib/custom-ui';

const durationOptions = [
  { key: '15m', value: 0.25, text: '15 minutes' },
  { key: '30m', value: 0.5, text: '30 minutes' },
  { key: '45m', value: 0.75, text: '45 minutes' },
  { key: '1h', value: 1, text: '1 hour' },
  { key: '2h', value: 2, text: '2 hours' },
  { key: '3h', value: 3, text: '3 hours' },
  { key: '12h', value: 12, text: '12 hours' },
];

const DurStep = React.memo(({ onUpdate, onClose }) => {
  const [t] = useTranslation();

  const durationDropdownRef = useRef(null);

  const handleSubmit = useCallback(() => {
    const selectedValue = durationDropdownRef.current.state.value;

    if (selectedValue !== undefined) {
      onUpdate(selectedValue);
      onClose();
    }
  }, [onUpdate, onClose]);

  return (
    <>
      <Popup.Header>
        {t('common.editDur', {
          context: 'title',
        })}
      </Popup.Header>
      <Popup.Content>
        <Form onSubmit={handleSubmit}>
          <div className={styles.fieldBox}>
            <div className={styles.text}>Выберите длительность</div>
            <Dropdown
              ref={durationDropdownRef}
              selection
              options={durationOptions}
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

DurStep.propTypes = {
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onUpdate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

DurStep.defaultProps = {
  defaultValue: durationOptions[0].value,
};

export default DurStep;