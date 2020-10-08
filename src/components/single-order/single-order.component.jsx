import React from 'react'
import './single-order.styles.scss'
import SingleOrderItem from '../single-order-item/single-order-item.component'
import { selectSelectedCurrency } from '../../redux/product/product.selectors'
import { connect } from 'react-redux'

class SingleOrder extends React.Component {
  render() {
    const { order, selectedCurrency } = this.props

    return (
      <div className='single-order-container'>
        <div className='single-order-date'>
          { new Date(order.createdAt).toDateString()}
          </div>
        <div className='order-headings'>
          <div className='order-image-column'></div>
          <div className='order-quantity-column'>Qty</div>
          <div className='order-price-column'>Price</div>
        </div>
        <div className='order-items'>
          {
            order.items.map((item, index) => (
              <SingleOrderItem key={ index } item={ item } quantity={ order.quantities[index]} />
            ))
          }
        </div>
        <div className='order-total'>
          <div className='order-image-column'/>
          <div className='order-total-text order-quantity-column'>Total:</div>
          <div className='order-total-amount order-price-column'>
            { 
              selectedCurrency === 'eur' ?
                order.total_price_eur.toFixed(2) + ' €'
                : order.total_price_usd.toFixed(2) + ' $'
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  selectedCurrency: selectSelectedCurrency(state)
})

export default connect(mapStateToProps)(SingleOrder)