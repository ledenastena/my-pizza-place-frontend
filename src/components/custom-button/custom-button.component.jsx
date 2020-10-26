import React from 'react'
import './custom-button.styles.scss'
import PropTypes from 'prop-types'
import SmallSpinner from '../small-spinner/small-spinner.component'

const CustomButton = ({ isLoading, type, buttonStyle, onClick, children }) => (
  <button
    className={`custom-button-container ${buttonStyle || ''}`}
    type={type === 'submit' ? 'submit' : 'button'}
    onClick={onClick}
  >
    {isLoading ? <SmallSpinner /> : <span>{children}</span>}
  </button>
)

CustomButton.defaultProps = {
  isLoading: false,
  type: null,
  buttonStyle: null,
  onClick: null,
  children: 'Text',
}

CustomButton.propTypes = {
  isLoading: PropTypes.bool,
  type: PropTypes.string,
  buttonStyle: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
}

export default CustomButton
