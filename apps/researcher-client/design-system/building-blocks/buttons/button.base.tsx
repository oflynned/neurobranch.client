import Image from 'next/image';
import { FC } from 'react';
import { Paragraph } from '../text';
import styles from './style.module.scss';

export interface BaseButtonProps {
  text: string;
  onClick?: () => Promise<void> | void;
  icon?: string;
  iconDescription?: string;
  width?: number;
  height?: number;
}

export const Button: FC<BaseButtonProps> = ({
  text,
  onClick,
  icon,
  iconDescription = '',
}) => {
  return (
    <button className={styles.btn} onClick={onClick}>
      <div className={styles.content}>
        {icon && (
          <Image src={icon} alt={iconDescription} width={24} height={24} />
        )}
        <div className={styles.text}>
          <Paragraph>{text}</Paragraph>
        </div>
      </div>
    </button>
  );
};
