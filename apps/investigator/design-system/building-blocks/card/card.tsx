import classNames from 'classnames';
import { FC } from 'react';
import styles from './style.module.scss';

type Props = {
  shadow?: boolean;
};

export const Card: FC<Props> = ({ children, shadow = false }) => {
  return (
    <div
      className={classNames([
        styles.card,
        shadow ? styles.shadow : styles.outline,
      ])}
    >
      <div className={styles.content}>{children}</div>
    </div>
  );
};
