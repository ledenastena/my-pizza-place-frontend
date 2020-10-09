import React from 'react';
import './loading-image.styles.scss';

class LoadingImage extends React.Component {
  state = {
    isLoading: true
  }
  
  loadFinished = () => {
    this.setState({
      isLoading: false
    })
  }
  
  render() {
    const { imageSrc, ...otherProps } = this.props

    return (
      <div className='loading-image-container'>
        <img src={imageSrc} alt='item' onLoad={this.loadFinished} { ...otherProps } />
        { (this.state.isLoading) ? 
          <div className="spinner"/>
          : ''
        }
      </div>
    )
  }
}

export default LoadingImage;