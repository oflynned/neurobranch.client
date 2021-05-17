import Link from 'next/link';
import { FC } from 'react';
import styles from './style.module.scss';

interface Props {
  href?: string;
}

export const AnchorLink: FC<Props> = ({ children, href }) => {
  return (
    <Link href={href}>
      <div className={styles.text}>{children}</div>
    </Link>
  );
};
