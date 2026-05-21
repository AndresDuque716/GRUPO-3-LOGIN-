import styles from './FilterPanel.module.css';
import { courses, estados } from '../../data/mockStudents';

export const FilterPanel = ({ filters, onFilterChange, onReset }) => {
  return (
    <div className={styles.panel}>
      <div className={styles.group}>
        <label className={styles.label}>Curso</label>
        <select
          className={styles.select}
          value={filters.curso}
          onChange={(e) => onFilterChange('curso', e.target.value)}
        >
          <option value="">Todos los cursos</option>
          {courses.map(course => (
            <option key={course} value={course}>{course}</option>
          ))}
        </select>
      </div>

      <div className={styles.group}>
        <label className={styles.label}>Estado</label>
        <select
          className={styles.select}
          value={filters.estado}
          onChange={(e) => onFilterChange('estado', e.target.value)}
        >
          <option value="">Todos los estados</option>
          {estados.map(estado => (
            <option key={estado.value} value={estado.value}>{estado.label}</option>
          ))}
        </select>
      </div>

      <button className={styles.resetButton} onClick={onReset}>
        Limpiar Filtros
      </button>
    </div>
  );
};
