import React from 'react'
import './single-order-item.styles.scss'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { selectSelectedCurrency } from '../../redux/product/product.selectors'
import LoadingImage from '../loading-image/loading-image.component'
import squareImage from '../../assets/square.png'

const SingleOrderItem = ({ item, quantity, selectedCurrency }) => {
  const priceEur = item.price_eur * quantity
  const priceUsd = item.price_usd * quantity

  return (
    <div className="single-order-item-container">
      <div className="order-image-column">
        <LoadingImage
          className="order-image"
          imageSrc={`${process.env.BACKEND_URL}/products/${item._id}/${item.image_name}`}
          onError={(e) => {
            e.target.src = squareImage
          }}
          alt="product"
        />
      </div>
      <div className="order-quantity-column">{quantity}</div>
      <div className="order-price-column">
        {selectedCurrency === 'eur'
          ? `${priceEur.toFixed(2)} €`
          : `${priceUsd.toFixed(2)} $`}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  selectedCurrency: selectSelectedCurrency(state),
})

SingleOrderItem.defaultProps = {
  selectedCurrency: 'eur',
  item: null,
  quantity: null,
}

SingleOrderItem.propTypes = {
  selectedCurrency: PropTypes.string,
  item: PropTypes.object,
  quantity: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default connect(mapStateToProps)(SingleOrderItem)
