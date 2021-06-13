import { useState } from 'react';
import { Button, Field, Layout, Title } from '../../../design-system';
import { useAccount } from '../../../providers/auth/use-account.hook';
import styles from './style.module.scss';
import { Sex, useOnboardInvestigatorMutation } from '@gql';
import { getHeaders } from '../../../providers/graphql/gql.headers';
import { useEffect } from 'react';

const Onboarding = () => {
  const { firebaseUser, uid, jwt, logout } = useAccount();
  const [name, setName] = useState(firebaseUser.displayName);
  const [sex, setSex] = useState(Sex.Male);
  const [dateOfBirth, setDateOfBirth] = useState('1990-01-01');
  const {
    getAccount,
    isLoading: fetchAccountLoading,
    isFetched,
  } = useAccount();
  const [
    createAccount,
    { loading: createAccountLoading },
  ] = useOnboardInvestigatorMutation({
    variables: { name, sex, dateOfBirth },
    context: getHeaders(uid, jwt),
  });

  useEffect(() => {
    window.location.href = '/';
  }, [isFetched]);

  return (
    <Layout>
      <div className={styles.page}>
        <Title>Onboarding</Title>
        <div>
          <Field
            label={'Name'}
            hint={firebaseUser.displayName}
            initialValue={firebaseUser.displayName}
            onTextEntered={(name: string) => setName(name.trim())}
            showError={name.trim().length === 0}
          />
          <Field
            label={'Email'}
            hint={firebaseUser.email}
            initialValue={firebaseUser.email}
            disabled
          />
          <Field label={'Sex'} hint={sex} initialValue={sex} disabled />
          <Field
            label={'Date of birth'}
            hint={dateOfBirth}
            initialValue={dateOfBirth}
            disabled
          />

          <Button
            text={'Next'}
            onClick={async () => {
              createAccount();
              getAccount();
            }}
          />
          <Button
            text={'Cancel'}
            onClick={async () => {
              await logout();
              window.location.href = '/';
            }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Onboarding;
