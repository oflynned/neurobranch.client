import { Title } from '../../design-system';
import { NavBar } from '../../components/nav-bar';

import styles from './style.module.scss';

const Index = () => {
  return (
    <div className={styles.page}>
      <div className={styles.nav}>
        <NavBar activePage={'HOME'} />
      </div>
      <section className={styles.content}>
        <Title>Dashboard</Title>
      </section>
    </div>
  );
};

export default Index;
