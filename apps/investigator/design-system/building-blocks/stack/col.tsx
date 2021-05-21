import { FC } from 'react';
import styles from './style.module.scss';

export const Col: FC = ({ children }) => (
  <div className={styles.column}>{children}</div>
);
