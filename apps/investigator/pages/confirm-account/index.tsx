import styles from './styles.module.scss';
import { Field, Heading, Layout, Title } from '../../design-system';
import { useFirebase } from '../../providers/auth';
import { useEffect, useState } from 'react';

const ConfirmAccount = () => {
  const { user, isAuthenticated } = useFirebase();
  const [name, setName] = useState('');

  useEffect(() => {
    setName(user.displayName);
  }, [user]);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className={styles.page}>
        <Title>Confirm account</Title>
        <Field
          text={user.displayName}
          label={'Name'}
          onTextEntered={(text) => setName(text)}
          error={'Please enter your name'}
          showError={name.trim().length === 0}
        />
        <Field hint={'dd/mm/yyyy'} label={'Date of birth'} />
        <Field hint={user.email} label={'Email'} disabled />
      </div>

      <code>Name: {name}</code>
    </Layout>
  );
};

export default ConfirmAccount;
