import React from 'react'
import './checkout.styles.scss'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import CheckoutItemsList from '../../components/checkout-items-list/checkout-items-list.component'
import {
  selectCartItems,
  selectCartVisible,
} from '../../redux/cart/cart.selectors'
import CheckoutForm from '../../components/checkout-form/checkout-form.component'
import { toggleCartVisible } from '../../redux/cart/cart.actions'

class CheckoutPage extends React.Component {
  componentDidMount() {
    const { cartVisible, toggleCartVisible } = this.props

    if (cartVisible) {
      toggleCartVisible()
    }
  }

  render() {
    const { cartItems } = this.props
    let cartTotalEur = 0
    let cartTotalUsd = 0
    let qtyTotal = 0

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
    qtyTotal = cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0)

    if (cartItems.length) {
      return (
        <div className="checkout-page-container">
          <CheckoutItemsList
            cartTotalEur={cartTotalEur}
            cartTotalUsd={cartTotalUsd}
          />
          <div className="form-wrapper">
            <CheckoutForm
              cartTotalEur={cartTotalEur}
              cartTotalUsd={cartTotalUsd}
              qtyTotal={qtyTotal}
            />
          </div>
        </div>
      )
    }

    return (
      <div className="checkout-page-container">
        <div className="empty-cart-message">
          You have no products in your cart.
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  cartItems: selectCartItems(state),
  cartVisible: selectCartVisible(state),
})

const mapDispatchToProps = (dispatch) => ({
  toggleCartVisible: (payload) => dispatch(toggleCartVisible(payload)),
})

CheckoutPage.defaultProps = {
  cartItems: [],
  cartVisible: false,
  toggleCartVisible: null,
}

CheckoutPage.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.object),
  cartVisible: PropTypes.bool,
  toggleCartVisible: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage)
