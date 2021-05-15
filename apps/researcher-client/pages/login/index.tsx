import React, { useState } from 'react';
import Image from 'next/image';
import {
  EditText,
  Card,
  Divider,
  Link,
  ChipItem,
  Title,
  Paragraph,
  Heading,
} from '../../design-system';
import { GoogleLoginButton } from '../../components/buttons/oauth/google-login.button';
import styles from './login.module.scss';
import { FirebaseRepo } from '../../components/buttons/oauth/firebase.repo';
import { firebaseClient } from '../../providers/auth/firebase.client';
import { ChipGroup } from '../../design-system';
import { EmailPasswordLoginButton } from '../../components/buttons/oauth/email-password.button';

const oauthRepo = new FirebaseRepo(firebaseClient);
const chips: ChipItem[] = [
  {
    name: 'Investigator',
  },
  {
    name: 'Candidate',
  },
];

const redirectOnSignIn = () => {
  window.location.href = '/';
};

const OnboardingGraphCard = () => {
  return (
    <Card>
      <Image
        src={'/static/images/onboarding-graph.svg'}
        width={192}
        height={192}
      />
    </Card>
  );
};

const OnboardingSearchCard = () => {
  return (
    <Card>
      <Image
        src={'/static/images/onboarding-search.svg'}
        width={192}
        height={192}
      />
    </Card>
  );
};

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

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
          <ChipGroup chips={chips} />
        </div>

        <div className={styles.oauth}>
          <GoogleLoginButton repo={oauthRepo} onSuccess={redirectOnSignIn} />
        </div>

        <div className={styles.divider}>
          <Divider text={'Or sign in by email'} />
        </div>

        <div className={styles.credentials}>
          <EditText
            label={'Email'}
            hint={'Your email'}
            onTextEntered={(email) => setEmail(email)}
          />

          <EditText
            label={'Password'}
            hint={'Your password'}
            onTextEntered={(password) => setPassword(password)}
          />

          <EmailPasswordLoginButton
            email={email}
            password={password}
            repo={oauthRepo}
            onSuccess={redirectOnSignIn}
          />

          <div className={styles.noAccount}>
            <Paragraph>No account?</Paragraph>
            <Link>Create one here</Link>
          </div>
        </div>
      </section>
      <section className={styles.blurb}>
        <div className={styles.content}>
          <div className={styles.cards}>
            <OnboardingSearchCard />
            <div className={styles.card}>
              <OnboardingGraphCard />
            </div>
          </div>
          <div className={styles.heading}>
            <Heading>Empower your clinical trials with confidence</Heading>
          </div>
          <div className={styles.description}>
            <Paragraph>Empower your clinical trials with confidence</Paragraph>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
