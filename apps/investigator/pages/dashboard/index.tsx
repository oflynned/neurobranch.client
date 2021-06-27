import { FC } from 'react';
import {
  Button,
  Card,
  Col,
  Heading,
  NavBar,
  Page,
  Paragraph,
  Subtitle,
  Title,
} from '../../design-system';
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
          <Subtitle>1 Jan 2020</Subtitle>

          <Card margin={{ top: 'md', bottom: 'md' }} width={'512px'}>
            <Col>
              <Heading>Name</Heading>
              <Paragraph>{account.name}</Paragraph>

              <Heading>Email</Heading>
              <Paragraph>{account.email}</Paragraph>

              <Heading>Account</Heading>
              <Paragraph>{account.__typename}</Paragraph>
            </Col>
          </Card>

          <Button
            margin={{ all: 'md' }}
            text={'Copy uid'}
            onClick={async () => navigator.clipboard.writeText(uid)}
          />

          <Button
            margin={{ all: 'md' }}
            text={'Copy jwt'}
            onClick={async () => navigator.clipboard.writeText(jwt)}
          />

          <Button
            margin={{ all: 'md' }}
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
        </Content>
      </div>
    </Page>
  );
};

export default Index;
