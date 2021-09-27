import React from 'react';

import styles from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <header>
      <h1 className={styles.title}>Coworking booking system</h1>
    </header>
  );
};

export default Header;
