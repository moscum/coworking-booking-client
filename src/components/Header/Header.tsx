import React from 'react';

import styles from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <div>
      <h1 className={styles.title}>Coworking booking system</h1>
    </div>
  );
};

export default Header;
