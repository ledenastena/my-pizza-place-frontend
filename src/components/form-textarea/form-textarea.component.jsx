import React from 'react'
import './form-textarea.styles.scss'

const FormTextarea = ({ name, label, value, ...otherProps }) => (

  <div className='form-textarea-container'>
    <textarea
      id={ name }
      name={ name }
      className='contact-textarea'
      value={ value }
      { ...otherProps }
    />
    <label htmlFor={ name } className={ `${value.length && 'shrink'}` }>{ label }</label>
  </div>
)

export default FormTextarea