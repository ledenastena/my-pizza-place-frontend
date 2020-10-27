import React from 'react'
import './form-input-field.styles.scss'
import PropTypes from 'prop-types'

const FormInputField = ({
  name,
  label,
  value,
  applyClass,
  type,
  required,
  onChange,
  autoComplete,
}) => (
  <div className={`form-input-container ${applyClass || ''}`}>
    <input
      id={name}
      name={name}
      value={value}
      type={type}
      required={required}
      onChange={onChange}
      autoComplete={autoComplete}
    />
    <label htmlFor={name} className={`${value !== '' && 'shrink'}`}>
      {label}
    </label>
  </div>
)

FormInputField.defaultProps = {
  name: null,
  label: null,
  value: null,
  applyClass: null,
  type: null,
  required: false,
  onChange: null,
  autoComplete: null,
}

FormInputField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  applyClass: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  autoComplete: PropTypes.string,
}

export default FormInputField
