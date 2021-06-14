import { FC } from 'react';
import { Button, Heading, NavBar, Page, Title } from '../../design-system';
import { useAccount } from '../../providers/auth/use-account.hook';
import styles from './style.module.scss';

const Content: FC = ({ children }) => {
  return <main className={styles.content}>{children}</main>;
};

const Index = () => {
  const { uid, jwt, account } = useAccount();

  return (
    <Page>
      <div className={styles.page}>
        <div className={styles.nav}>
          <NavBar activePage={'HOME'} />
        </div>
        <Content>
          <Title>Dashboard</Title>

          <div>
            <Heading>Hey {account.name}</Heading>
          </div>

          <div>
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
    </Page>
  );
};

export default Index;
