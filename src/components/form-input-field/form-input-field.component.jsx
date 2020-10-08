import React from 'react';
import './form-input-field.styles.scss';

const FormInputField = ({ name, label, value, applyClass, ...otherProps }) => (
  <div className={`form-input-container ${ applyClass || '' }`}>
    <input id={ name } name={ name } value={ value } { ...otherProps } />
    { label ? 
      <label htmlFor={ name } className={ `${value !== '' && 'shrink'}`}>{ label }</label>
      : ''
    }
  </div>  
);

export default FormInputField;