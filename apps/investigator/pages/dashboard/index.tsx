import { Title, NavBar, Button, Layout, Heading } from '../../design-system';
import styles from './style.module.scss';
import { FC } from 'react';
import { useAccount } from '../../providers/auth/use-account.hook';

const Content: FC = ({ children }) => {
  return <main className={styles.content}>{children}</main>;
};

const Index = () => {
  const { logout, uid, jwt, account } = useAccount();

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
          </div>
        </Content>
      </div>
    </Layout>
  );
};

export default Index;
