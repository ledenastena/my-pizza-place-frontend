import React from 'react'
import './loading-image.styles.scss'
import PropTypes from 'prop-types'

class LoadingImage extends React.Component {
  state = {
    isLoading: true,
  }

  loadFinished = () => {
    this.setState({
      isLoading: false,
    })
  }

  // Initialize click handler on ENTER key press
  handleKeyDown = (e) => {
    const { onClick } = this.props

    if (e.keyCode === 13) {
      e.preventDefault()
      onClick()
    }
  }

  render() {
    const { imageSrc, className, onError, alt, onClick } = this.props
    const { isLoading } = this.state

    return (
      <div
        className="loading-image-container"
        onClick={onClick}
        onKeyDown={this.handleKeyDown}
        role="presentation"
      >
        <img
          className={className}
          src={imageSrc}
          alt={alt}
          onError={onError}
          onLoad={this.loadFinished}
        />
        {isLoading ? <div className="spinner" /> : ''}
      </div>
    )
  }
}

LoadingImage.defaultProps = {
  className: null,
  imageSrc: null,
  onError: null,
  alt: null,
  onClick: null,
}

LoadingImage.propTypes = {
  className: PropTypes.string,
  imageSrc: PropTypes.string,
  onError: PropTypes.func,
  alt: PropTypes.string,
  onClick: PropTypes.func,
}

export default LoadingImage
