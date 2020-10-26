import React from 'react'
import './checkout-form.styles.scss'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { clearAllCartItems, addOrderStart } from '../../redux/cart/cart.actions'
import {
  selectCartItems,
  selectAddingOrder,
  selectAddingOrderError,
} from '../../redux/cart/cart.selectors'
import {
  selectCurrentUser,
  selectAuthToken,
} from '../../redux/user/user.selectors'
import CustomButton from '../custom-button/custom-button.component'

class CheckoutForm extends React.Component {
  state = {
    isLoading: false,
    success: false,
    name: '',
    number: '',
    address: '',
  }

  componentDidUpdate(prevProps) {
    const {
      addingOrder,
      addingOrderError,
      clearAllCartItems,
      history,
    } = this.props
    const { success } = this.state

    // Setting the state inside componentDidUpdate must be performed inside a function like this
    if (prevProps.addingOrder && !addingOrder && !addingOrderError) {
      this.performUpdate(() => {
        this.setState({
          success: true,
        })
      })
    }

    if (success) {
      setTimeout(() => {
        clearAllCartItems()
        history.push('/')
      }, 1500)
    }
  }

  performUpdate = (callback) => {
    callback()
  }

  handleChange = (e) => {
    const { name, value } = e.target

    this.setState({
      [name]: value,
    })
  }

  handleSubmit = (e) => {
    const {
      currentUser,
      authToken,
      addOrderStart,
      cartItems,
      qtyTotal,
      cartTotalEur,
      cartTotalUsd,
    } = this.props
    e.preventDefault()

    if (currentUser) {
      const items = []
      const quantities = []

      cartItems.forEach((cartItem) => {
        items.push(cartItem.item._id)
        quantities.push(cartItem.quantity)
      })

      this.setState({
        name: '',
        number: '',
        address: '',
      })

      addOrderStart({
        order: {
          user_id: currentUser._id,
          items,
          quantities,
          total_quantity: qtyTotal,
          total_price_eur: cartTotalEur,
          total_price_usd: cartTotalUsd,
        },
        token: authToken,
      })
    } else {
      this.setState({
        isLoading: true,
        name: '',
        number: '',
        address: '',
      })
      setTimeout(
        () =>
          this.setState({
            isLoading: false,
            success: true,
          }),
        1500
      )
    }
  }

  render() {
    const { isLoading, success, name, number, address } = this.state
    const { addingOrder, addingOrderError } = this.props

    const buttonText = success ? 'Done' : 'Order'

    return (
      <div className="checkout-form-container">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name" className="form-label">
            Your Name
            <input
              id="name"
              type="text"
              name="name"
              required
              value={name}
              className="form-input"
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="number" className="form-label">
            Your Number
            <input
              id="number"
              type="text"
              name="number"
              required
              value={number}
              className="form-input"
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="address" className="form-label">
            Your Addres
            <input
              id="address"
              type="text"
              name="address"
              required
              value={address}
              className="form-input"
              onChange={this.handleChange}
            />
          </label>
          <div className="form-footer">
            {addingOrderError ? (
              <span className="error-message">{addingOrderError}</span>
            ) : (
              ''
            )}
            <CustomButton type="submit" isLoading={isLoading || addingOrder}>
              {buttonText}
            </CustomButton>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  addingOrder: selectAddingOrder(state),
  addingOrderError: selectAddingOrderError(state),
  currentUser: selectCurrentUser(state),
  authToken: selectAuthToken(state),
  cartItems: selectCartItems(state),
})

const mapDispatchToProps = (dispatch) => ({
  clearAllCartItems: () => dispatch(clearAllCartItems()),
  addOrderStart: (reqObj) => dispatch(addOrderStart(reqObj)),
})

CheckoutForm.defaultProps = {
  cartTotalEur: 0,
  cartTotalUsd: 0,
  qtyTotal: 0,
  addingOrder: false,
  addingOrderError: null,
  currentUser: null,
  authToken: null,
  cartItems: [],
  history: {
    push: null,
  },
  clearAllCartItems: null,
  addOrderStart: null,
}

CheckoutForm.propTypes = {
  cartTotalEur: PropTypes.number,
  cartTotalUsd: PropTypes.number,
  qtyTotal: PropTypes.number,
  addingOrder: PropTypes.bool,
  addingOrderError: PropTypes.string,
  currentUser: PropTypes.object,
  authToken: PropTypes.string,
  cartItems: PropTypes.arrayOf(PropTypes.object),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  clearAllCartItems: PropTypes.func,
  addOrderStart: PropTypes.func,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CheckoutForm))
