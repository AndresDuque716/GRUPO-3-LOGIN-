import styles from './PaymentReceiptModal.module.css';
import { X, Printer, Receipt, CreditCard, CheckCircle, User, CalendarDays } from 'lucide-react';

const COURSE_PRICES = {
  'Desarrollo Web Full Stack': 220,
  'Data Science': 240,
  'Diseño UX/UI': 200,
  'Ciberseguridad': 260,
};

const formatMoney = (value) => {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
    minimumFractionDigits: 2,
  }).format(value);
};

const formatLongDate = (date = new Date()) => {
  return new Intl.DateTimeFormat('es-PE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
};

const getReceiptNumber = (student) => {
  const studentId = String(student?.id ?? 0).padStart(3, '0');
  const today = new Date();
  const dateCode = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;
  return `B001-${dateCode}-${studentId}`;
};

const getConcepts = (student) => {
  const monthlyFee = COURSE_PRICES[student?.curso] ?? 200;

  return [
    {
      description: `Mensualidad académica - ${student?.curso ?? 'Curso académico'}`,
      quantity: 1,
      unitPrice: monthlyFee,
    },
    {
      description: 'Materiales y recursos digitales',
      quantity: 1,
      unitPrice: 35,
    },
    {
      description: 'Seguro estudiantil',
      quantity: 1,
      unitPrice: 15,
    },
  ];
};

export const PaymentReceiptModal = ({ student, isOpen, onClose }) => {
  if (!isOpen || !student) return null;

  const concepts = getConcepts(student);
  const subtotal = concepts.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const discount = student.promedio >= 90 ? subtotal * 0.1 : 0;
  const lateFee = student.estado === 'inactivo' ? 25 : 0;
  const total = subtotal - discount + lateFee;
  const receiptNumber = getReceiptNumber(student);
  const paymentStatus = student.estado === 'activo' ? 'Pagado' : 'Pendiente';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Boleta de pago">
      <div className={styles.modalShell}>
        <div className={`${styles.actionsBar} ${styles.noPrint}`}>
          <div>
            <p className={styles.actionsTitle}>Boleta generada</p>
            <span className={styles.actionsSubtitle}>Revisa los datos antes de imprimir.</span>
          </div>

          <div className={styles.actionsButtons}>
            <button className={styles.secondaryButton} onClick={onClose} type="button">
              <X size={18} />
              Cerrar
            </button>

            <button className={styles.primaryButton} onClick={handlePrint} type="button">
              <Printer size={18} />
              Imprimir
            </button>
          </div>
        </div>

        <article className={styles.receipt} id="boleta-pago">
          <header className={styles.receiptHeader}>
            <div className={styles.brandBlock}>
              <div className={styles.logoMark}>
                <Receipt size={30} />
              </div>

              <div>
                <h1>Academia Grupo 3</h1>
                <p>Gestión académica y pagos estudiantiles</p>
                <span>Av. Principal 123, Lima - Perú</span>
              </div>
            </div>

            <div className={styles.receiptNumberCard}>
              <span>Boleta de pago</span>
              <strong>{receiptNumber}</strong>
              <em className={paymentStatus === 'Pagado' ? styles.paid : styles.pending}>
                {paymentStatus}
              </em>
            </div>
          </header>

          <section className={styles.summaryGrid}>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <User size={18} />
              </div>
              <div>
                <span>Estudiante</span>
                <strong>{student.nombre}</strong>
                <p>{student.email}</p>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <CreditCard size={18} />
              </div>
              <div>
                <span>Curso</span>
                <strong>{student.curso}</strong>
                <p>Promedio: {student.promedio}%</p>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <CalendarDays size={18} />
              </div>
              <div>
                <span>Fecha de emisión</span>
                <strong>{formatLongDate()}</strong>
                <p>Periodo académico actual</p>
              </div>
            </div>
          </section>

          <section className={styles.detailsSection}>
            <div className={styles.sectionHeading}>
              <CheckCircle size={18} />
              <h2>Detalle del pago</h2>
            </div>

            <div className={styles.tableWrap}>
              <table className={styles.detailTable}>
                <thead>
                  <tr>
                    <th>Concepto</th>
                    <th>Cant.</th>
                    <th>Precio</th>
                    <th>Importe</th>
                  </tr>
                </thead>

                <tbody>
                  {concepts.map((item, index) => (
                    <tr key={item.description}>
                      <td>
                        <strong>{String(index + 1).padStart(2, '0')}</strong>
                        {item.description}
                      </td>
                      <td>{item.quantity}</td>
                      <td>{formatMoney(item.unitPrice)}</td>
                      <td>{formatMoney(item.quantity * item.unitPrice)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className={styles.totalSection}>
            <div className={styles.noteBox}>
              <strong>Observación</strong>
              <p>
                Esta boleta se genera desde el filtro de estudiantes. El descuento se aplica
                automáticamente cuando el promedio es igual o mayor a 90%.
              </p>
            </div>

            <div className={styles.totalCard}>
              <p>
                <span>Subtotal</span>
                <strong>{formatMoney(subtotal)}</strong>
              </p>

              <p>
                <span>Descuento académico</span>
                <strong>- {formatMoney(discount)}</strong>
              </p>

              <p>
                <span>Mora / regularización</span>
                <strong>{formatMoney(lateFee)}</strong>
              </p>

              <div className={styles.grandTotal}>
                <span>Total a pagar</span>
                <strong>{formatMoney(total)}</strong>
              </div>
            </div>
          </section>

          <footer className={styles.receiptFooter}>
            <div>
              <span>Forma de pago</span>
              <strong>Efectivo / Yape / Transferencia</strong>
            </div>

            <div className={styles.signature}>
              <strong>Administración</strong>
              <span>Firma autorizada</span>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
};