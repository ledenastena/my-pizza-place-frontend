import React from 'react'
import './cart-dropdown.styles.scss'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { selectCartItems } from '../../redux/cart/cart.selectors'
import { selectSelectedCurrency } from '../../redux/product/product.selectors'
import { toggleCartVisible } from '../../redux/cart/cart.actions'
import LoadingImage from '../loading-image/loading-image.component'
import squareImage from '../../assets/square.png'

class CartDropdown extends React.Component {
  elementRef = null

  componentDidMount() {
    window.addEventListener('mousedown', this.handleClickOutsideCart)
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.handleClickOutsideCart)
  }

  setRef = (node) => {
    this.elementRef = node
  }

  handleClickOutsideCart = (e) => {
    const { cartButtonRef, toggleCartVisible } = this.props
    if (!cartButtonRef) {
      toggleCartVisible()
    } else if (
      this.elementRef &&
      !this.elementRef.contains(e.target) &&
      !cartButtonRef.contains(e.target)
    ) {
      toggleCartVisible()
    }
  }

  render() {
    const { cartItems, selectedCurrency } = this.props
    let cartTotalEur = 0
    let cartTotalUsd = 0

    cartTotalEur = cartItems.reduce(
      (acc, cartItem) =>
        acc + parseFloat(cartItem.item.price_eur) * cartItem.quantity,
      0
    )
    cartTotalUsd = cartItems.reduce(
      (acc, cartItem) =>
        acc + parseFloat(cartItem.item.price_usd) * cartItem.quantity,
      0
    )

    return (
      <div
        data-testid="cart-dropdown"
        className="cart-dropdown-container"
        ref={this.setRef}
      >
        {cartItems.length ? (
          <div className="drawer">
            <div className="all-items-container">
              {cartItems.map((cartItem) => (
                <div
                  data-testid="cart-item"
                  key={cartItem.item._id}
                  className="cart-item-container"
                >
                  <div className="cart-item-image img-column">
                    <LoadingImage
                      imageSrc={`${process.env.BACKEND_URL}/products/${cartItem.item._id}/${cartItem.item.image_name}`}
                      onError={(e) => {
                        e.target.src = squareImage
                      }}
                      alt="product"
                    />
                  </div>
                  <div className="cart-item-quantity info-column">
                    x{cartItem.quantity}
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-total">
              <div className="text">Total:</div>
              {selectedCurrency === 'eur' ? (
                <div className="total-price">
                  &euro; {cartTotalEur.toFixed(2)}
                </div>
              ) : (
                <div className="total-price">$ {cartTotalUsd.toFixed(2)}</div>
              )}
            </div>
            <div className="checkout-button-container">
              <Link to="/checkout">
                <div className="checkout-button">Checkout</div>
              </Link>
            </div>
          </div>
        ) : (
          <div className="empty-message">Your cart is empty</div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  cartItems: selectCartItems(state),
  selectedCurrency: selectSelectedCurrency(state),
})

const mapDispatchToProps = (dispatch) => ({
  toggleCartVisible: () => dispatch(toggleCartVisible()),
})

CartDropdown.defaultProps = {
  cartButtonRef: null,
  cartItems: [],
  selectedCurrency: 'eur',
  toggleCartVisible: null,
}

CartDropdown.propTypes = {
  cartButtonRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.node }),
  ]),
  cartItems: PropTypes.arrayOf(PropTypes.object),
  selectedCurrency: PropTypes.string,
  toggleCartVisible: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(CartDropdown)
