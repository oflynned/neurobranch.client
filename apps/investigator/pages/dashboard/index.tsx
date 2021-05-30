import React, { FC } from 'react';
import styles from './style.module.scss';
import { Title, NavBar, Paragraph, Layout } from '../../design-system';
import { firebaseClient } from '../../providers/auth/firebase.client';
import { useAccount } from '../../providers/auth/use-account.hook';
import { Button } from '@chakra-ui/react';

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
            colorScheme={'teal'}
            variant={'outline'}
            onClickCapture={async () => {
              await firebaseClient.auth().signOut();
              window.location.href = '/';
            }}
          >
            Log out
          </Button>

          <Paragraph>Hey there, {account?.name}!</Paragraph>
        </Content>
      </div>
    </Layout>
  );
};

export default Index;
