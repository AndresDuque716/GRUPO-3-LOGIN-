import { memo, useCallback } from 'react';
import styles from './SearchBar.module.css';
import { Search, X } from 'lucide-react';

const SearchBarComponent = ({ value, onChange, placeholder = 'Buscar por nombre o email...' }) => {
  const handleChange = useCallback((e) => {
    onChange(e.target.value);
  }, [onChange]);

  const handleClear = useCallback(() => {
    onChange('');
  }, [onChange]);

  return (
    <div className={styles.searchBar}>
      <Search size={20} className={styles.searchIcon} />
      <input
        type="text"
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
      {value && (
        <button
          className={styles.clearButton}
          onClick={handleClear}
          aria-label="Clear search"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};

export const SearchBar = memo(SearchBarComponent);
