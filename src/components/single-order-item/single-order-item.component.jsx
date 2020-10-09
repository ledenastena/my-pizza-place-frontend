import React from 'react'
import './single-order-item.styles.scss'
import { selectSelectedCurrency } from '../../redux/product/product.selectors'
import { connect } from 'react-redux'
import LoadingImage from '../loading-image/loading-image.component'
import squareImage from '../../assets/square.png'

class SingleOrderItem extends React.Component {
  render() {
    const { item, quantity, selectedCurrency } = this.props 
    const price_eur = item.price_eur * quantity
    const price_usd = item.price_usd * quantity
    
    return(
      <div className='single-order-item-container'>
        <div className='order-image-column'>
          <LoadingImage className='order-image' imageSrc={`${process.env.BACKEND_URL}/products/${item._id}/${item.image_name}`} onError={ (e) => e.target.src=squareImage } alt='product' />
        </div>
        <div className='order-quantity-column'>{quantity}</div>
        <div className='order-price-column'>
          {
            selectedCurrency === 'eur' ?
              price_eur.toFixed(2) + ' €'
              : price_usd.toFixed(2) + ' $'
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  selectedCurrency: selectSelectedCurrency(state)
})

export default connect(mapStateToProps)(SingleOrderItem)