import { FC, useState } from 'react';
import {
  Button,
  Card,
  Heading,
  NavBar,
  Page,
  Title,
} from '../../design-system';
import { useAccount } from '../../providers/auth/use-account.hook';
import styles from './style.module.scss';

const Content: FC = ({ children }) => {
  return <main className={styles.content}>{children}</main>;
};

const localDate = new Date().toLocaleString('en-IE', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

const Index = () => {
  const { uid, jwt, account } = useAccount();
  const [date] = useState(localDate);

  return (
    <Page>
      <div className={styles.page}>
        <div className={styles.nav}>
          <NavBar activePage={'HOME'} />
        </div>
        <Content>
          <Title>Organisations</Title>
          <Heading>{date}</Heading>

          <Card>
            <Title size={'lg'}>Hey {account.name}</Title>
          </Card>

          <div>
            <Button onClick={async () => navigator.clipboard.writeText(uid)}>
              Copy uid
            </Button>

            <Button onClick={async () => navigator.clipboard.writeText(jwt)}>
              Copy jwt
            </Button>

            <Button
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
            >
              Copy headers
            </Button>
          </div>
        </Content>
      </div>
    </Page>
  );
};

export default Index;
