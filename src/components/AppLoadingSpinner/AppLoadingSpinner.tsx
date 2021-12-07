import React from 'react';

import styles from './AppLoadingSpinner.module.scss';

const AppLoadingSpinner: React.VFC = () => (
  <div className={'flex flex-col items-center justify-center h-screen'}>
    <span
      className={`${styles.loader} animate-spin rounded-full border-8 h-64 w-64`}
    />
  </div>
);

export default AppLoadingSpinner;
