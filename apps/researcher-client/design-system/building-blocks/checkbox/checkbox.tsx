import { FC, useState } from 'react';
import { Paragraph } from '../text';
import styles from './style.module.scss';

import { v4 } from 'uuid';

type Props = {
  label: string;
  prechecked?: boolean;
  onCheck?: (isChecked: boolean) => Promise<void> | void;
};

export const Checkbox: FC<Props> = ({ label, prechecked, onCheck }) => {
  const [id] = useState<string>(v4());

  return (
    <div className={styles.checkbox}>
      <input
        id={id}
        type={'checkbox'}
        defaultChecked={prechecked}
        onChange={(e) => {
          onCheck(e.target.checked);
        }}
      />
      <label htmlFor={id}>
        <Paragraph>{label}</Paragraph>
      </label>
    </div>
  );
};
