import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Form, TextArea, Dropdown } from 'semantic-ui-react';
import { useDidUpdate, useToggle } from '../../../lib/hooks';
import { useClosableForm, useForm } from '../../../hooks';
import { Popup } from '../../../lib/custom-ui';

import styles from './Add.module.scss';
const DEFAULT_DATA = {
  name: '',
  date: '',
  duration: '0',
};
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
const Add = React.forwardRef(({ children, onCreate }, ref) => {
  const [t] = useTranslation();
  const [isOpened, setIsOpened] = useState(false);
  const [data, handleFieldChange, setData] = useForm(DEFAULT_DATA);
  const [focusNameFieldState, focusNameField] = useToggle();

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState(0);

  const nameField = useRef(null);

  const open = useCallback(() => {
    setIsOpened(true);
  }, []);

  const close = useCallback(() => {
    setIsOpened(false);
  }, []);

  const submit = useCallback(() => {
    const cleanData = {
      ...data,
      name: data.name.trim(),
    };

    if (!cleanData.name) {
      nameField.current.ref.current.select();
      return;
    }

    if (selectedDate) {
      cleanData.dueDate = selectedDate.toISOString().substring(0, 10);
    }

    if(selectedNumber){
      cleanData.duration = selectedNumber
    }

    setSelectedNumber();
    onCreate(cleanData);
    setData(DEFAULT_DATA);
    setSelectedDate(null);
    focusNameField();
  }, [onCreate, data, setData, selectedDate, setSelectedDate, focusNameField]);

  useImperativeHandle(
    ref,
    () => ({
      open,
      close,
    }),
    [open, close],
  );



  const handleChildrenClick = useCallback(() => {
    open();
  }, [open]);

  const handleFieldKeyDown = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();

        submit();
      }
    },
    [submit],
  );

  const handleDateChange = useCallback((date) => {
    setSelectedDate(date);
  }, []);

  const handleNumberChange = useCallback((event, { value }) => {
    setSelectedNumber(value);
  }, []);

  const [handleFieldBlur, handleControlMouseOver, handleControlMouseOut] = useClosableForm(
    close,
    isOpened,
  );

  const handleSubmit = useCallback(() => {
    submit();
  }, [submit]);

  useEffect(() => {
    if (isOpened) {
      nameField.current.ref.current.focus();
    }
  }, [isOpened]);

  useDidUpdate(() => {
    nameField.current.ref.current.focus();
  }, [focusNameFieldState]);

  if (!isOpened) {
    return React.cloneElement(children, {
      onClick: handleChildrenClick,
    });
  }

  return (
    <Form className={styles.wrapper} onSubmit={handleSubmit}>
      <TextArea
        ref={nameField}
        as={Form.TextArea}
        name="name"
        value={data.name}
        placeholder={t('common.enterTaskDescription')}
        spellCheck={false}
        className={styles.field}
        onKeyDown={handleFieldKeyDown}
        onChange={handleFieldChange}
        onBlur={handleFieldBlur}
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
            <Dropdown selection options={durationOptions} onChange={handleNumberChange} selected={selectedNumber}/>
          </div>
          <div>{selectedNumber}</div>
      </Popup.Content>
     
      <div className={styles.controls}>
        {/* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events */}
        <Button
          positive
          content={t('action.addTask')}
          onMouseOver={handleControlMouseOver}
          onMouseOut={handleControlMouseOut}
        />
      </div>
    </Form>
  );
});

Add.propTypes = {
  children: PropTypes.element.isRequired,
  onCreate: PropTypes.func.isRequired,
};

export default React.memo(Add);