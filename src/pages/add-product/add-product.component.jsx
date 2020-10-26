import React from 'react'
import './add-product.styles.scss'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Spinner from '../../components/spinner/spinner.component'
import AddProductForm from '../../components/add-product-form/add-product-form.component'
import {
  selectCurrentUserType,
  selectAuthToken,
} from '../../redux/user/user.selectors'
import {
  selectAvailableProductTypes,
  selectIsProductTypesFetching,
  selectErrorProductTypesMessage,
} from '../../redux/product/product.selectors'
import { fetchProductTypesStart } from '../../redux/product/product.actions'

class AddProductPage extends React.Component {
  componentDidMount() {
    const {
      availableProductTypes,
      fetchProductTypesStart,
      authToken,
    } = this.props

    if (!availableProductTypes) {
      fetchProductTypesStart(authToken)
    }
  }

  render() {
    const {
      isProductTypesFetching,
      errorProductTypesMessage,
      currentUserType,
      availableProductTypes,
      location,
    } = this.props

    if (currentUserType !== 'admin') {
      return (
        <div className="add-page-container">
          <div className="">You are not authorized to view this page</div>
        </div>
      )
    }

    if (isProductTypesFetching) {
      return (
        <div className="add-page-container">
          <Spinner />
        </div>
      )
    }

    return (
      <div className="add-page-container">
        {errorProductTypesMessage ? (
          <div className="">{errorProductTypesMessage}</div>
        ) : !availableProductTypes ? (
          ''
        ) : (
          <AddProductForm
            prevPath={location.state ? location.state.prevPath : '/products'}
          />
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  availableProductTypes: selectAvailableProductTypes(state),
  isProductTypesFetching: selectIsProductTypesFetching(state),
  errorProductTypesMessage: selectErrorProductTypesMessage(state),
  currentUserType: selectCurrentUserType(state),
  authToken: selectAuthToken(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchProductTypesStart: (token) => dispatch(fetchProductTypesStart(token)),
})

AddProductPage.defaultProps = {
  availableProductTypes: null,
  isProductTypesFetching: false,
  errorProductTypesMessage: null,
  currentUserType: null,
  authToken: null,
  fetchProductTypesStart: null,
  location: {},
}

AddProductPage.propTypes = {
  availableProductTypes: PropTypes.arrayOf(PropTypes.object),
  isProductTypesFetching: PropTypes.bool,
  errorProductTypesMessage: PropTypes.string,
  currentUserType: PropTypes.string,
  authToken: PropTypes.string,
  fetchProductTypesStart: PropTypes.func,
  location: PropTypes.object,
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProductPage)
