import styles from './Button.module.css';

export const Button = ({ children, variant = 'primary', size = 'md', icon: Icon, ...props }) => {
  return (
    <button className={`${styles.button} ${styles[variant]} ${styles[size]}`} {...props}>
      {Icon && <Icon size={20} />}
      {children}
    </button>
  );
};
