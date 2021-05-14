import { FC } from 'react';
import styles from './style.module.scss';

export const Title: FC = ({ children }) => {
  return <h1 className={styles.text}>{children}</h1>;
};
