import { FC } from 'react';
import { Button, Heading, Layout, NavBar, Title } from '../../design-system';
import { useAccount } from '../../providers/auth/use-account.hook';
import styles from './style.module.scss';

const Content: FC = ({ children }) => {
  return <main className={styles.content}>{children}</main>;
};

const Index = () => {
  const { logout, uid, jwt, isLoading, account } = useAccount();

  if (isLoading) {
    return <div>Loading dashboard...</div>;
  }

  return (
    <Layout>
      <div className={styles.page}>
        <div className={styles.nav}>
          <NavBar activePage={'HOME'} />
        </div>
        <Content>
          <Title>Dashboard</Title>
          <Heading>Welcome back {account.name}</Heading>
          <div>
            <Button
              text={'Log out'}
              onClick={async () => {
                await logout();
                window.location.href = '/';
              }}
            />

            <Button
              text={'Copy uid'}
              onClick={async () => navigator.clipboard.writeText(uid)}
            />

            <Button
              text={'Copy jwt'}
              onClick={async () => navigator.clipboard.writeText(jwt)}
            />

            <Button
              text={'Copy headers'}
              onClick={async () => {
                const data = JSON.stringify(
                  {
                    Authorization: `Bearer ${jwt}`,
                    'x-firebase-uid': uid,
                  },
                  null,
                  2,
                );
                await navigator.clipboard.writeText(data);
              }}
            />
          </div>
        </Content>
      </div>
    </Layout>
  );
};

export default Index;
