// Helper functions
export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('es-ES', options);
};

export const getInitials = (nombre) => {
  return nombre
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const getColorForStatus = (estado) => {
  return estado === 'activo' ? 'var(--color-success)' : 'var(--color-warning)';
};

export const getColorForPromedio = (promedio) => {
  if (promedio >= 90) return 'var(--color-success)';
  if (promedio >= 80) return 'var(--color-primary)';
  if (promedio >= 70) return 'var(--color-warning)';
  return 'var(--color-danger)';
};

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validateForm = (data) => {
  const errors = {};
  
  if (!data.nombre || data.nombre.trim() === '') {
    errors.nombre = 'El nombre es requerido';
  }
  
  if (!data.email || data.email.trim() === '') {
    errors.email = 'El email es requerido';
  } else if (!validateEmail(data.email)) {
    errors.email = 'El email no es válido';
  }
  
  if (!data.curso || data.curso.trim() === '') {
    errors.curso = 'El curso es requerido';
  }
  
  if (!data.estado || data.estado.trim() === '') {
    errors.estado = 'El estado es requerido';
  }
  
  if (data.promedio === '' || data.promedio === null) {
    errors.promedio = 'El promedio es requerido';
  } else {
    const promedio = parseFloat(data.promedio);
    if (isNaN(promedio) || promedio < 0 || promedio > 100) {
      errors.promedio = 'El promedio debe estar entre 0 y 100';
    }
  }
  
  return errors;
};

export const calculateStats = (students) => {
  if (students.length === 0) {
    return {
      total: 0,
      activos: 0,
      promedio: 0,
      excelencia: 0
    };
  }
  
  const activos = students.filter(s => s.estado === 'activo').length;
  const promedioGeneral = students.reduce((sum, s) => sum + s.promedio, 0) / students.length;
  const excelencia = students.filter(s => s.promedio >= 90).length;
  
  return {
    total: students.length,
    activos,
    promedio: promedioGeneral.toFixed(1),
    excelencia
  };
};
