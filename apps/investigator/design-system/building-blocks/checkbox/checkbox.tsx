import { FC } from 'react';
import { Paragraph } from '../text';
import styles from './style.module.scss';

type Props = {
  label: string;
  prechecked?: boolean;
  onCheck?: (isChecked: boolean) => Promise<void> | void;
};

export const Checkbox: FC<Props> = ({ label, prechecked, onCheck }) => {
  return (
    <div className={styles.checkbox}>
      <input
        type={'checkbox'}
        defaultChecked={prechecked}
        onChange={(e) => {
          onCheck && onCheck(e.target.checked);
        }}
      />
      <label>
        <Paragraph>{label}</Paragraph>
      </label>
    </div>
  );
};
