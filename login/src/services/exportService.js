// Export service for CSV and JSON formats
export const exportToCSV = (students, filename = 'estudiantes.csv') => {
  const headers = ['ID', 'Nombre', 'Email', 'Curso', 'Estado', 'Promedio', 'Fecha de Registro'];
  const rows = students.map(student => [
    student.id,
    student.nombre,
    student.email,
    student.curso,
    student.estado,
    student.promedio,
    student.fechaRegistro
  ]);
  
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToJSON = (students, filename = 'estudiantes.json') => {
  const jsonContent = JSON.stringify(students, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
