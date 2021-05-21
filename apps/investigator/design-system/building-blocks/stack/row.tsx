import { FC } from 'react';
import styles from './style.module.scss';

export const Row: FC = ({ children }) => (
  <div className={styles.row}>{children}</div>
);
