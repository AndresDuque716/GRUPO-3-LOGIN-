import styles from './ReceiptCard.module.css';
import { CheckCircle2, Clock3, FileText } from 'lucide-react';
import { formatDate, formatCurrency, getPromedioHexColor } from '../../utils/helpers';

const hexToRgba = (hex, alpha = 0.08) => {
  const cleaned = hex.replace('#', '');
  const bigint = parseInt(cleaned, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const ReceiptCard = ({ student }) => {
  const isPaid = student.pago?.estado === 'pagado';
  const accentColor = getPromedioHexColor(student.promedio);
  const accentBackground = hexToRgba(accentColor, 0.1);

  return (
    <article className={styles.card} style={{ borderLeftColor: accentColor }}>
      <div className={styles.cardHeader} style={{ backgroundColor: accentBackground }}>
        <div>
          <p className={styles.studentName} style={{ color: accentColor }}>{student.nombre}</p>
          <p className={styles.course}>{student.curso}</p>
        </div>
        <span className={`${styles.statusBadge} ${isPaid ? styles.paid : styles.pending}`}>
          {isPaid ? (
            <>
              <CheckCircle2 size={16} /> Pagado
            </>
          ) : (
            <>
              <Clock3 size={16} /> Pendiente
            </>
          )}
        </span>
      </div>

      <div className={styles.body}>
        <div className={styles.row}>
          <span>Email:</span>
          <strong>{student.email}</strong>
        </div>
        <div className={styles.row}>
          <span>Monto:</span>
          <strong style={{ color: accentColor }}>{formatCurrency(student.pago?.monto || 0)}</strong>
        </div>
        <div className={styles.row}>
          <span>Fecha de Pago:</span>
          <strong>{isPaid ? formatDate(student.pago.fechaPago) : 'Pendiente'}</strong>
        </div>
        <div className={styles.row}>
          <span>Método:</span>
          <strong>{isPaid ? student.pago.metodo : 'Pendiente'}</strong>
        </div>
        <div className={styles.row}>
          <span>Recibo:</span>
          <strong>{isPaid ? student.pago.numeroRecibo : 'Pendiente'}</strong>
        </div>
      </div>

      <div className={styles.cardFooter} style={{ color: accentColor, backgroundColor: accentBackground }}>
        <FileText size={18} />
        <span>{isPaid ? 'Recibo registrado' : 'Pago en espera'}</span>
      </div>
    </article>
  );
};
