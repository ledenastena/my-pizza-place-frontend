import React from 'react'
import './product-list.styles.scss'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import SingleProduct from '../single-product/single-product.component'
import { selectItems } from '../../redux/product/product.selectors'
import { selectCurrentUserType } from '../../redux/user/user.selectors'

const ProductList = ({ items, currentUserType, location }) => (
  <div className="product-list-container">
    <div className="row">
      {items.map((item) => (
        <div key={item._id} className="col-3 col-m-4 col-s-6">
          <SingleProduct item={item} />
        </div>
      ))}
    </div>
    {currentUserType === 'admin' ? (
      <div className="add-product-section">
        <Link
          to={{
            pathname: '/add-product',
            state: { prevPath: location.pathname },
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
          Add a new product
        </Link>
      </div>
    ) : (
      ''
    )}
  </div>
)

const mapStateToProps = (state) => ({
  items: selectItems(state),
  currentUserType: selectCurrentUserType(state),
})

ProductList.defaultProps = {
  items: [],
  currentUserType: null,
  location: {},
}

ProductList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  currentUserType: PropTypes.string,
  location: PropTypes.object,
}

export default connect(mapStateToProps)(ProductList)
