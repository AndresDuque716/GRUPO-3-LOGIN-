import styles from './StudentTable.module.css';
import { Edit2, Trash2 } from 'lucide-react';
import { formatDate } from '../../utils/helpers';

export const StudentTable = ({ students, onEdit, onDelete }) => {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Estudiante</th>
            <th>Email</th>
            <th>Curso</th>
            <th>Estado</th>
            <th>Promedio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id} className={styles.row}>
              <td className={styles.studentCell}>
                <div className={styles.studentInfo}>
                  <div className={styles.avatar}>{student.nombre.charAt(0)}</div>
                  <div>
                    <p className={styles.studentName}>{student.nombre}</p>
                    <p className={styles.studentDate}>{formatDate(student.fechaRegistro)}</p>
                  </div>
                </div>
              </td>
              <td>{student.email}</td>
              <td>
                <span className={styles.course}>{student.curso}</span>
              </td>
              <td>
                <span className={`${styles.badge} ${styles[student.estado]}`}>
                  {student.estado === 'activo' ? 'Activo' : 'Inactivo'}
                </span>
              </td>
              <td>
                <span className={`${styles.promedio} ${styles[getPromedioClass(student.promedio)]}`}>
                  {student.promedio}%
                </span>
              </td>
              <td>
                <div className={styles.actions}>
                  <button
                    className={styles.actionButton}
                    onClick={() => onEdit(student)}
                    title="Editar"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    className={styles.actionButton}
                    onClick={() => onDelete(student)}
                    title="Eliminar"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const getPromedioClass = (promedio) => {
  if (promedio >= 90) return 'excellent';
  if (promedio >= 80) return 'good';
  if (promedio >= 70) return 'average';
  return 'low';
};
