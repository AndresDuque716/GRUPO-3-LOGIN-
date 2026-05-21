import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './StudentFormModal.module.css';
import { X } from 'lucide-react';
import { courses, estados } from '../../data/mockStudents';
import { validateForm } from '../../utils/helpers';

export const StudentFormModal = ({ isOpen, student, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    curso: '',
    estado: 'activo',
    promedio: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (student) {
      setFormData(student);
    } else {
      setFormData({
        nombre: '',
        email: '',
        curso: '',
        estado: 'activo',
        promedio: ''
      });
    }
    setErrors({});
  }, [student, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSave({
      ...formData,
      promedio: parseFloat(formData.promedio),
      fechaRegistro: student?.fechaRegistro || new Date().toISOString().split('T')[0],
      id: student?.id || Date.now()
    });
  };

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            {student ? 'Editar Estudiante' : 'Nuevo Estudiante'}
          </h2>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="nombre" className={styles.label}>Nombre</label>
            <input
              id="nombre"
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={`${styles.input} ${errors.nombre ? styles.error : ''}`}
              placeholder="Nombre completo"
            />
            {errors.nombre && <span className={styles.errorText}>{errors.nombre}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`${styles.input} ${errors.email ? styles.error : ''}`}
              placeholder="correo@email.com"
            />
            {errors.email && <span className={styles.errorText}>{errors.email}</span>}
          </div>

          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label htmlFor="curso" className={styles.label}>Curso</label>
              <select
                id="curso"
                name="curso"
                value={formData.curso}
                onChange={handleChange}
                className={`${styles.select} ${errors.curso ? styles.error : ''}`}
              >
                <option value="">Seleccionar curso</option>
                {courses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
              {errors.curso && <span className={styles.errorText}>{errors.curso}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="estado" className={styles.label}>Estado</label>
              <select
                id="estado"
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                className={`${styles.select} ${errors.estado ? styles.error : ''}`}
              >
                {estados.map(est => (
                  <option key={est.value} value={est.value}>{est.label}</option>
                ))}
              </select>
              {errors.estado && <span className={styles.errorText}>{errors.estado}</span>}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="promedio" className={styles.label}>Promedio (0-100)</label>
            <input
              id="promedio"
              type="number"
              name="promedio"
              value={formData.promedio}
              onChange={handleChange}
              className={`${styles.input} ${errors.promedio ? styles.error : ''}`}
              placeholder="85"
              min="0"
              max="100"
            />
            {errors.promedio && <span className={styles.errorText}>{errors.promedio}</span>}
          </div>

          <div className={styles.footer}>
            <button type="button" className={styles.cancelButton} onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className={styles.submitButton}>
              {student ? 'Guardar Cambios' : 'Crear Estudiante'}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};
