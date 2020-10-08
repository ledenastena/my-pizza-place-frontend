import React from 'react'
import './custom-button.styles.scss'
import SmallSpinner from '../small-spinner/small-spinner.component'

const CustomButton = ({ isLoading, type, buttonStyle, ...otherProps }) => (
    <button className={ `custom-button-container ${buttonStyle || ''}`} type={ type } { ...otherProps }>
    {
      isLoading ?
      <SmallSpinner />
      : <span>
          {otherProps.children}
        </span>
    }
    </button>
)

export default CustomButton
