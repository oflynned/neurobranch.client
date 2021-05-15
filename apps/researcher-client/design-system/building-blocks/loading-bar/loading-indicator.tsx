import { FC } from 'react';
import styles from './style.module.scss';
import { Paragraph } from '../text';

type Props = {
  label?: string;
};

const Cube = () => <div className={styles.cube} />;

export const LoadingIndicator: FC<Props> = ({ label }) => {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <Cube />
        <Cube />
        <Cube />
        <Cube />
      </div>
      {label && <Paragraph>{label}</Paragraph>}
    </div>
  );
};
