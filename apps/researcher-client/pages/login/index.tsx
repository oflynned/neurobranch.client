import React, { FC, useState } from 'react';
import Image from 'next/image';
import {
  Field,
  Card,
  Divider,
  Link,
  ChipItem,
  Title,
  Paragraph,
  Heading,
  ChipGroup,
  Checkbox,
  GoogleLoginButton,
  FirebaseRepo,
  EmailPasswordLoginButton,
} from '../../design-system';
import styles from './style.module.scss';
import { firebaseClient } from '../../providers/auth/firebase.client';

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
  backgroundSrc: string;
  foregroundSrc: string;
};

const CallToAction: FC<CallToActionProps> = ({
  title,
  subtitle,
  foregroundSrc,
  backgroundSrc,
}) => {
  return (
    <>
      <div className={styles.cards}>
        <Card>
          <Image src={backgroundSrc} width={192} height={192} />
        </Card>

        <div className={styles.card}>
          <Card>
            <Image src={foregroundSrc} width={192} height={192} />
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
  const [accountType, setAccountType] = useState<Role>('INVESTIGATOR');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>(null);
  const [password, setPassword] = useState<string>(null);

  return (
    <div className={styles.page}>
      <section className={styles.login}>
        <div className={styles.intro}>
          <Image
            className={styles.bolt}
            src={'/static/images/bolt.svg'}
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
          <GoogleLoginButton
            label={'Sign in with Google'}
            onClick={() => setIsLoading(true)}
            repo={oauthRepo}
            onSuccess={redirectOnSignIn}
          />
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
            <Link>Forgot password?</Link>
          </div>

          <EmailPasswordLoginButton
            label={'Login'}
            email={email}
            password={password}
            repo={oauthRepo}
            onClick={() => setIsLoading(true)}
            onSuccess={redirectOnSignIn}
          />

          <div className={styles.noAccount}>
            <Paragraph>No account yet?</Paragraph>
            <Link
              onClick={() => {
                window.location.href = '/register';
              }}
            >
              Create one here.
            </Link>
          </div>
        </div>
      </section>
      <section className={styles.blurb}>
        <div className={styles.logo}>
          <Image
            src={'/static/images/neurobranch.png'}
            width={192}
            height={92}
          />
        </div>

        <div className={styles.content}>
          {accountType === 'INVESTIGATOR' ? (
            <CallToAction
              title={'Empower your clinical trials with confidence'}
              subtitle={
                'Enroll groups of sufficiently randomised cohorts into your trial and get the insights you need in real-time.'
              }
              foregroundSrc={'/static/images/onboarding-graph.svg'}
              backgroundSrc={'/static/images/onboarding-search.svg'}
            />
          ) : (
            <CallToAction
              title={'Be a part of advancing scientific research'}
              subtitle={
                'Clinical trials provide the basis for the understanding of behaviour and the development of new drugs, biological products and medical devices.'
              }
              foregroundSrc={'/static/images/onboarding-doctor.svg'}
              backgroundSrc={'/static/images/onboarding-laptop.svg'}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default Login;
