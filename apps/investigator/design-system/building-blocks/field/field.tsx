import { FC, useState } from 'react';
import { Paragraph } from '../text';
import styles from './style.module.scss';

interface Props {
  type?: 'password' | 'text';
  hint: string;
  initialValue?: string;
  label?: string;
  disabled?: boolean;
  showError?: boolean;
  error?: string;
  onTextEntered?: (text: string) => Promise<void> | void;
  onError?: (error: Error) => Promise<void> | void;
}

export const Field: FC<Props> = ({
  type = 'text',
  initialValue = '',
  hint,
  label,
  onTextEntered,
  error,
  showError = false,
  disabled = false,
}) => {
  const [isActive, setIsActive] = useState<boolean>(true);

  return (
    <div className={styles.field}>
      {label && (
        <label className={showError ? styles.error : undefined}>
          <Paragraph>{label}</Paragraph>
        </label>
      )}
      <input
        type={type}
        placeholder={hint}
        defaultValue={initialValue}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        className={`${isActive ? styles.active : undefined} ${
          showError ? styles.error : undefined
        }`}
        disabled={disabled}
        onChange={(event) => {
          if (onTextEntered) {
            onTextEntered(event.target.value);
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
