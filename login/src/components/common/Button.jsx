import { memo } from 'react';
import styles from './Button.module.css';

const ButtonComponent = ({ children, variant = 'primary', size = 'md', icon: Icon, ...props }) => {
  return (
    <button className={`${styles.button} ${styles[variant]} ${styles[size]}`} {...props}>
      {Icon && <Icon size={20} />}
      {children}
    </button>
  );
};

export const Button = memo(ButtonComponent);
