import { FC, useState } from 'react';
import { v4 } from 'uuid';
import { Paragraph } from '../text';

import styles from './style.module.scss';

interface Props {
  type?: 'password' | 'text';
  hint?: string;
  label?: string;
  showError?: boolean;
  error?: string;
  onTextEntered?: (text: string) => Promise<void> | void;
  onError?: (error: Error) => Promise<void> | void;
  disabled?: boolean;
  text?: string;
}

export const Field: FC<Props> = ({
  type = 'text',
  hint = '',
  label,
  onTextEntered,
  error,
  showError = false,
  disabled = false,
  text,
}) => {
  const [id] = useState<string>(v4());
  const [isActive, setIsActive] = useState<boolean>(true);
  const [value, setValue] = useState<string>(text ?? '');

  return (
    <div className={styles.field}>
      {label && (
        <label htmlFor={id} className={showError ? styles.error : undefined}>
          <Paragraph>{label}</Paragraph>
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={hint}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        className={`${isActive ? styles.active : undefined} ${
          showError ? styles.error : undefined
        }`}
        disabled={disabled}
        value={value}
        onChange={(event) => {
          setValue(event.target.value);

          if (onTextEntered) {
            onTextEntered(value);
          }
        }}
      />
      {showError && (
        <div className={styles.error}>
          <Paragraph>{error}</Paragraph>
        </div>
      )}
    </div>
  );
};
