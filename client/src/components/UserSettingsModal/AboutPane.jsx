import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Tab } from 'semantic-ui-react';

import Config from '../../constants/Config';

import styles from './AboutPane.module.scss';

const AboutPane = React.memo(() => {
  const [t] = useTranslation();

  return (
    <Tab.Pane attached={false} className={styles.wrapper}>
      <div className={styles.version}>
        {t('common.version')} {Config.VERSION}
      </div>
    </Tab.Pane>
  );
});

export default AboutPane;
