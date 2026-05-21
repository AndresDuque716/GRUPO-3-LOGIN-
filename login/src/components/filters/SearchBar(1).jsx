import styles from './SearchBar.module.css';
import { Search, X } from 'lucide-react';

export const SearchBar = ({ value, onChange, placeholder = 'Buscar por nombre o email...' }) => {
  return (
    <div className={styles.searchBar}>
      <Search size={20} className={styles.searchIcon} />
      <input
        type="text"
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          className={styles.clearButton}
          onClick={() => onChange('')}
          aria-label="Clear search"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};
