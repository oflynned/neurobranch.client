import { Title, NavBar, Button, Paragraph, Layout } from '../../design-system';
import styles from './style.module.scss';
import { FC } from 'react';
import { useAccount } from '../../providers/auth/use-account.hook';

const Content: FC = ({ children }) => {
  return <main className={styles.content}>{children}</main>;
};

const Index = () => {
  const { account, logout } = useAccount();

  return (
    <Layout>
      <div className={styles.page}>
        <div className={styles.nav}>
          <NavBar activePage={'HOME'} />
        </div>
        <Content>
          <Title>Authenticated!</Title>
          <div>
            <Button
              text={'Log out'}
              onClick={async () => {
                await logout();
                window.location.href = '/';
              }}
            />

            {account && <Paragraph>Hey there, {account.name}!</Paragraph>}
          </div>
        </Content>
      </div>
    </Layout>
  );
};

export default Index;
