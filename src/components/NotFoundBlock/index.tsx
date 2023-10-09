import React from "react";

import styles from "./NotFoundBlock.module.scss";

export const NotFoundBlock: React.FC = () => {
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
