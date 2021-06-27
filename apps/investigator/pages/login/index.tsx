import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  Checkbox,
  ChipGroup,
  ChipItem,
  Divider,
  EmailPasswordLoginButton,
  Field,
  FirebaseRepo,
  GoogleLoginButton,
  HrefLink,
  Page,
  Paragraph,
  Title,
} from '../../design-system';
import { CallToAction } from '../../design-system/components/call-to-action';
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

const Login = () => {
  const {
    getAccount,
    isAuthenticated,
    isFirebaseAuthenticated,
    isFetched,
  } = useAccount();

  const [accountType, setAccountType] = useState<Role>('INVESTIGATOR');
  const [email, setEmail] = useState<string>(null);
  const [password, setPassword] = useState<string>(null);

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = '/';
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isFirebaseAuthenticated && !isAuthenticated && !isFetched) {
      getAccount();
    }
  }, [getAccount, isAuthenticated, isFetched, isFirebaseAuthenticated]);

  return (
    <Page>
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
              <HrefLink href={'/forgot-password'}>Forgot password?</HrefLink>
            </div>

            <EmailPasswordLoginButton
              label={'Login'}
              email={email}
              password={password}
              repo={oauthRepo}
              onSuccess={() => {
                window.location.href = '/';
              }}
            />

            <div className={styles.noAccount}>
              <Paragraph>No account yet?</Paragraph>
              <HrefLink href={'/register'}>Create one here.</HrefLink>
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
    </Page>
  );
};

export default Login;
