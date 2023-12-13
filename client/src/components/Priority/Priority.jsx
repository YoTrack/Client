import upperFirst from 'lodash/upperFirst';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import styles from './Priority.module.scss';

const SIZES = {
  TINY: 'tiny',
  SMALL: 'small',
  MEDIUM: 'medium',
};

const TITLES = {
  HIGH: 'Высокий',
  MEDIUM: 'Средний',
  LIGHT: 'Низкий',
};

const Priority = React.memo(({ value, size, isDisabled, onClick }) => {
  const [t] = useTranslation();

  let cardPriority = '';
  let stylePriority;
  // eslint-disable-next-line no-console
  switch (value) {
    case 1:
      cardPriority = TITLES.LIGHT;
      stylePriority = styles.wrapperLight;
      break;
    case 2:
      cardPriority = TITLES.MEDIUM;
      stylePriority = styles.wrapperMed;
      break;
    case 3:
      cardPriority = TITLES.HIGH;
      stylePriority = styles.wrapperHigh;
      break;
    default:
      stylePriority = styles.wrapper;
      break;
  }
  const contentNode = (
    <span
      className={classNames(
        styles.wrapper,
        styles[`wrapper${upperFirst(size)}`],
        stylePriority,
        onClick && styles.wrapperHoverable,
      )}
    >
      {cardPriority}
    </span>
  );

  return onClick ? (
    <button type="button" disabled={isDisabled} className={styles.button} onClick={onClick}>
      {contentNode}
    </button>
  ) : (
    contentNode
  );
});

Priority.propTypes = {
  value: PropTypes.number,
  size: PropTypes.oneOf(Object.values(SIZES)),
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
};

Priority.defaultProps = {
  value: 0,
  size: SIZES.MEDIUM,
  isDisabled: false,
  onClick: undefined,
};

export default Priority;
