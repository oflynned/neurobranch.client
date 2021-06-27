import Image from 'next/image';
import { useState } from 'react';
import {
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
  const [accountType, setAccountType] = useState<Role>('INVESTIGATOR');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>(null);
  const [password, setPassword] = useState<string>(null);
  const [repeatPassword, setRepeatPassword] = useState<string>(null);

  const isInvestigator = accountType === 'INVESTIGATOR';

  return (
    <Page>
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
              <Title>Register</Title>
            </div>

            <div className={styles.subtitle}>
              {isInvestigator ? (
                <Paragraph>
                  I want to run a clinical trial and care about collecting data
                  for a research-based study.
                </Paragraph>
              ) : (
                <Paragraph>
                  I want to join clinical trials and help the scientific
                  community to understand my ailments better.
                </Paragraph>
              )}
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
              label={'Sign up with Google'}
              onClick={() => setIsLoading(true)}
              repo={oauthRepo}
              onSignedIn={() => {
                window.location.href = '/';
              }}
            />
          </div>

          <div className={styles.divider}>
            <Divider text={'Or sign up by email'} />
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

            <div className={styles.repeatPassword}>
              <Field
                error={'Passwords do not match'}
                showError={password !== repeatPassword}
                type={'password'}
                label={'Confirm password'}
                hint={'Your password'}
                onTextEntered={(password) => setRepeatPassword(password)}
              />
            </div>

            <EmailPasswordLoginButton
              label={'Register'}
              email={email}
              password={password}
              repo={oauthRepo}
              onClick={() => setIsLoading(true)}
              onSuccess={() => {
                window.location.href = '/';
              }}
            />

            <div className={styles.haveAccount}>
              <Paragraph>Already have an account?</Paragraph>
              <HrefLink href={'/login'}>Login here.</HrefLink>
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
            {isInvestigator ? (
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
