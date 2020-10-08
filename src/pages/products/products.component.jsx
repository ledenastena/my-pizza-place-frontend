import React from 'react'
import './products.styles.scss'
import ProductList from '../../components/product-list/product-list.component'
import Spinner from '../../components/spinner/spinner.component'
import { fetchProductsStart } from '../../redux/product/product.actions'
import { selectItems, selectIsFetching, selectProductErrorMessage, selectCurrentlyShowingProducts } from '../../redux/product/product.selectors'
import { connect } from 'react-redux'

class ProductsPage extends React.Component {  

  componentDidMount() {
    const { fetchProductsStart, currentlyShowingProducts } = this.props
    const requestedProductType = this.props.match.params.type

    // Here we are determing when we want to fetch products from the database. The idea is that if the user opens a page with type of products that are 
    // already fetched there is no need to make another request to the back-end. If the last fetch was for products of type 'pizza', opening the pizza
    // product page will not make another request because we already have those exact product in our Redux state. If we open another product page and request
    // a different set of products then a new request to the back-end is made.
    if (!currentlyShowingProducts || (!requestedProductType && currentlyShowingProducts !== 'all') || (requestedProductType && requestedProductType !== currentlyShowingProducts)) {
      fetchProductsStart(this.props.match.params.type)
    }
  }

  render() {
    const { items, isFetching, errorMessage } = this.props
    console.log(items)

    if (isFetching) {
      return (
        <div className='products-page-container'>
          <div className='loading-div'>
            Loading...
            <Spinner />
          </div>
        </div>
    )
    }    
      
    return (
      <div className='products-page-container'>
        { 
          items.length === 0 ?
            errorMessage ? 
              <div className='error-message'>
              There was an error: { errorMessage }
              </div>
            : <div className='error-message'>
              No products match the search parameters
              </div>
          : <ProductList />          
        }
      </div>
  )    
  }
}

const mapStateToProps = (state) => ({
  isFetching: selectIsFetching(state),
  items: selectItems(state),
  errorMessage: selectProductErrorMessage(state),
  currentlyShowingProducts: selectCurrentlyShowingProducts(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchProductsStart: (typeParam) => dispatch(fetchProductsStart(typeParam))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage)