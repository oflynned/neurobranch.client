import { FC } from 'react';
import Image from 'next/image';

import styles from './style.module.scss';

type Props = {
  activePage: 'HOME' | 'SETTINGS';
};

const HomeIcon = () => (
  <Image src={'/static/images/home.svg'} width={24} height={24} />
);

type WrapperProps = {
  active?: boolean;
};

const IconWrapper: FC<WrapperProps> = ({ children, active }) => {
  return (
    <div
      className={`${styles.iconWrapper} ${active ? styles.active : undefined}`}
    >
      {children}
    </div>
  );
};

export const NavBar: FC<Props> = ({ activePage }) => {
  return (
    <nav className={styles.navBar}>
      <div className={styles.icons}>
        <IconWrapper active={true}>
          <HomeIcon />
        </IconWrapper>

        <IconWrapper>
          <HomeIcon />
        </IconWrapper>
      </div>
    </nav>
  );
};
