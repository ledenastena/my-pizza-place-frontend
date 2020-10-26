import React from 'react'
import { connect } from 'react-redux'
import './order-list.styles.scss'
import PropTypes from 'prop-types'
import { selectUserOrders } from '../../redux/cart/cart.selectors'
import SingleOrder from '../single-order/single-order.component'

const OrderList = ({ userOrders }) => (
  <div className="order-list-container">
    <div className="order-list-heading">Your past orders</div>
    {userOrders.map((order) => (
      <SingleOrder key={order._id} order={order} />
    ))}
  </div>
)

const mapStateToProps = (state) => ({
  userOrders: selectUserOrders(state),
})

OrderList.defaultProps = {
  userOrders: null,
}

OrderList.propTypes = {
  userOrders: PropTypes.arrayOf(PropTypes.object),
}

export default connect(mapStateToProps)(OrderList)
