import classNames from 'classnames';
import { FC } from 'react';
import styles from './style.module.scss';

type Props = {
  size?: 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
};

export const Title: FC<Props> = ({ children, size = 'xxl' }) => {
  return (
    <h1 className={classNames([styles.text, styles[size]])}>{children}</h1>
  );
};
