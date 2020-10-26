import React from 'react'
import './form-textarea.styles.scss'
import PropTypes from 'prop-types'

const FormTextarea = ({ name, label, value, type, onChange, cols, rows }) => (
  <div className="form-textarea-container">
    <textarea
      id={name}
      name={name}
      type={type}
      className="contact-textarea"
      value={value}
      onChange={onChange}
      cols={cols}
      rows={rows}
    />
    <label htmlFor={name} className={`${value.length && 'shrink'}`}>
      {label}
    </label>
  </div>
)

FormTextarea.defaultProps = {
  name: null,
  label: null,
  value: null,
  type: PropTypes.null,
  onChange: PropTypes.null,
  cols: PropTypes.null,
  rows: PropTypes.null,
}

FormTextarea.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  cols: PropTypes.string,
  rows: PropTypes.string,
}

export default FormTextarea
