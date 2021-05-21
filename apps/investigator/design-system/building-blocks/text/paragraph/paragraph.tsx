import { FC } from 'react';

import styles from './style.module.scss';

export const Paragraph: FC = ({ children }) => {
  return <p className={styles.text}>{children}</p>;
};
