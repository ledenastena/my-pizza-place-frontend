import React from 'react'
import './edit-product.styles.scss'
import Spinner from '../../components/spinner/spinner.component'
import EditProductForm from '../../components/edit-product-form/edit-product-form.component'
import { selectItems, selectAvailableProductTypes, selectIsProductTypesFetching, selectErrorProductTypesMessage, selectDeletingProduct, selectDeletingError } from '../../redux/product/product.selectors'
import { fetchProductTypesStart } from '../../redux/product/product.actions'
import { selectCurrentUserType, selectAuthToken } from '../../redux/user/user.selectors'
import { connect } from 'react-redux'

class EditProductPage extends React.Component {
  state = {
    product: null
  }

  componentDidMount() {
    const { items, availableProductTypes, fetchProductTypesStart, authToken } = this.props

    if (!availableProductTypes) {
      fetchProductTypesStart(authToken)
    }

    this.setState ({
      product: items.find(item => item._id === this.props.match.params._id)
    })
  }

  render() {
    const { isProductTypesFetching, errorProductTypesMessage, currentUserType } = this.props

    if (currentUserType !== 'admin') {
      return(
        <div className='edit-page-container'>
          <div className=''>
            You are not authorized to view this page
          </div>
        </div>
    )
    }

    if (isProductTypesFetching) {
      return (
        <div className='edit-page-container'>
          <Spinner />
        </div>
    )
    }

    return (
      <div className='edit-page-container'>
        {
          errorProductTypesMessage ?
            <div className=''>
              { errorProductTypesMessage }
            </div>
            : !this.state.product ? 
              <div className=''>
                Please select a product to edit from the list.
              </div>
              : <div>
                  <EditProductForm key={ this.state.product._id } product={ this.state.product } prevPath={ this.props.location.state ? this.props.location.state.prevPath : '/products' } />
                </div> 
        }
      </div>
  )
  }
}

const mapStateToProps = (state) => ({
  items: selectItems(state),
  availableProductTypes: selectAvailableProductTypes(state),
  isProductTypesFetching: selectIsProductTypesFetching(state),
  errorProductTypesMessage: selectErrorProductTypesMessage(state),
  currentUserType: selectCurrentUserType(state),
  authToken: selectAuthToken(state),
  deletingProduct: selectDeletingProduct(state),
  deletingError: selectDeletingError(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchProductTypesStart: (token) => dispatch(fetchProductTypesStart(token))
})
export default connect(mapStateToProps, mapDispatchToProps)(EditProductPage)