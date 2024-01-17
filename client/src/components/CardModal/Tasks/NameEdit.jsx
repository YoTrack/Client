import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import TextareaAutosize from 'react-textarea-autosize';
import { Button, Form, TextArea, Dropdown } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';

import { useField } from '../../../hooks';

import styles from './NameEdit.module.scss';
import { Popup } from '../../../lib/custom-ui';

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
const NameEdit = React.forwardRef(({ children, defaultValue, defaultDuration, defaultDueDate, onUpdate, onDataUpdate, onDurationUpdate }, ref) => {
  const [t] = useTranslation();
  const [isOpened, setIsOpened] = useState(false);
  const [value, handleFieldChange, setValue] = useField(null);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState(0);
  
  const field = useRef(null);

  const open = useCallback(() => {
    setIsOpened(true);
    setValue(defaultValue);
  }, [defaultValue, setValue]);

  const close = useCallback(() => {
    setIsOpened(false);
    setValue(null);
  }, [setValue]);

  const submit = useCallback(() => {
    const cleanValue = value.trim();

    const cleanData = {
      
    };
    
    if (cleanValue && cleanValue !== defaultValue) {
      onUpdate(cleanValue);
    }

    if (selectedDate && selectedDate !== defaultDueDate) {
      onDataUpdate(selectedDate.toISOString().substring(0, 10));
    }

    if(selectedNumber !== defaultDuration){
      onDurationUpdate(selectedNumber)
    }

    //close();
  }, [defaultValue, onUpdate, value, close]);

  useImperativeHandle(
    ref,
    () => ({
      open,
      close,
    }),
    [open, close],
  );

  const handleFieldKeyDown = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();

        submit();
      }
    },
    [submit],
  );

  const handleFieldBlur = useCallback(() => {
    submit();
  }, [submit]);

  const handleSubmit = useCallback(() => {
    submit();
    close();
  }, [submit]);

  const handleDateChange = useCallback((date) => {
    setSelectedDate(date);
    submit();
  }, [submit]);

  const handleNumberChange = useCallback((event, { value }) => {
    setSelectedNumber(value);
    submit();
  }, [submit]);

  useEffect(() => {
    if (isOpened) {
      field.current.ref.current.focus();
    }
  }, [isOpened]);

  if (!isOpened) {
    return children;
  }

  return (
    <Form onSubmit={handleSubmit} className={styles.wrapper}>
      <TextArea
        ref={field}
        as={TextareaAutosize}
        value={value}
        minRows={2}
        spellCheck={false}
        className={styles.field}
        onKeyDown={handleFieldKeyDown}
        onChange={handleFieldChange}
      />
      <div className={styles.text}>Выберите дату</div>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        placeholderText={t('common.dueDate')}
        className={styles.field}
      />
      <Popup.Content>    
          <div className={styles.fieldBox}>
            <div className={styles.text}>Выберите длительность</div>
            <Dropdown selection options={durationOptions} onChange={handleNumberChange} />
          </div>
          <div>{selectedNumber}</div>
      </Popup.Content>
      <div className={styles.controls}>
        <Button positive content={t('action.save')} />
      </div>
    </Form>
  );
});

NameEdit.propTypes = {
  children: PropTypes.element.isRequired,
  defaultValue: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default React.memo(NameEdit);
