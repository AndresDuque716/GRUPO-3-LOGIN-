import styles from './MobileNavbar.module.css';
import { Home, FileText, BarChart3, Settings } from 'lucide-react';

export const MobileNavbar = () => {
  return (
    <nav className={styles.navbar}>
      <a href="#" className={`${styles.navItem} ${styles.active}`}>
        <Home size={24} />
        <span className={styles.label}>Estudiantes</span>
      </a>
      <a href="#" className={styles.navItem}>
        <FileText size={24} />
        <span className={styles.label}>Recibos</span>
      </a>
      <a href="#" className={styles.navItem}>
        <BarChart3 size={24} />
        <span className={styles.label}>Estadísticas</span>
      </a>
      <a href="#" className={styles.navItem}>
        <Settings size={24} />
        <span className={styles.label}>Configuración</span>
      </a>
    </nav>
  );
};
