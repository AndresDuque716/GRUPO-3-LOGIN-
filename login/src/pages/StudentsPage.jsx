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
import { Plus, Users, TrendingUp, Award, Zap, CheckCircle2, DollarSign, Clock } from 'lucide-react';

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
  const pagosRealizados = stats.activos;
  const pagosPendientes = stats.total - stats.activos;
  const totalRecaudado = pagosRealizados * 120;
  const promedioMensual = stats.total ? (totalRecaudado / 6).toFixed(2) : '0.00';
  const pagoCompletadoRate = stats.total ? Math.round((pagosRealizados / stats.total) * 100) : 0;

  const monthlyRevenue = [1320, 1200, 950, 700, 450, 200];
  const monthlyLabels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
  const monthlyAmounts = ['1320', '1200', '950', '700', '450', '200'];
  const maxRevenue = Math.max(...monthlyRevenue, totalRecaudado || 0, 1500);
  const yAxisLabels = ['$0', '$300', '$600', '$900', '$1200', '$1500'];
  const linePoints = monthlyRevenue
    .map((value, index) => `${(index / (monthlyRevenue.length - 1)) * 100},${100 - (value / maxRevenue) * 100}`)
    .join(' ');

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
                <div className={styles.statsHeader}>
                  <div>
                    <h2>Estadísticas</h2>
                    <p className={styles.statsHeaderSubtitle}>Resumen general del sistema</p>
                  </div>
                </div>

                <div className={styles.metricCards}>
                  <StatsCard
                    variant="light"
                    icon={Users}
                    title="Total Estudiantes"
                    value={stats.total}
                  />
                  <StatsCard
                    variant="light"
                    icon={CheckCircle2}
                    title="Pagos Realizados"
                    value={pagosRealizados}
                  />
                  <StatsCard
                    variant="light"
                    icon={Clock}
                    title="Pagos Pendientes"
                    value={pagosPendientes}
                  />
                  <StatsCard
                    variant="light"
                    icon={DollarSign}
                    title="Total Recaudado"
                    value={`$${totalRecaudado.toFixed(2)}`}
                  />
                </div>

                <div className={styles.analyticsGrid}>
                  <div className={styles.analyticsCard}>
                    <div className={styles.analyticsHeader}>
                      <div>
                        <p className={styles.analyticsLabel}>Rendimiento de Pagos</p>
                      </div>
                    </div>
                    <div className={styles.donutWrapper}>
                      <div
                        className={styles.donutChart}
                        style={{
                          background: `conic-gradient(#22c55e 0 ${pagoCompletadoRate}%, #ef4444 ${pagoCompletadoRate}% 100%)`
                        }}
                      >
                        <div className={styles.donutInner}>
                          <span className={styles.donutPercent}>{pagoCompletadoRate}%</span>
                          <span className={styles.donutLabel}>Pagos Completados</span>
                        </div>
                      </div>
                      <div className={styles.chartLegend}>
                        <div className={styles.legendItem}>
                          <span className={styles.legendDotGreen}></span>
                          <div>
                            <p className={styles.legendTitle}>Pagos Realizados</p>
                            <p className={styles.legendValue}>{pagosRealizados} ({pagoCompletadoRate}%)</p>
                          </div>
                        </div>
                        <div className={styles.legendItem}>
                          <span className={styles.legendDotRed}></span>
                          <div>
                            <p className={styles.legendTitle}>Pagos Pendientes</p>
                            <p className={styles.legendValue}>{pagosPendientes} ({100 - pagoCompletadoRate}%)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.updateNote}>
                      <p className={styles.updateLabel}>Última Actualización</p>
                      <p className={styles.updateValue}>24 de enero de 2024, 10:30 AM</p>
                    </div>
                  </div>

                  <div className={styles.analyticsCard}>
                    <div className={styles.analyticsHeader}>
                      <div>
                        <p className={styles.analyticsLabel}>Recaudación Mensual</p>
                      </div>
                    </div>
                    <div className={styles.lineChart}>
                      <div className={styles.lineChartYAxis}>
                        {yAxisLabels.map(label => (
                          <span key={label} className={styles.lineChartYAxisLabel}>{label}</span>
                        ))}
                      </div>
                      <div className={styles.lineChartCanvas}>
                        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={styles.lineChartSvg}>
                          <polyline
                            points={linePoints}
                            className={styles.lineChartPolyline}
                          />
                          {monthlyRevenue.map((value, index) => {
                            const x = (index / (monthlyRevenue.length - 1)) * 100;
                            const y = 100 - (value / maxRevenue) * 100;
                            return (
                              <circle
                                key={index}
                                cx={x}
                                cy={y}
                                r="2.5"
                                className={styles.lineChartDot}
                              />
                            );
                          })}
                        </svg>
                      </div>
                      <div className={styles.lineChartLabels}>
                        {monthlyLabels.map(label => (
                          <span key={label} className={styles.lineChartLabel}>{label}</span>
                        ))}
                      </div>
                    </div>
                    <div className={styles.chartSummary}>
                      <div className={styles.summaryItem}>
                        <p className={styles.summaryLabel}>Total Recaudado</p>
                        <p className={styles.summaryValue}>${totalRecaudado.toFixed(2)}</p>
                      </div>
                      <div className={styles.summaryItem}>
                        <p className={styles.summaryLabel}>Promedio Mensual</p>
                        <p className={styles.summaryValue}>${promedioMensual}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.summaryRow}>
                  <div className={styles.summaryCard}>
                    <h3>Resumen General</h3>
                    <p>
                      Del total de {stats.total} estudiantes, {pagosRealizados} han completado sus pagos y {pagosPendientes} tienen pagos pendientes.
                    </p>
                    <p>
                      El monto total recaudado hasta la fecha es de ${totalRecaudado.toFixed(2)}, con un promedio mensual estimado de ${promedioMensual}.
                    </p>
                  </div>
                  <div className={styles.trendCard}>
                    <span className={styles.trendValue}>+20%</span>
                    <p>vs mes anterior</p>
                  </div>
                </div>
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
