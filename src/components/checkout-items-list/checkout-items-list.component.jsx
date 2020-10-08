import React from 'react'
import './checkout-items-list.styles.scss'
import SingleCheckoutItem from '../single-checkout-item/single-checkout-item.component'
import { selectCartItems } from '../../redux/cart/cart.selectors'
import { selectSelectedCurrency } from '../../redux/product/product.selectors'
import { connect } from 'react-redux' 

class CheckoutItemsList extends React.Component {
  render() {    
    const { cartItems, selectedCurrency, cartTotalEur, cartTotalUsd } = this.props

    return (
      <div className='checkout-items-list-container'>
        <div className='checkout-headings'>
          <span className='heading img-column'></span>
          <span className='heading info-column'>Qty</span>
          <span className='heading info-column'>Price</span>
          <span className='heading remove-column' />
        </div>
        { 
        cartItems.map((cartItem, index) => (
          <SingleCheckoutItem key={ index } cartItem={ cartItem } />
        ))}
        <div className='checkout-total'>
          <div className='info-column'>Total:</div>
          <div className='info-column'>
          { 
              selectedCurrency === 'eur' ? 
              <span>&euro; { cartTotalEur.toFixed(2) }</span>  
              : <span>$  { cartTotalUsd.toFixed(2) }</span>
          }
          </div>
          <div className='remove-column' />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  cartItems: selectCartItems(state),
  selectedCurrency: selectSelectedCurrency(state)
})

export default connect(mapStateToProps)(CheckoutItemsList)