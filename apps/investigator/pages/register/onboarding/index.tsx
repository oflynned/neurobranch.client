import { Button, Field, Layout, Title } from '../../../design-system';
import { useAccount } from '../../../providers/auth/use-account.hook';
import styles from './style.module.scss';

const Onboarding = () => {
  const { firebaseUser, logout } = useAccount();

  return (
    <Layout>
      <div className={styles.page}>
        <Title>Onboarding</Title>
        <div>
          <Field
            label={'Name'}
            hint={firebaseUser.displayName}
            initialValue={firebaseUser.displayName}
          />
          <Field
            label={'Email'}
            hint={firebaseUser.email}
            initialValue={firebaseUser.email}
            disabled
          />
          <Button text={'Next'} />
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
