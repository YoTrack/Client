import upperFirst from 'lodash/upperFirst';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Duration.module.scss';

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

const Duration = React.memo(({ value, size, isDisabled, onClick }) => {
  let hours;
  if (value === 0.0 || value === null || value === undefined) {
    hours = '';
  } else {
    const hourMod = (value * 10) % 10;
    const hourDiv = (parseInt(value, 10) * 10) / 10;
    if (hourDiv !== 0) hours = `${hourDiv} ч.`;
    else hours = `${(hourMod / 10) * 60} мин.`; // 15 30 45 1ч 2 ч 3ч и до 24ч
  }
  // eslint-disable-next-line no-console

  const contentNode = (
    <span
      className={classNames(
        styles.wrapper,
        styles[`wrapper${upperFirst(size)}`],
        onClick && styles.wrapperHoverable,
      )}
    >
      {hours}
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

Duration.propTypes = {
  value: PropTypes.number,
  size: PropTypes.oneOf(Object.values(SIZES)),
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
};

Duration.defaultProps = {
  value: 0,
  size: SIZES.MEDIUM,
  isDisabled: false,
  onClick: undefined,
};

export default Duration;
