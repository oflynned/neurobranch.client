import Image from 'next/image';
import { FC } from 'react';
import { Paragraph } from '../text';
import styles from './style.module.scss';

export interface BaseButtonProps {
  matchParent?: boolean;
  onClick?: () => Promise<void> | void;
  icon?: string;
  iconDescription?: string;
  fill?: 'MATCH_PARENT' | 'WRAP_CONTENT';
}

export const Button: FC<BaseButtonProps> = ({
  children,
  onClick,
  icon,
  iconDescription = '',
  fill = 'WRAP_CONTENT',
}) => {
  const width =
    fill === 'MATCH_PARENT' ? styles.matchParent : styles.wrapContent;

  return (
    <button className={`${styles.btn} ${width}`} onClick={onClick}>
      <div className={styles.content}>
        {icon && (
          <Image src={icon} alt={iconDescription} width={24} height={24} />
        )}
        <div className={styles.text}>
          <Paragraph>{children}</Paragraph>
        </div>
      </div>
    </button>
  );
};
