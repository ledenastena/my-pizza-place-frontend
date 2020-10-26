import React from 'react'
import { connect } from 'react-redux'
import './user-orders.styles.scss'
import PropTypes from 'prop-types'
import Spinner from '../spinner/spinner.component'
import OrderList from '../order-list/order-list.component'
import {
  selectUserOrders,
  selectFetchingOrders,
  selectFetchingOrdersError,
} from '../../redux/cart/cart.selectors'
import { selectAuthToken } from '../../redux/user/user.selectors'
import { fetchOrdersStart } from '../../redux/cart/cart.actions'

class UserOrders extends React.Component {
  componentDidMount() {
    const { fetchOrdersStart, authToken } = this.props

    fetchOrdersStart(authToken)
  }

  render() {
    const { userOrders, fetchingOrders, fetchingOrdersError } = this.props

    if (fetchingOrders) {
      return (
        <div className="user-orders-container">
          <Spinner />
        </div>
      )
    }

    return (
      <div className="user-orders-container">
        {userOrders.length === 0 ? (
          fetchingOrdersError ? (
            <div className="error-message">
              There was an error: {fetchingOrdersError}
            </div>
          ) : (
            <div className="error-message">You have no previous orders</div>
          )
        ) : (
          <OrderList />
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  userOrders: selectUserOrders(state),
  fetchingOrders: selectFetchingOrders(state),
  fetchingOrdersError: selectFetchingOrdersError(state),
  authToken: selectAuthToken(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchOrdersStart: (token) => dispatch(fetchOrdersStart(token)),
})

UserOrders.defaultProps = {
  userOrders: [],
  fetchingOrders: false,
  fetchingOrdersError: null,
  authToken: null,
  fetchOrdersStart: null,
}

UserOrders.propTypes = {
  userOrders: PropTypes.arrayOf(PropTypes.object),
  fetchingOrders: PropTypes.bool,
  fetchingOrdersError: PropTypes.string,
  authToken: PropTypes.string,
  fetchOrdersStart: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserOrders)
