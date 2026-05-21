import styles from './Sidebar.module.css';
import { Home, FileText, BarChart3, Settings, LogOut } from 'lucide-react';

export const Sidebar = ({ view = 'students', onNavigate }) => {
  const handleNav = (e, key) => {
    e.preventDefault();
    if (onNavigate) onNavigate(key);
  };

  return (
    <aside className={styles.sidebar}>
      {/* Logo */}
      <div className={styles.logoSection}>
        <div className={styles.logo}>
          <span className={styles.logoText}>SA</span>
        </div>
        <div>
          <h1 className={styles.logoTitle}>StudentsApp</h1>
          <p className={styles.logoSubtitle}>Sistema de Gestión</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li>
            <a href="#" onClick={(e) => handleNav(e, 'students')} className={`${styles.navLink} ${view === 'students' ? styles.active : ''}`}>
              <Home size={20} />
              <span>Estudiantes</span>
            </a>
          </li>
          <li>
            <a href="#" onClick={(e) => handleNav(e, 'recibos')} className={`${styles.navLink} ${view === 'recibos' ? styles.active : ''}`}>
              <FileText size={20} />
              <span>Recibos</span>
            </a>
          </li>
          <li>
            <a href="#" onClick={(e) => handleNav(e, 'estadisticas')} className={`${styles.navLink} ${view === 'estadisticas' ? styles.active : ''}`}>
              <BarChart3 size={20} />
              <span>Estadísticas</span>
            </a>
          </li>
          <li>
            <a href="#" onClick={(e) => handleNav(e, 'configuracion')} className={`${styles.navLink} ${view === 'configuracion' ? styles.active : ''}`}>
              <Settings size={20} />
              <span>Configuración</span>
            </a>
          </li>
        </ul>
      </nav>

      {/* User Profile Card */}
      <div className={styles.userCard}>
        <div className={styles.avatar}>A</div>
        <div className={styles.userInfo}>
          <p className={styles.userName}>Admin</p>
          <p className={styles.userEmail}>admin@app.com</p>
        </div>
        <LogOut size={18} className={styles.logoutIcon} />
      </div>
    </aside>
  );
};
