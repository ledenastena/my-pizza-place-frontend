import React from 'react'
import './products.styles.scss'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ProductList from '../../components/product-list/product-list.component'
import Spinner from '../../components/spinner/spinner.component'
import { fetchProductsStart } from '../../redux/product/product.actions'
import {
  selectItems,
  selectIsFetching,
  selectProductErrorMessage,
  selectCurrentlyShowingProducts,
} from '../../redux/product/product.selectors'

class ProductsPage extends React.Component {
  componentDidMount() {
    const { fetchProductsStart, currentlyShowingProducts, match } = this.props
    const requestedProductType = match.params.type

    // Here we are determing when we want to fetch products from the database. The idea is that if the user opens a page with type of products that are
    // already fetched there is no need to make another request to the back-end. If the last fetch was for products of type 'pizza', opening the pizza
    // product page will not make another request because we already have those exact products in our Redux state. If we open another product page and request
    // a different set of products then a new request to the back-end is made.
    if (
      !currentlyShowingProducts ||
      (!requestedProductType && currentlyShowingProducts !== 'all') ||
      (requestedProductType &&
        requestedProductType !== currentlyShowingProducts)
    ) {
      fetchProductsStart(match.params.type)
    }
  }

  render() {
    const { items, isFetching, errorMessage } = this.props

    if (isFetching) {
      return (
        <div className="products-page-container">
          <div className="loading-div">
            Loading...
            <Spinner />
          </div>
        </div>
      )
    }

    return (
      <div className="products-page-container">
        {items.length === 0 ? (
          errorMessage ? (
            <div className="error-message">
              There was an error: {errorMessage}
            </div>
          ) : (
            <div className="error-message">
              No products match the search parameters
            </div>
          )
        ) : (
          <ProductList />
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isFetching: selectIsFetching(state),
  items: selectItems(state),
  errorMessage: selectProductErrorMessage(state),
  currentlyShowingProducts: selectCurrentlyShowingProducts(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchProductsStart: (typeParam) => dispatch(fetchProductsStart(typeParam)),
})

ProductsPage.defaultProps = {
  isFetching: false,
  items: [],
  errorMessage: null,
  currentlyShowingProducts: null,
  fetchProductsStart: null,
  match: {
    params: {},
  },
}

ProductsPage.propTypes = {
  isFetching: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.object),
  errorMessage: PropTypes.string,
  currentlyShowingProducts: PropTypes.string,
  fetchProductsStart: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }),
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage)
