import { FC } from 'react';
import styles from './style.module.scss';

interface Props {
  onClick?: () => Promise<void> | void;
}

export const Link: FC<Props> = ({ children, onClick }) => {
  return (
    <p onClick={onClick} className={styles.text}>
      {children}
    </p>
  );
};
