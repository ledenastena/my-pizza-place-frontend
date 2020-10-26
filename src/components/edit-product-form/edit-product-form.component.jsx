import React from 'react'
import './edit-product-form.styles.scss'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import FormInputField from '../form-input-field/form-input-field.component'
import FormTextarea from '../form-textarea/form-textarea.component'
import CustomButton from '../custom-button/custom-button.component'
import DeletingSection from '../deleting-section/deleting-section.component'
import {
  selectAvailableProductTypes,
  selectEditingProduct,
  selectEditingError,
  selectDeletingError,
} from '../../redux/product/product.selectors'
import { editProductStart } from '../../redux/product/product.actions'
import { selectAuthToken } from '../../redux/user/user.selectors'

class EditProductForm extends React.Component {
  state = {
    name: this.props.product.name,
    priceEur: this.props.product.price_eur,
    priceUsd: this.props.product.price_usd,
    description: this.props.product.description || '',
    productTypeId: this.props.product.product_type_id,
  }

  fileInput = React.createRef()

  componentDidUpdate(prevProps) {
    const { editingProduct, editingError, history, prevPath } = this.props

    // if addingProduct was true before the update and now is false it means adding is finished but we want to redirect only if it was successful i.e. there is no error
    if (prevProps.editingProduct && !editingProduct && !editingError) {
      history.push(prevPath)
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target

    this.setState({
      [name]: value,
    })
  }

  handleSelectChange = (e) => {
    this.setState({
      productTypeId: e.target.value,
    })
  }

  handleSubmit = (e) => {
    const { editProductStart, authToken } = this.props
    e.preventDefault()
    editProductStart({
      product_id: this.props.product._id,
      product: {
        name: this.state.name,
        product_type_id: this.state.productTypeId,
        price_eur: this.state.priceEur,
        price_usd: this.state.priceUsd,
        description: this.state.description,
      },
      image: this.fileInput.current.files[0] || null,
      token: authToken,
    })
  }

  render() {
    const {
      product,
      availableProductTypes,
      editingError,
      editingProduct,
      deletingError,
      prevPath,
    } = this.props
    const { name, priceEur, priceUsd, description, productTypeId } = this.state

    return (
      <div className="edit-product-form-container">
        <form onSubmit={this.handleSubmit}>
          <div className="form-fields">
            <FormInputField
              name="name"
              type="text"
              label="Name"
              value={name}
              required
              onChange={this.handleChange}
            />
            <FormInputField
              name="priceEur"
              type="number"
              label="Price in eur"
              value={priceEur}
              required
              onChange={this.handleChange}
            />
            <FormInputField
              name="priceUsd"
              type="number"
              label="Price in usd"
              value={priceUsd}
              required
              onChange={this.handleChange}
            />
            <FormTextarea
              name="description"
              type="text"
              label="Product description"
              value={description}
              onChange={this.handleChange}
              cols="40"
              rows="6"
            />
            <div className="select-type-container">
              <label htmlFor="product-type-option">
                Product type
                <select
                  id="product-type-option"
                  className="select-type"
                  value={productTypeId}
                  onChange={this.handleSelectChange}
                >
                  {availableProductTypes.map((type) => (
                    <option key={type._id} value={type._id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="file-input">
              <label className="file-input-label" htmlFor="file-input-field">
                Product image
                <input
                  id="file-input-field"
                  className="file-input-field"
                  type="file"
                  ref={this.fileInput}
                />
              </label>
            </div>
          </div>
          <div className="form-footer">
            {editingError || deletingError ? (
              <span className="error-message">
                {editingError || deletingError}
              </span>
            ) : (
              ''
            )}
            <CustomButton
              type="submit"
              isLoading={editingProduct}
              buttonStyle="edit"
            >
              <FontAwesomeIcon icon={faPen} />
              Edit
            </CustomButton>
            <DeletingSection product={product} prevPath={prevPath} />
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  availableProductTypes: selectAvailableProductTypes(state),
  editingError: selectEditingError(state),
  editingProduct: selectEditingProduct(state),
  authToken: selectAuthToken(state),
  deletingError: selectDeletingError(state),
})

const mapDispatchToProps = (dispatch) => ({
  editProductStart: (reqObj) => dispatch(editProductStart(reqObj)),
})

EditProductForm.defaultProps = {
  availableProductTypes: null,
  editingError: null,
  editingProduct: false,
  authToken: null,
  deletingError: null,
  editProductStart: null,
  product: {},
  prevPath: '/',
  history: {
    push: null,
  },
}

EditProductForm.propTypes = {
  availableProductTypes: PropTypes.arrayOf(PropTypes.object),
  editingError: PropTypes.string,
  editingProduct: PropTypes.bool,
  authToken: PropTypes.string,
  deletingError: PropTypes.string,
  editProductStart: PropTypes.func,
  product: PropTypes.object,
  prevPath: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditProductForm))
