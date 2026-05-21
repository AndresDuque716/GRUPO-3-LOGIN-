import styles from './MobileNavbar.module.css';
import { Home, FileText, BarChart3, Settings } from 'lucide-react';

export const MobileNavbar = ({ view = 'students', onNavigate }) => {
  const handleNav = (e, key) => {
    e.preventDefault();
    if (onNavigate) onNavigate(key);
  };

  return (
    <nav className={styles.navbar}>
      <a href="#" onClick={(e) => handleNav(e, 'students')} className={`${styles.navItem} ${view === 'students' ? styles.active : ''}`}>
        <Home size={24} />
        <span className={styles.label}>Estudiantes</span>
      </a>
      <a href="#" onClick={(e) => handleNav(e, 'recibos')} className={`${styles.navItem} ${view === 'recibos' ? styles.active : ''}`}>
        <FileText size={24} />
        <span className={styles.label}>Recibos</span>
      </a>
      <a href="#" onClick={(e) => handleNav(e, 'estadisticas')} className={`${styles.navItem} ${view === 'estadisticas' ? styles.active : ''}`}>
        <BarChart3 size={24} />
        <span className={styles.label}>Estadísticas</span>
      </a>
      <a href="#" onClick={(e) => handleNav(e, 'configuracion')} className={`${styles.navItem} ${view === 'configuracion' ? styles.active : ''}`}>
        <Settings size={24} />
        <span className={styles.label}>Configuración</span>
      </a>
    </nav>
  );
};
