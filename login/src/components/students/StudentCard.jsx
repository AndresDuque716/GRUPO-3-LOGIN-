import styles from './StudentCard.module.css';
import { Edit2, Trash2, Award } from 'lucide-react';
import { formatDate, getPromedioHexColor } from '../../utils/helpers';

export const StudentCard = ({ student, onEdit, onDelete }) => {

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.avatar}>{student.nombre.charAt(0)}</div>
        <div className={styles.info}>
          <h3 className={styles.name}>{student.nombre}</h3>
          <p className={styles.email}>{student.email}</p>
        </div>
        <span className={`${styles.badge} ${styles[student.estado]}`}>
          {student.estado === 'activo' ? 'Activo' : 'Inactivo'}
        </span>
      </div>

      <div className={styles.body}>
        <div className={styles.field}>
          <span className={styles.label}>Curso</span>
          <p className={styles.value}>{student.curso}</p>
        </div>

        <div className={styles.field}>
          <span className={styles.label}>Registro</span>
          <p className={styles.value}>{formatDate(student.fechaRegistro)}</p>
        </div>

        <div className={styles.promedioContainer}>
          <div className={styles.promedioText}>
            <span className={styles.label}>Promedio</span>
            <div className={styles.promedioValue} style={{ color: getPromedioHexColor(student.promedio) }}>
              <Award size={16} />
              {student.promedio}%
            </div>
          </div>
          <div className={styles.promedioBar}>
            <div
              className={styles.promedioFill}
              style={{
                width: `${student.promedio}%`,
                backgroundColor: getPromedioHexColor(student.promedio)
              }}
            />
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <button
          className={styles.button}
          onClick={() => onEdit(student)}
          title="Editar"
        >
          <Edit2 size={18} />
          Editar
        </button>
        <button
          className={styles.button}
          onClick={() => onDelete(student)}
          title="Eliminar"
        >
          <Trash2 size={18} />
          Eliminar
        </button>
      </div>
    </div>
  );
};
