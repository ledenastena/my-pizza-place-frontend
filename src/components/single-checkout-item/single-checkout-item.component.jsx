import React from 'react'
import './single-checkout-item.styles.scss'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { selectSelectedCurrency } from '../../redux/product/product.selectors'
import {
  clearItemFromCart,
  decreaseItemQuantity,
  addItemToCart,
} from '../../redux/cart/cart.actions'
import LoadingImage from '../loading-image/loading-image.component'
import squareImage from '../../assets/square.png'

class SingleCheckoutItem extends React.Component {
  // initialize click handler passed through the callback if the key pressed is ENTER
  handleKeyDown = (e, callback) => {
    if (e.keyCode === 13) {
      e.preventDefault()
      callback()
    }
  }

  render() {
    const {
      cartItem,
      clearItemFromCart,
      decreaseItemQuantity,
      addItemToCart,
      selectedCurrency,
    } = this.props

    return (
      <div className="single-checkout-item-container">
        <div className="img-column">
          <div className="checkout-item-image">
            <LoadingImage
              imageSrc={`${process.env.BACKEND_URL}/products/${cartItem.item._id}/${cartItem.item.image_name}`}
              onError={(e) => {
                e.target.src = squareImage
              }}
              alt="product"
            />
          </div>
        </div>
        <div className="options-column">
          <div className="checkout-item-quantity info-column">
            <div
              className="small-btn minus-quantity"
              onClick={() =>
                decreaseItemQuantity({
                  item: cartItem.item,
                  quantity: cartItem.quantity,
                })
              }
              onKeyDown={(e) => {
                this.handleKeyDown(e, () =>
                  decreaseItemQuantity({
                    item: cartItem.item,
                    quantity: cartItem.quantity,
                  })
                )
              }}
              role="button"
              tabIndex={0}
            >
              -
            </div>
            <input
              className="display-quantity"
              value={cartItem.quantity}
              readOnly
            />
            <div
              className="small-btn plus-quantity"
              onClick={() =>
                addItemToCart({ item: cartItem.item, quantity: 1 })
              }
              onKeyDown={(e) => {
                this.handleKeyDown(e, () =>
                  addItemToCart({ item: cartItem.item, quantity: 1 })
                )
              }}
              role="button"
              tabIndex={0}
            >
              +
            </div>
          </div>
          {selectedCurrency === 'eur' ? (
            <div className="checkout-item-price info-column">
              &euro;{' '}
              {(
                parseFloat(cartItem.item.price_eur) * cartItem.quantity
              ).toFixed(2)}
            </div>
          ) : (
            <div className="checkout-item-price info-column">
              ${' '}
              {(
                parseFloat(cartItem.item.price_usd) * cartItem.quantity
              ).toFixed(2)}
            </div>
          )}
          <div className="checkout-item-trash remove-column">
            <FontAwesomeIcon
              icon={faTrashAlt}
              onClick={() => clearItemFromCart(cartItem)}
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  selectedCurrency: selectSelectedCurrency(state),
})

const mapDispatchToProps = (dispatch) => ({
  clearItemFromCart: (payload) => dispatch(clearItemFromCart(payload)),
  decreaseItemQuantity: (payload) => dispatch(decreaseItemQuantity(payload)),
  addItemToCart: (payload) => dispatch(addItemToCart(payload)),
})

SingleCheckoutItem.defaultProps = {
  cartItem: null,
  selectedCurrency: 'eur',
  clearItemFromCart: null,
  decreaseItemQuantity: null,
  addItemToCart: null,
}

SingleCheckoutItem.propTypes = {
  cartItem: PropTypes.object,
  selectedCurrency: PropTypes.string,
  clearItemFromCart: PropTypes.func,
  decreaseItemQuantity: PropTypes.func,
  addItemToCart: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleCheckoutItem)
