import { memo } from 'react';
import styles from './StatsCard.module.css';

const StatsCardComponent = ({ icon: Icon, title, value, color, trend }) => {
  return (
    <div className={styles.card} style={{ borderTopColor: color }}>
      <div className={styles.iconWrapper} style={{ backgroundColor: `${color}20` }}>
        <Icon size={28} style={{ color }} />
      </div>
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        <div className={styles.valueSection}>
          <p className={styles.value}>{value}</p>
          {trend && (
            <span className={`${styles.trend} ${styles[trend.type]}`}>
              {trend.icon} {trend.text}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export const StatsCard = memo(StatsCardComponent);
