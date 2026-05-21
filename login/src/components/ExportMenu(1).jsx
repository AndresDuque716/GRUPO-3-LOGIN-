import { useState, useRef } from 'react';
import styles from './ExportMenu.module.css';
import { Download, ChevronDown } from 'lucide-react';
import { exportToCSV, exportToJSON } from '../services/exportService';

export const ExportMenu = ({ students, onExport }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const handleExportCSV = () => {
    if (students.length === 0) {
      onExport('No hay estudiantes para exportar', 'warning');
      return;
    }
    exportToCSV(students);
    onExport(`${students.length} estudiantes exportados a CSV`, 'success');
    setIsOpen(false);
  };

  const handleExportJSON = () => {
    if (students.length === 0) {
      onExport('No hay estudiantes para exportar', 'warning');
      return;
    }
    exportToJSON(students);
    onExport(`${students.length} estudiantes exportados a JSON`, 'success');
    setIsOpen(false);
  };

  return (
    <div className={styles.container} ref={menuRef}>
      <button
        className={styles.button}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Download size={20} />
        Exportar
        <ChevronDown size={18} style={{ transform: isOpen ? 'rotate(180deg)' : '' }} />
      </button>

      {isOpen && (
        <div className={styles.menu}>
          <button className={styles.menuItem} onClick={handleExportCSV}>
            Exportar a CSV
          </button>
          <button className={styles.menuItem} onClick={handleExportJSON}>
            Exportar a JSON
          </button>
        </div>
      )}
    </div>
  );
};
