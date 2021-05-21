import { FC } from 'react';
import styles from './style.module.scss';
import { Paragraph } from '../text';

interface Props {
  text: string;
  selected?: boolean;
  onClick?: () => Promise<void> | void;
}

export const Chip: FC<Props> = ({ text, onClick, selected = false }) => {
  return (
    <div
      className={`${styles.chip} ${selected ? styles.selected : undefined}`}
      onClick={onClick}
    >
      <div className={styles.label}>
        <Paragraph>{text}</Paragraph>
      </div>
    </div>
  );
};
