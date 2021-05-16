import { FC, useState } from 'react';
import { v4 } from 'uuid';
import { Paragraph } from '../text';

import styles from './style.module.scss';

interface Props {
  type?: 'password' | 'text';
  hint: string;
  label?: string;
  hasError?: boolean;
  error?: string;
  onTextEntered?: (text) => Promise<void> | void;
}

export const Field: FC<Props> = ({
  type = 'text',
  hint,
  label,
  onTextEntered,
  error,
  hasError = false,
}) => {
  const [id] = useState<string>(v4());
  const [isActive, setIsActive] = useState<boolean>(true);
  const [value, setValue] = useState<string>('');

  return (
    <div className={styles.field}>
      {label && (
        <label htmlFor={id} className={hasError && styles.error}>
          <Paragraph>{label}</Paragraph>
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={hint}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        className={`${isActive && styles.active} ${hasError && styles.error}`}
        onChange={(event) => {
          setValue(event.target.value);
          onTextEntered(value);
        }}
      />
      {hasError && (
        <div className={styles.error}>
          <Paragraph>{error}</Paragraph>
        </div>
      )}
    </div>
  );
};
