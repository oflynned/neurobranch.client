import { Title, NavBar, Button, Paragraph } from '../../design-system';
import styles from './style.module.scss';
import { firebaseClient } from '../../providers/auth/firebase.client';
import React, { FC } from 'react';
import { useAccount } from '../../providers/auth/use-account.hook';

const Layout: FC = ({ children }) => {
  return <main className={styles.content}>{children}</main>;
};

const Index = () => {
  const { account } = useAccount();

  return (
    <div className={styles.page}>
      <div className={styles.nav}>
        <NavBar activePage={'HOME'} />
      </div>
      <Layout>
        <Title>Authenticated!</Title>
        <div>
          <Button
            text={'Log out'}
            onClick={async () => {
              await firebaseClient.auth().signOut();
              window.location.href = '/';
            }}
          />

          {account && <Paragraph>Hey there, {account.name}!</Paragraph>}
        </div>
      </Layout>
    </div>
  );
};

export default Index;
