import { FC, useState } from 'react';
import { v4 } from 'uuid';
import { Paragraph } from '../text';

import styles from './style.module.scss';

interface Props {
  type?: 'password' | 'text';
  hint: string;
  label?: string;
  onTextEntered?: (text) => Promise<void> | void;
}

export const EditText: FC<Props> = ({
  type = 'text',
  hint,
  label,
  onTextEntered,
}) => {
  const [id] = useState<string>(v4());
  const [isActive, setIsActive] = useState<boolean>(true);
  const [value, setValue] = useState<string>('');

  return (
    <div className={styles.editText}>
      <label htmlFor={id}>
        <Paragraph>{label}</Paragraph>
      </label>
      <input
        id={id}
        type={type}
        placeholder={hint}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        className={styles.inputBox}
        onChange={(event) => {
          setValue(event.target.value);
          onTextEntered(value);
        }}
      />
    </div>
  );
};
