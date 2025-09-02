// src/components/FormSelect/FormSelect.jsx
// import styles from './FormSelect.module.scss';

const FormSelect = ({ 
  id, 
  name, 
  label, 
  value, 
  onChange, 
  options, 
  isLoading, 
  loadingText = 'Chargement...', 
  required = false,
  disabled = false,
  error = null
}) => {
  return (
    <div className={`form__group ${error ? 'form__group--error' : ''}`}>
      <label htmlFor={id} className="form__label">
        {label} {required && <span className="form__required">*</span>}
      </label>
      
      <select
        id={id}
        name={name}
        className="form__input"
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled || isLoading}
      >
        {isLoading ? (
          <option value="">{loadingText}</option>
        ) : (
          <>
            <option value="">Sélectionner...</option>
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </>
        )}
      </select>
      
      {error && <div className="form__error">{error}</div>}
    </div>
  );
};

export default FormSelect;