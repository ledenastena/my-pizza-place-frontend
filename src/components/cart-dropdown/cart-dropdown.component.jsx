import React from 'react'
import './cart-dropdown.styles.scss'
import { selectCartItems } from '../../redux/cart/cart.selectors'
import { selectSelectedCurrency } from '../../redux/product/product.selectors'
import { toggleCartVisible } from '../../redux/cart/cart.actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class CartDropdown extends React.Component {
  elementRef = null
  
  setRef = (node) => {
    this.elementRef = node
  }
  
  componentDidMount() {
    window.addEventListener('mousedown', this.handleClickOutsideCart)
  }
  
  handleClickOutsideCart = (e) => {
    const { cartButtonRef } = this.props
    if (!cartButtonRef) {
      this.props.toggleCartVisible()
    } else if (this.elementRef && !this.elementRef.contains(e.target) && !cartButtonRef.contains(e.target)){
      this.props.toggleCartVisible()
    }
  }
  
  componentWillUnmount() {
    window.removeEventListener('mousedown', this.handleClickOutsideCart)
  }
  
  render() {
    const { cartItems, selectedCurrency } = this.props
    let cartTotalEur = 0
    let cartTotalUsd = 0
  
    cartTotalEur = cartItems.reduce((acc, cartItem) => (acc + parseFloat(cartItem.item.price_eur) * cartItem.quantity), 0)  
    cartTotalUsd = cartItems.reduce((acc, cartItem) => (acc + parseFloat(cartItem.item.price_usd) * cartItem.quantity), 0)    
    
    return (
    <div className='cart-dropdown-container' ref={this.setRef}>
        {
        cartItems.length ? 
          (
          <div className='drawer'>
            <div className='all-items-container'>
              { cartItems.map((cartItem, index) => (
                <div key={index} className='cart-item-container'>
                  <div className='cart-item-image img-column'>
                    <img src={ `${process.env.BACKEND_URL}/products/${cartItem.item._id}/${cartItem.item.image_name}` } alt='product'/>
                  </div>
                  <div className='cart-item-quantity info-column'>x{cartItem.quantity}</div>
                </div>
            ))}
            </div>
            <div className='cart-total'>
              <div className='text'>Total:</div>
              { 
                selectedCurrency === 'eur' ? 
                <div className='total-price'>&euro;  { cartTotalEur.toFixed(2) }</div>
                : <div className='total-price'>$  { cartTotalUsd.toFixed(2) }</div>
              }
            </div>
            <div className='checkout-button-container'>
                <Link to='/checkout'>
                  <div className='checkout-button'>
                    Checkout
                  </div>
                </Link>
            </div>
          </div>
        ) :
          <div className='empty-message'>Your cart is empty</div> 
        }
      </div>
  )
  }
}

const mapStateToProps = (state) => ({
  cartItems: selectCartItems(state),
  selectedCurrency: selectSelectedCurrency(state)
})

const mapDispatchToProps = (dispatch) => ({
  toggleCartVisible: () => dispatch(toggleCartVisible())
})

export default connect(mapStateToProps, mapDispatchToProps)(CartDropdown)