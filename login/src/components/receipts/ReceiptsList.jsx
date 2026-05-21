import { ReceiptCard } from './ReceiptCard';
import { EmptyState } from '../common/EmptyState';
import pageStyles from '../../pages/StudentsPage.module.css';
import { Users } from 'lucide-react';

export const ReceiptsList = ({ students = [] }) => {
  const paidReceipts = students.filter(s => s.pago?.estado === 'pagado');

  if (paidReceipts.length === 0) {
    return (
      <EmptyState
        icon={Users}
        title="No hay recibos"
        message="Aún no hay pagos registrados."
      />
    );
  }

  return (
    <div className={pageStyles.cardsGrid}>
      {paidReceipts.map(student => (
        <ReceiptCard key={student.id} student={student} />
      ))}
    </div>
  );
};

export default ReceiptsList;
