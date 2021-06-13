import { FC, useState } from 'react';
import { v4 } from 'uuid';
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
  const [id] = useState<string>(v4());
  const [isActive, setIsActive] = useState<boolean>(true);
  const [fieldValue, setFieldValue] = useState<string>(initialValue);

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
        value={fieldValue}
        placeholder={hint}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        className={`${isActive ? styles.active : undefined} ${
          showError ? styles.error : undefined
        }`}
        disabled={disabled}
        onChange={(event) => {
          setFieldValue(event.target.value);
          onTextEntered && onTextEntered(initialValue);
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
