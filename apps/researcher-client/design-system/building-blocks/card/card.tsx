import { FC } from 'react';

import styles from './style.module.scss';

export const Card: FC = ({ children }) => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
