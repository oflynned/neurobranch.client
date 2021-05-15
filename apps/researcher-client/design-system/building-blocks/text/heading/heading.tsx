import { FC } from 'react';
import styles from './style.module.scss';

export const Heading: FC = ({ children }) => {
  return <h3 className={styles.text}>{children}</h3>;
};
