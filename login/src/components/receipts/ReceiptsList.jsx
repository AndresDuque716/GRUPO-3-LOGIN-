import { useState, useMemo } from 'react';
import styles from './ReceiptsList.module.css';
import { ReceiptCard } from './ReceiptCard';
import { SearchBar } from '../filters/SearchBar';
import { Button } from '../common/Button';
import { EmptyState } from '../common/EmptyState';
import { FileText } from 'lucide-react';

export const ReceiptsList = ({ students }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('todos');

  // Filter students based on search and payment status
  const filteredStudents = useMemo(() => {
    let filtered = students.filter(student => {
      const matchSearch = 
        student.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.curso.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchPayment = 
        paymentFilter === 'todos' ||
        student.pago.estado === paymentFilter;
      
      return matchSearch && matchPayment;
    });

    return filtered;
  }, [students, searchQuery, paymentFilter]);

  const stats = {
    total: students.length,
    pagados: students.filter(s => s.pago.estado === 'pagado').length,
    pendientes: students.filter(s => s.pago.estado === 'pendiente').length,
    totalRecaudado: students
      .filter(s => s.pago.estado === 'pagado')
      .reduce((sum, s) => sum + s.pago.monto, 0)
  };

  return (
    <div className={styles.container}>
      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{stats.total}</div>
          <div className={styles.statLabel}>Estudiantes</div>
        </div>
        <div className={`${styles.statCard} ${styles.success}`}>
          <div className={styles.statValue}>{stats.pagados}</div>
          <div className={styles.statLabel}>Pagos Realizados</div>
        </div>
        <div className={`${styles.statCard} ${styles.danger}`}>
          <div className={styles.statValue}>{stats.pendientes}</div>
          <div className={styles.statLabel}>Pagos Pendientes</div>
        </div>
        <div className={`${styles.statCard} ${styles.primary}`}>
          <div className={styles.statValue}>${stats.totalRecaudado.toFixed(2)}</div>
          <div className={styles.statLabel}>Total Recaudado</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className={styles.toolbar}>
        <SearchBar 
          value={searchQuery} 
          onChange={setSearchQuery}
          placeholder="Buscar por nombre, email o curso..."
        />
        <div className={styles.filterButtons}>
          <Button 
            variant={paymentFilter === 'todos' ? 'primary' : 'secondary'}
            onClick={() => setPaymentFilter('todos')}
            size="sm"
          >
            Todos ({stats.total})
          </Button>
          <Button 
            variant={paymentFilter === 'pagado' ? 'primary' : 'secondary'}
            onClick={() => setPaymentFilter('pagado')}
            size="sm"
          >
            Pagados ({stats.pagados})
          </Button>
          <Button 
            variant={paymentFilter === 'pendiente' ? 'primary' : 'secondary'}
            onClick={() => setPaymentFilter('pendiente')}
            size="sm"
          >
            Pendientes ({stats.pendientes})
          </Button>
        </div>
      </div>

      {/* Receipts Grid */}
      {filteredStudents.length > 0 ? (
        <div className={styles.receiptsGrid}>
          {filteredStudents.map(student => (
            <ReceiptCard key={student.id} student={student} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={FileText}
          title="No hay recibos"
          message={
            searchQuery || paymentFilter !== 'todos'
              ? 'No se encontraron recibos con los criterios de búsqueda.'
              : 'No hay estudiantes con recibos registrados.'
          }
        />
      )}
    </div>
  );
};
