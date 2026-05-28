import { memo, useCallback } from 'react';
import styles from './FilterPanel.module.css';
import { courses, estados } from '../../data/mockStudents';

const FilterPanelComponent = ({ filters, onFilterChange, onReset }) => {
  const handleCourseChange = useCallback((e) => {
    onFilterChange('curso', e.target.value);
  }, [onFilterChange]);

  const handleEstadoChange = useCallback((e) => {
    onFilterChange('estado', e.target.value);
  }, [onFilterChange]);

  return (
    <div className={styles.panel}>
      <div className={styles.group}>
        <label className={styles.label}>Curso</label>
        <select
          className={styles.select}
          value={filters.curso}
          onChange={handleCourseChange}
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
          onChange={handleEstadoChange}
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

export const FilterPanel = memo(FilterPanelComponent);
