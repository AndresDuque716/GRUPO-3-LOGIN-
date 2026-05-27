import styles from './StatsCard.module.css';

export const StatsCard = ({ icon: Icon, title, value, color, variant = 'dark' }) => {
  const valueColor = variant === 'light' ? color ?? '#111827' : color;

  return (
    <div className={`${styles.card} ${variant === 'light' ? styles.light : styles.dark}`}>
      <div className={styles.cardHeader}>
        {Icon && (
          <div className={`${styles.iconWrapper} ${variant === 'light' ? styles.iconLight : ''}`}>
            <Icon className={styles.icon} />
          </div>
        )}
        <div className={styles.cardInfo}>
          <p className={styles.cardValue} style={{ color: valueColor }}>{value}</p>
          <p className={styles.cardTitle}>{title}</p>
        </div>
      </div>
    </div>
  );
};