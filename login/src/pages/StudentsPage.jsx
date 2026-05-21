import { useState, useMemo } from 'react';
import styles from './StudentsPage.module.css';
import { Sidebar } from '../components/layout/Sidebar';
import { Header } from '../components/layout/Header';
import { MobileNavbar } from '../components/layout/MobileNavbar';
import { StatsCard } from '../components/stats/StatsCard';
import { SearchBar } from '../components/filters/SearchBar';
import { FilterPanel } from '../components/filters/FilterPanel';
import { StudentTable } from '../components/students/StudentTable';
import { StudentCard } from '../components/students/StudentCard';
import { StudentFormModal } from '../components/students/StudentFormModal';
import { ConfirmDialog } from '../components/students/ConfirmDialog';
import { EmptyState } from '../components/common/EmptyState';
import { ToastContainer } from '../components/common/Toast';
import { Button } from '../components/common/Button';
import { ExportMenu } from '../components/ExportMenu';
import { useResponsive } from '../hooks/useResponsive';
import { initialStudents } from '../data/mockStudents';
import { calculateStats } from '../utils/helpers';
import { Plus, Users, TrendingUp, Award, Zap } from 'lucide-react';

export const StudentsPage = () => {
  const [students, setStudents] = useState(initialStudents);
  const [view, setView] = useState('students');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ curso: '', estado: '' });
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const { isMobile, isDesktop } = useResponsive();

  // Filter students based on search and filters
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchSearch = student.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCurso = filters.curso === '' || student.curso === filters.curso;
      const matchEstado = filters.estado === '' || student.estado === filters.estado;
      return matchSearch && matchCurso && matchEstado;
    });
  }, [students, searchQuery, filters]);

  // Calculate statistics
  const stats = calculateStats(filteredStudents);

  // Toast notification
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type, duration: 3000 }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Handle add new student
  const handleNewStudent = () => {
    setSelectedStudent(null);
    setFormOpen(true);
  };

  // Handle edit student
  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setFormOpen(true);
  };

  // Handle save student
  const handleSaveStudent = (studentData) => {
    if (selectedStudent) {
      // Update existing student
      setStudents(prev => prev.map(s => s.id === studentData.id ? studentData : s));
      showToast('Estudiante actualizado correctamente', 'success');
    } else {
      // Add new student
      setStudents(prev => [...prev, studentData]);
      showToast('Estudiante agregado correctamente', 'success');
    }
    setFormOpen(false);
  };

  // Handle delete student
  const handleDeleteStudent = (student) => {
    setStudentToDelete(student);
    setDeleteDialogOpen(true);
  };

  // Confirm delete
  const handleConfirmDelete = () => {
    if (studentToDelete) {
      setStudents(prev => prev.filter(s => s.id !== studentToDelete.id));
      showToast('Estudiante eliminado correctamente', 'success');
      setDeleteDialogOpen(false);
      setStudentToDelete(null);
    }
  };

  // Handle filter change
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Reset filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setFilters({ curso: '', estado: '' });
    showToast('Filtros limpiados', 'info');
  };

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      {isDesktop && <Sidebar view={view} onNavigate={setView} />}

      {/* Main Content */}
      <div className={styles.main}>
        {/* Header */}
        <Header
          sidebarOpen={!isDesktop ? sidebarOpen : undefined}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          totalStudents={students.length}
          filteredStudents={filteredStudents.length}
        />

        {/* Content */}
        <div className={styles.content}>
            {view === 'students' && (
              <>
                {/* Stats Cards */}
                <div className={styles.statsGrid}>
                  <StatsCard
                    icon={Users}
                    title="Total Estudiantes"
                    value={stats.total}
                    color={process.env.NODE_ENV === 'production' ? '#2563eb' : '#2563eb'}
                  />
                  <StatsCard
                    icon={TrendingUp}
                    title="Estudiantes Activos"
                    value={stats.activos}
                    color="#22c55e"
                  />
                  <StatsCard
                    icon={Award}
                    title="Promedio General"
                    value={`${stats.promedio}%`}
                    color="#7c3aed"
                  />
                  <StatsCard
                    icon={Zap}
                    title="Excelencia (≥90%)"
                    value={stats.excelencia}
                    color="#f97316"
                  />
                </div>

                {/* Toolbar */}
                <div className={styles.toolbar}>
                  <SearchBar value={searchQuery} onChange={setSearchQuery} />
                  <div className={styles.toolbarActions}>
                    <ExportMenu students={filteredStudents} onExport={showToast} />
                    <Button onClick={handleNewStudent} icon={Plus}>
                      Nuevo
                    </Button>
                  </div>
                </div>

                {/* Filters */}
                <FilterPanel
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onReset={handleResetFilters}
                />

                {/* Students List */}
                {filteredStudents.length > 0 ? (
                  <>
                    {/* Desktop Table */}
                    {isDesktop && (
                      <StudentTable
                        students={filteredStudents}
                        onEdit={handleEditStudent}
                        onDelete={handleDeleteStudent}
                      />
                    )}

                    {/* Mobile Cards */}
                    {!isDesktop && (
                      <div className={styles.cardsGrid}>
                        {filteredStudents.map(student => (
                          <StudentCard
                            key={student.id}
                            student={student}
                            onEdit={handleEditStudent}
                            onDelete={handleDeleteStudent}
                          />
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <EmptyState
                    icon={Users}
                    title="No hay estudiantes"
                    message={searchQuery || filters.curso || filters.estado
                      ? 'No se encontraron estudiantes con los criterios de búsqueda.'
                      : 'Comienza agregando tu primer estudiante.'}
                    action={!searchQuery && !filters.curso && !filters.estado && (
                      <Button onClick={handleNewStudent} icon={Plus} variant="primary">
                        Agregar Primer Estudiante
                      </Button>
                    )}
                  />
                )}
              </>
            )}

            {view === 'recibos' && (
              <div>
                <h2>Recibos</h2>
                <p>Gestión de recibos próximamente.</p>
              </div>
            )}

            {view === 'estadisticas' && (
              <div>
                <h2>Estadísticas</h2>
                <p>Panel de estadísticas próximamente.</p>
              </div>
            )}

            {view === 'configuracion' && (
              <div>
                <h2>Configuración</h2>
                <p>Ajustes de la aplicación próximamente.</p>
              </div>
            )}
        </div>

        {/* Mobile Navbar */}
        {isMobile && <MobileNavbar view={view} onNavigate={setView} />}
      </div>

      {/* Modals */}
      <StudentFormModal
        isOpen={formOpen}
        student={selectedStudent}
        onClose={() => setFormOpen(false)}
        onSave={handleSaveStudent}
      />

      <ConfirmDialog
        isOpen={deleteDialogOpen}
        title="Eliminar Estudiante"
        message={`¿Estás seguro de que deseas eliminar a ${studentToDelete?.nombre}? Esta acción no se puede deshacer.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setDeleteDialogOpen(false);
          setStudentToDelete(null);
        }}
      />

      {/* Toast Container */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
};
