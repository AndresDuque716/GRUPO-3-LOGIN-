import { useEffect, memo } from 'react';
import { createPortal } from 'react-dom';
import styles from './Toast.module.css';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';

const ToastComponent = ({ message, type = 'success', duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} />;
      case 'error':
        return <XCircle size={20} />;
      case 'warning':
        return <AlertCircle size={20} />;
      default:
        return null;
    }
  };

  return createPortal(
    <div className={`${styles.toast} ${styles[type]}`}>
      <div className={styles.content}>
        {getIcon()}
        <span className={styles.message}>{message}</span>
      </div>
    </div>,
    document.body
  );
};

const ToastMemo = memo(ToastComponent);

export const Toast = ToastMemo;

const ToastContainerComponent = ({ toasts, removeToast }) => {
  return (
    <div className={styles.container}>
      {toasts.map(toast => (
        <ToastMemo
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export const ToastContainer = memo(ToastContainerComponent);
