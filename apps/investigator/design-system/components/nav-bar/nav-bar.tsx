import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { useAccount } from '../../../providers/auth/use-account.hook';
import styles from './style.module.scss';

const Icon: FC<{ image: string }> = ({ image }) => (
  <Image src={`/static/images/${image}`} width={24} height={24} />
);

type Props = {
  activePage: 'HOME' | 'SETTINGS' | 'NOTIFICATIONS';
};
const HomeIcon = () => <Icon image={'home.svg'} />;

const SettingsIcon = () => <Icon image={'settings.svg'} />;

const NotificationsIcon = () => <Icon image={'notifications.svg'} />;

const LogoutIcon = () => <Icon image={'logout.svg'} />;

type WrapperProps = {
  active?: boolean;
  href?: string;
  onClick?: () => Promise<void> | void;
};

const IconWrapper: FC<WrapperProps> = ({ children, onClick, href, active }) => {
  // TODO perhaps a good time to switch to styled components or emotion
  const classes = classNames(styles.iconWrapper, { [styles.active]: active });
  const icon = (
    <div onClick={onClick} className={classes}>
      {children}
    </div>
  );

  return href ? <Link href={href}>{icon}</Link> : icon;
};

export const NavBar: FC<Props> = ({ activePage }) => {
  const { logout } = useAccount();

  return (
    <nav className={styles.navBar}>
      <div className={styles.icons}>
        <IconWrapper active={activePage === 'HOME'} href={'/dashboard'}>
          <HomeIcon />
        </IconWrapper>

        <IconWrapper active={activePage === 'SETTINGS'} href={'/settings'}>
          <SettingsIcon />
        </IconWrapper>

        <IconWrapper
          active={activePage === 'NOTIFICATIONS'}
          href={'/notifications'}
        >
          <NotificationsIcon />
        </IconWrapper>

        <IconWrapper onClick={logout}>
          <LogoutIcon />
        </IconWrapper>
      </div>
    </nav>
  );
};
