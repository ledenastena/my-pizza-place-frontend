import React from 'react'
import { connect } from 'react-redux'
import './order-list.styles.scss'
import { selectUserOrders } from '../../redux/cart/cart.selectors'
import SingleOrder from '../single-order/single-order.component'

class OrderList extends React.Component {
  render() {
    const { userOrders }  = this.props

    return(
      <div className='order-list-container'>
        <div className='order-list-heading'>Your past orders</div>
        {
          userOrders.map((order, index) => (
            <SingleOrder key={ index } order={ order } />
          ))
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  userOrders: selectUserOrders(state)
})

export default connect(mapStateToProps)(OrderList)