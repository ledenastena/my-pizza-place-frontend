import React from 'react'
import './checkout-items-list.styles.scss'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SingleCheckoutItem from '../single-checkout-item/single-checkout-item.component'
import { selectCartItems } from '../../redux/cart/cart.selectors'
import { selectSelectedCurrency } from '../../redux/product/product.selectors'

const CheckoutItemsList = ({
  cartItems,
  selectedCurrency,
  cartTotalEur,
  cartTotalUsd,
}) => (
  <div className="checkout-items-list-container">
    <div className="checkout-headings">
      <span className="heading img-column" />
      <span className="heading info-column">Qty</span>
      <span className="heading info-column">Price</span>
      <span className="heading remove-column" />
    </div>
    {cartItems.map((cartItem) => (
      <SingleCheckoutItem key={cartItem.item._id} cartItem={cartItem} />
    ))}
    <div className="checkout-total">
      <div className="info-column">Total:</div>
      <div className="info-column">
        {selectedCurrency === 'eur' ? (
          <span>&euro; {cartTotalEur.toFixed(2)}</span>
        ) : (
          <span>$ {cartTotalUsd.toFixed(2)}</span>
        )}
      </div>
      <div className="remove-column" />
    </div>
  </div>
)

const mapStateToProps = (state) => ({
  cartItems: selectCartItems(state),
  selectedCurrency: selectSelectedCurrency(state),
})

CheckoutItemsList.defaultProps = {
  cartItems: [],
  selectedCurrency: 'eur',
  cartTotalEur: 0,
  cartTotalUsd: 0,
}

CheckoutItemsList.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.object),
  selectedCurrency: PropTypes.string,
  cartTotalEur: PropTypes.number,
  cartTotalUsd: PropTypes.number,
}

export default connect(mapStateToProps)(CheckoutItemsList)
