import { FC } from 'react';
import styles from './style.module.scss';
import { Paragraph } from '../text';
import { Line } from '../line';

interface Props {
  text?: string;
}

export const Divider: FC<Props> = ({ text }) => {
  if (!text) {
    return <Line />;
  }

  return (
    <div className={styles.divider}>
      <Line />
      <div className={styles.text}>
        <Paragraph>{text}</Paragraph>
      </div>
      <Line />
    </div>
  );
};
