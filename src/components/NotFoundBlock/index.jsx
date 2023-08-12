import React from 'react';

import styles from './NotFoundBlock.module.scss';

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😔</span>
        <br />
        Nothing not founded
      </h1>
      <p className={styles.description}>This page we didnt find</p>
    </div>
  );
};

export default NotFoundBlock;
