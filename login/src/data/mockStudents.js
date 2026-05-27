// Mock data for students
export const initialStudents = [
  {
    id: 1,
    nombre: 'Carlos Rodríguez',
    email: 'carlos.rodriguez@email.com',
    curso: 'Desarrollo Web Full Stack',
    estado: 'activo',
    promedio: 92,
    fechaRegistro: '2024-01-15',
    pago: {
      estado: 'pagado',
      monto: 200.00,
      fechaPago: '2024-01-20',
      metodo: 'Tarjeta de Crédito',
      numeroRecibo: 'REC-001-2024'
    }
  },
  {
    id: 2,
    nombre: 'María García López',
    email: 'maria.garcia@email.com',
    curso: 'Data Science',
    estado: 'activo',
    promedio: 88,
    fechaRegistro: '2024-01-20',
    pago: {
      estado: 'pagado',
      monto: 200.00,
      fechaPago: '2024-01-25',
      metodo: 'Transferencia Bancaria',
      numeroRecibo: 'REC-002-2024'
    }
  },
  {
    id: 3,
    nombre: 'Juan Martínez Pérez',
    email: 'juan.martinez@email.com',
    curso: 'Diseño UX/UI',
    estado: 'activo',
    promedio: 95,
    fechaRegistro: '2024-01-18',
    pago: {
      estado: 'pagado',
      monto: 200.00,
      fechaPago: '2024-01-22',
      metodo: 'Efectivo',
      numeroRecibo: 'REC-003-2024'
    }
  },
  {
    id: 4,
    nombre: 'Ana Sánchez Ruiz',
    email: 'ana.sanchez@email.com',
    curso: 'Ciberseguridad',
    estado: 'inactivo',
    promedio: 78,
    fechaRegistro: '2024-02-01',
    pago: {
      estado: 'pendiente',
      monto: 200.00,
      fechaPago: null,
      metodo: null,
      numeroRecibo: null
    }
  },
  {
    id: 5,
    nombre: 'Luis Fernández González',
    email: 'luis.fernandez@email.com',
    curso: 'Desarrollo Web Full Stack',
    estado: 'activo',
    promedio: 91,
    fechaRegistro: '2024-02-05',
    pago: {
      estado: 'pagado',
      monto: 200.00,
      fechaPago: '2024-02-08',
      metodo: 'Tarjeta de Débito',
      numeroRecibo: 'REC-005-2024'
    }
  },
  {
    id: 6,
    nombre: 'Sofía Ramírez Torres',
    email: 'sofia.ramirez@email.com',
    curso: 'Data Science',
    estado: 'activo',
    promedio: 89,
    fechaRegistro: '2024-02-10',
    pago: {
      estado: 'pagado',
      monto: 200.00,
      fechaPago: '2024-02-12',
      metodo: 'Transferencia Bancaria',
      numeroRecibo: 'REC-006-2024'
    }
  },
  {
    id: 7,
    nombre: 'Diego López Castro',
    email: 'diego.lopez@email.com',
    curso: 'Diseño UX/UI',
    estado: 'activo',
    promedio: 93,
    fechaRegistro: '2024-02-12',
    pago: {
      estado: 'pagado',
      monto: 200.00,
      fechaPago: '2024-02-15',
      metodo: 'Tarjeta de Crédito',
      numeroRecibo: 'REC-007-2024'
    }
  },
  {
    id: 8,
    nombre: 'Elena Moreno Silva',
    email: 'elena.moreno@email.com',
    curso: 'Ciberseguridad',
    estado: 'activo',
    promedio: 87,
    fechaRegistro: '2024-02-15',
    pago: {
      estado: 'pagado',
      monto: 200.00,
      fechaPago: '2024-02-18',
      metodo: 'Efectivo',
      numeroRecibo: 'REC-008-2024'
    }
  },
  {
    id: 9,
    nombre: 'Roberto Díaz Hernández',
    email: 'roberto.diaz@email.com',
    curso: 'Desarrollo Web Full Stack',
    estado: 'inactivo',
    promedio: 75,
    fechaRegistro: '2024-02-18',
    pago: {
      estado: 'pendiente',
      monto: 200.00,
      fechaPago: null,
      metodo: null,
      numeroRecibo: null
    }
  },
  {
    id: 10,
    nombre: 'Valentina Gómez Romero',
    email: 'valentina.gomez@email.com',
    curso: 'Data Science',
    estado: 'activo',
    promedio: 90,
    fechaRegistro: '2024-02-20',
    pago: {
      estado: 'pagado',
      monto: 200.00,
      fechaPago: '2024-02-22',
      metodo: 'Transferencia Bancaria',
      numeroRecibo: 'REC-010-2024'
    }
  }
];

export const courses = [
  'Desarrollo Web Full Stack',
  'Data Science',
  'Diseño UX/UI',
  'Ciberseguridad'
];

export const estados = [
  { label: 'Activo', value: 'activo' },
  { label: 'Inactivo', value: 'inactivo' }
];
