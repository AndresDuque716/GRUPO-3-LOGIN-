import styles from './EmptyState.module.css';
import { Users } from 'lucide-react';

export const EmptyState = ({ icon: Icon = Users, title, message, action }) => {
  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        <Icon size={48} />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.message}>{message}</p>
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
};
