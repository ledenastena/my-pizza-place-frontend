import React from 'react'
import './edit-product.styles.scss'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Spinner from '../../components/spinner/spinner.component'
import EditProductForm from '../../components/edit-product-form/edit-product-form.component'
import {
  selectItems,
  selectAvailableProductTypes,
  selectIsProductTypesFetching,
  selectErrorProductTypesMessage,
} from '../../redux/product/product.selectors'
import { fetchProductTypesStart } from '../../redux/product/product.actions'
import {
  selectCurrentUserType,
  selectAuthToken,
} from '../../redux/user/user.selectors'

class EditProductPage extends React.Component {
  state = {
    product: null,
  }

  componentDidMount() {
    const {
      items,
      availableProductTypes,
      fetchProductTypesStart,
      authToken,
      match,
    } = this.props

    if (!availableProductTypes) {
      fetchProductTypesStart(authToken)
    }

    this.setState({
      product: items.find((item) => item._id === match.params._id),
    })
  }

  render() {
    const {
      isProductTypesFetching,
      errorProductTypesMessage,
      currentUserType,
      location,
    } = this.props
    const { product } = this.state

    if (currentUserType !== 'admin') {
      return (
        <div className="edit-page-container">
          <div className="">You are not authorized to view this page</div>
        </div>
      )
    }

    if (isProductTypesFetching) {
      return (
        <div className="edit-page-container">
          <Spinner />
        </div>
      )
    }

    return (
      <div className="edit-page-container">
        {errorProductTypesMessage ? (
          <div className="">{errorProductTypesMessage}</div>
        ) : !product ? (
          <div className="">Please select a product to edit from the list.</div>
        ) : (
          <div>
            <EditProductForm
              key={product._id}
              product={product}
              prevPath={location.state ? location.state.prevPath : '/products'}
            />
          </div>
        )}
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
})

const mapDispatchToProps = (dispatch) => ({
  fetchProductTypesStart: (token) => dispatch(fetchProductTypesStart(token)),
})

EditProductPage.defaultProps = {
  items: [],
  availableProductTypes: null,
  isProductTypesFetching: false,
  errorProductTypesMessage: null,
  currentUserType: null,
  authToken: null,
  fetchProductTypesStart: null,
  match: {
    params: {},
  },
  location: {},
}

EditProductPage.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  availableProductTypes: PropTypes.arrayOf(PropTypes.object),
  isProductTypesFetching: PropTypes.bool,
  errorProductTypesMessage: PropTypes.string,
  currentUserType: PropTypes.string,
  authToken: PropTypes.string,
  fetchProductTypesStart: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }),
  location: PropTypes.object,
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProductPage)
