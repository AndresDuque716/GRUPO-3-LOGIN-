import { memo, useCallback } from 'react';
import styles from './Header.module.css';
import { Menu, Bell } from 'lucide-react';

const HeaderComponent = ({ sidebarOpen, onMenuToggle, totalStudents, filteredStudents }) => {
  const handleMenuClick = useCallback(() => {
    onMenuToggle();
  }, [onMenuToggle]);

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.titleSection}>
          {sidebarOpen !== undefined && (
            <button className={styles.menuButton} onClick={handleMenuClick}>
              <Menu size={24} />
            </button>
          )}
          <div>
            <h1 className={styles.title}>Estudiantes</h1>
            <p className={styles.subtitle}>
              {filteredStudents} de {totalStudents} estudiantes
            </p>
          </div>
        </div>
        <button className={styles.notificationButton}>
          <Bell size={20} />
          <span className={styles.notificationBadge}>3</span>
        </button>
      </div>
    </header>
  );
};

export const Header = memo(HeaderComponent);
