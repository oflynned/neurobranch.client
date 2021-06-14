import Image from 'next/image';
import { FC } from 'react';
import { Heading } from '../../index';
import styles from './style.module.scss';

type Props = {
  loading: boolean;
};

export const LoadingPage: FC<Props> = ({ children, loading }) => {
  return (
    <>
      {loading ? (
        <div className={styles.container}>
          <Image
            src={'/static/images/neurobranch.png'}
            width={192}
            height={92}
          />
          <Heading>Loading page...</Heading>
        </div>
      ) : (
        children
      )}
    </>
  );
};
