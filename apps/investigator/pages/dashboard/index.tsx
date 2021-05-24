import { Title, NavBar, Button, Paragraph, Layout } from '../../design-system';
import styles from './style.module.scss';
import { firebaseClient } from '../../providers/auth/firebase.client';
import React, { FC } from 'react';
import { useAccount } from '../../providers/auth/use-account.hook';

const Content: FC = ({ children }) => {
  return <main className={styles.content}>{children}</main>;
};

const Index = () => {
  const { account } = useAccount();

  return (
    <Layout>
      <div className={styles.page}>
        <div className={styles.nav}>
          <NavBar activePage={'HOME'} />
        </div>
        <Content>
          <Title>Authenticated!</Title>
          <Button
            text={'Log out'}
            onClick={async () => {
              await firebaseClient.auth().signOut();
              window.location.href = '/';
            }}
          />

          {account && <Paragraph>Hey there, {account.name}!</Paragraph>}
        </Content>
      </div>
    </Layout>
  );
};

export default Index;
