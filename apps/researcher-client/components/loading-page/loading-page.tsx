import { FC } from 'react';
import styles from './style.module.scss';
import { LoadingIndicator } from '../../design-system';

type Props = {
  loading: boolean;
};

export const LoadingPage: FC<Props> = ({ children, loading }) => {
  return (
    <div className={styles.container}>
      {loading && (
        <div className={styles.indicator}>
          <LoadingIndicator />
        </div>
      )}
      <div className={loading && styles.blur}>{children}</div>
    </div>
  );
};
