import { Sex, useOnboardInvestigatorMutation } from '@gql';
import { useEffect, useState } from 'react';
import { Button, Field, Page, Title } from '../../../design-system';
import { useAccount } from '../../../providers/auth/use-account.hook';
import styles from './style.module.scss';

const Onboarding = () => {
  const {
    firebaseUser,
    uid,
    jwt,
    logout,
    getAccount,
    isLoading: fetchAccountLoading,
    isFetched,
  } = useAccount();
  const [name, setName] = useState(firebaseUser.displayName);
  const [sex, setSex] = useState(Sex.Male);
  const [dateOfBirth, setDateOfBirth] = useState('1990-01-01');
  const [
    createAccount,
    { loading: createAccountLoading },
  ] = useOnboardInvestigatorMutation({
    variables: { name, sex, dateOfBirth },
    context: {
      headers: {
        'x-firebase-uid': uid,
        authorization: `Bearer ${jwt}`,
      },
    },
  });

  useEffect(() => {
    if (isFetched) {
      window.location.href = '/';
    }
  }, [isFetched]);

  return (
    <Page>
      <div className={styles.page}>
        <Title>Onboarding</Title>
        <div>
          <Field
            label={'Name'}
            hint={firebaseUser.displayName}
            initialValue={firebaseUser.displayName}
            onTextEntered={(name: string) => setName(name.trim())}
            showError={name.length === 0}
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
              await createAccount();
              getAccount();
            }}
          />
          <Button
            text={'Cancel'}
            onClick={async () => {
              await logout();
            }}
          />
        </div>
      </div>
    </Page>
  );
};

export default Onboarding;
