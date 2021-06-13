import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import {
  AnchorLink,
  Card,
  Checkbox,
  ChipGroup,
  ChipItem,
  Divider,
  EmailPasswordLoginButton,
  Field,
  FirebaseRepo,
  GoogleLoginButton,
  Heading,
  Layout,
  Paragraph,
  Title,
} from '../../design-system';
import { firebaseClient } from '../../providers/auth/firebase.client';
import { useAccount } from '../../providers/auth/use-account.hook';
import styles from './style.module.scss';

const oauthRepo = new FirebaseRepo(firebaseClient);
const chips: ChipItem[] = [
  {
    label: 'Investigator',
  },
  {
    label: 'Candidate',
  },
];

type Role = 'INVESTIGATOR' | 'CANDIDATE';

const redirectOnSignIn = () => {
  window.location.href = '/';
};

type CallToActionProps = {
  title: string;
  subtitle: string;
  images: {
    src: string;
    alt: string;
  }[];
};

const CallToAction: FC<CallToActionProps> = ({ title, subtitle, images }) => {
  const [foreground, background] = images;

  return (
    <>
      <div className={styles.cards}>
        <Card>
          <Image
            src={background.src}
            alt={background.alt}
            width={192}
            height={192}
          />
        </Card>

        <div className={styles.card}>
          <Card>
            <Image
              src={foreground.src}
              alt={foreground.alt}
              width={192}
              height={192}
            />
          </Card>
        </div>
      </div>
      <div className={styles.heading}>
        <Heading>{title}</Heading>
      </div>
      <div className={styles.description}>
        <Paragraph>{subtitle}</Paragraph>
      </div>
    </>
  );
};

const Login = () => {
  const {
    account,
    getAccount,
    isLoading,
    isAuthenticated,
    isFetched,
    logout,
  } = useAccount();
  const [accountType, setAccountType] = useState<Role>('INVESTIGATOR');
  const [email, setEmail] = useState<string>(null);
  const [password, setPassword] = useState<string>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    if (isAuthenticated && !isLoading) {
      getAccount();
      return;
    }
  }, [isAuthenticated, account, logout, getAccount, isLoading]);

  useEffect(() => {
    if (isFetched) {
      window.location.href = '/';
    }
  }, [isFetched]);

  return (
    <Layout>
      <div className={styles.page}>
        <section className={styles.login}>
          <div className={styles.intro}>
            <Image
              className={styles.bolt}
              src={'/static/images/bolt.svg'}
              alt={'Bolt icon'}
              width={48}
              height={48}
            />

            <div className={styles.title}>
              <Title>Login</Title>
            </div>

            <div className={styles.subtitle}>
              <Paragraph>
                Grow your clinical trial user base and get real-time context.
              </Paragraph>
            </div>
          </div>

          <div className={styles.roles}>
            <ChipGroup
              chips={chips}
              onSelection={(chip, index) => {
                if (index === 0) {
                  setAccountType('INVESTIGATOR');
                } else {
                  setAccountType('CANDIDATE');
                }
              }}
            />
          </div>

          <div className={styles.oauth}>
            <GoogleLoginButton label={'Sign in with Google'} repo={oauthRepo} />
          </div>

          <div className={styles.divider}>
            <Divider text={'Or login with Neurobranch'} />
          </div>

          <div className={styles.credentials}>
            <div className={styles.email}>
              <Field
                label={'Email'}
                hint={'Your email'}
                onTextEntered={(email) => setEmail(email)}
              />
            </div>

            <div className={styles.password}>
              <Field
                type={'password'}
                label={'Password'}
                hint={'Your password'}
                onTextEntered={(password) => setPassword(password)}
              />
            </div>

            <div className={styles.rememberMe}>
              <Checkbox label={'Remember me'} />
              <AnchorLink href={'/forgot-password'}>
                Forgot password?
              </AnchorLink>
            </div>

            <EmailPasswordLoginButton
              label={'Login'}
              email={email}
              password={password}
              repo={oauthRepo}
              onSuccess={redirectOnSignIn}
            />

            <div className={styles.noAccount}>
              <Paragraph>No account yet?</Paragraph>
              <AnchorLink href={'/register'}>Create one here.</AnchorLink>
            </div>
          </div>
        </section>
        <section className={styles.blurb}>
          <div className={styles.logo}>
            <Image
              alt={'Neurobranch platform logo'}
              src={'/static/images/neurobranch.png'}
              width={192}
              height={90}
            />
          </div>

          <div className={styles.content}>
            {accountType === 'INVESTIGATOR' ? (
              <CallToAction
                title={'Empower your clinical trials with confidence'}
                subtitle={
                  'Enroll groups of sufficiently randomised cohorts into your trial and get the insights you need in real-time.'
                }
                images={[
                  {
                    src: '/static/images/onboarding-graph.svg',
                    alt: 'Person placing graph points',
                  },
                  {
                    src: '/static/images/onboarding-search.svg',
                    alt: 'Scientist holding a magnifying glass',
                  },
                ]}
              />
            ) : (
              <CallToAction
                title={'Be a part of advancing scientific research'}
                subtitle={
                  'Clinical trials provide the basis for the understanding of behaviour and the development of new drugs, biological products and medical devices.'
                }
                images={[
                  {
                    src: '/static/images/onboarding-doctor.svg',
                    alt: 'Doctors conversing about health',
                  },
                  {
                    src: '/static/images/onboarding-laptop.svg',
                    alt: 'Man looking at a giant smartphone',
                  },
                ]}
              />
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Login;
