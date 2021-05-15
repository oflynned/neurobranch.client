import React, { useState } from 'react';
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
} from '../../design-system';
import {
  GoogleLoginButton,
  FirebaseRepo,
  EmailPasswordLoginButton,
} from '../../components';
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

const BoldIcon = () => {
  return (
    <Image
      className={styles.bolt}
      src={'/static/images/bolt.svg'}
      width={48}
      height={48}
    />
  );
};

const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>(null);
  const [password, setPassword] = useState<string>(null);

  return (
    <div className={styles.page}>
      <section className={styles.login}>
        <div className={styles.intro}>
          <BoldIcon />

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
          <GoogleLoginButton
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
            <Checkbox label={'Remember me'} prechecked />
            <Link>Forgot password?</Link>
          </div>

          <EmailPasswordLoginButton
            email={email}
            password={password}
            repo={oauthRepo}
            onClick={() => setIsLoading(true)}
            onSuccess={redirectOnSignIn}
          />

          <div className={styles.noAccount}>
            <Paragraph>No account yet?</Paragraph>
            <Link>Create one here.</Link>
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
