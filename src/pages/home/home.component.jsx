import React from 'react'
import './home.styles.scss'
import pizza_bg from '../../assets/pizza_bg.png'
import { Link } from 'react-router-dom'
import LoadingImage from '../../components/loading-image/loading-image.component'

class HomePage extends React.Component {
  render() {
    return(
      <div className='homepage-container'>
        <Link to='/products'>
          <LoadingImage className='homepage-background-image' imageSrc={pizza_bg} />
        </Link>
      </div>
  )
  }
}

export default HomePage