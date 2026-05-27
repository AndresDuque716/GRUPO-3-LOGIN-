import styles from './ReceiptCard.module.css';
import { Download, Check, Clock } from 'lucide-react';

export const ReceiptCard = ({ student }) => {
  const { nombre, email, curso, pago } = student;
  const isPaid = pago.estado === 'pagado';
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDownloadReceipt = () => {
    // Generate receipt as PDF or print
    const receiptContent = `
      RECIBO DE PAGO - MATRÍCULA
      ==============================
      Número: ${pago.numeroRecibo}
      Estudiante: ${nombre}
      Email: ${email}
      Curso: ${curso}
      Monto: $${pago.monto.toFixed(2)}
      Fecha de Pago: ${formatDate(pago.fechaPago)}
      Método de Pago: ${pago.metodo}
      Estado: ${pago.estado.toUpperCase()}
    `;
    
    // Create a blob and download
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(receiptContent));
    element.setAttribute('download', `${pago.numeroRecibo}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className={`${styles.card} ${styles[pago.estado]}`}>
      <div className={styles.header}>
        <div className={styles.studentInfo}>
          <h3 className={styles.name}>{nombre}</h3>
          <p className={styles.course}>{curso}</p>
        </div>
        <div className={`${styles.badge} ${styles[pago.estado]}`}>
          {isPaid ? (
            <>
              <Check size={16} />
              <span>Pagado</span>
            </>
          ) : (
            <>
              <Clock size={16} />
              <span>Pendiente</span>
            </>
          )}
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.row}>
          <span className={styles.label}>Email:</span>
          <span className={styles.value}>{email}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Monto:</span>
          <span className={styles.value}>${pago.monto.toFixed(2)}</span>
        </div>
        {isPaid && (
          <>
            <div className={styles.row}>
              <span className={styles.label}>Fecha de Pago:</span>
              <span className={styles.value}>{formatDate(pago.fechaPago)}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Método:</span>
              <span className={styles.value}>{pago.metodo}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Recibo:</span>
              <span className={styles.receipt}>{pago.numeroRecibo}</span>
            </div>
          </>
        )}
      </div>

      {isPaid && (
        <div className={styles.footer}>
          <button 
            className={styles.downloadBtn}
            onClick={handleDownloadReceipt}
            title="Descargar recibo"
          >
            <Download size={18} />
            <span>Descargar Recibo</span>
          </button>
        </div>
      )}
    </div>
  );
};
