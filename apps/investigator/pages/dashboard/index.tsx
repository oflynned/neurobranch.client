import { lorem } from 'faker';
import { FC } from 'react';
import {
  Button,
  Card,
  Heading,
  NavBar,
  Page,
  Paragraph,
  Title,
} from '../../design-system';
import { useAccount } from '../../providers/auth/use-account.hook';
import styles from './style.module.scss';

const Content: FC = ({ children }) => {
  return <main className={styles.content}>{children}</main>;
};

const blurb = lorem.paragraph(3);

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

          <Card margin={{ top: 'md', bottom: 'md' }} maxWidth={'512px'}>
            <Heading>Hey {account.name}</Heading>
            <Paragraph margin={{ top: 'sm' }}>{blurb}</Paragraph>
          </Card>

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
