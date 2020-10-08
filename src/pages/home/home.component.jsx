import React from 'react'
import './home.styles.scss'
import pizza_bg from '../../assets/pizza_bg.png'
import { Link } from 'react-router-dom'

class HomePage extends React.Component {
  render() {
    return(
      <div className='homepage-container'>
        <Link to='/products'>
          <img className='homepage-background-image' src={pizza_bg} />
        </Link>
      </div>
  )
  }
}

export default HomePage