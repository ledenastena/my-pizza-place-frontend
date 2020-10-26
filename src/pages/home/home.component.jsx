import React from 'react'
import './home.styles.scss'
import { Link } from 'react-router-dom'
import pizzaBg from '../../assets/pizza_bg.png'
import LoadingImage from '../../components/loading-image/loading-image.component'

const HomePage = () => (
  <div className="homepage-container">
    <Link to="/products">
      <LoadingImage className="homepage-background-image" imageSrc={pizzaBg} />
    </Link>
  </div>
)

export default HomePage
