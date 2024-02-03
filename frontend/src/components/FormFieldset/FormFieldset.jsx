import React from "react";
import styles from "../../ValidationForm.module.css";

function FormFieldset({
  autoFocus,
  children,
  handler,
  minLength,
  name,
  normal,
  placeholder,
  required,
  type,
  value,
  testid,
  error,
  onBlur,
}) {
  return (
    <fieldset className="form-group">
      <input
        autoFocus={autoFocus}
        className={`form-control ${normal ? "" : "form-control-lg"} ${
          error && styles.formFieldError
        }`}
        minLength={minLength}
        name={name}
        data-testid={testid}
        onChange={handler}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        type={type}
        value={value}
      />
      {children}
      {error && (
        <p className={styles.formFieldErrorMessage} data-testid={`${name}-validation-msg`}>
          {error}
        </p>
      )}
    </fieldset>
  );
}

export default FormFieldset;
