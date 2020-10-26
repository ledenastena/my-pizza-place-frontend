import React from 'react'
import './add-product-form.styles.scss'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import FormInputField from '../form-input-field/form-input-field.component'
import FormTextarea from '../form-textarea/form-textarea.component'
import CustomButton from '../custom-button/custom-button.component'
import {
  selectAvailableProductTypes,
  selectAddingProduct,
  selectAddingError,
} from '../../redux/product/product.selectors'
import { addProductStart } from '../../redux/product/product.actions'
import { selectAuthToken } from '../../redux/user/user.selectors'

class AddProductForm extends React.Component {
  state = {
    name: '',
    priceEur: '',
    priceUsd: '',
    description: '',
    productTypeId: '',
  }

  fileInput = React.createRef()

  componentDidUpdate(prevProps) {
    const { addingProduct, addingError, history, prevPath } = this.props

    // if addingProduct was true before the update and now is false it means adding is finished but we want to redirect only if it was successful i.e. there is no error
    if (prevProps.addingProduct && !addingProduct && !addingError) {
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
    const { addProductStart, authToken } = this.props
    const { name, productTypeId, priceEur, priceUsd, description } = this.state

    e.preventDefault()

    addProductStart({
      product: {
        name,
        product_type_id: productTypeId,
        price_eur: priceEur,
        price_usd: priceUsd,
        description,
      },
      image: this.fileInput.current.files[0] || null,
      token: authToken,
    })
  }

  render() {
    const { availableProductTypes, addingError, addingProduct } = this.props
    const { name, priceEur, priceUsd, description, productTypeId } = this.state

    return (
      <div className="add-product-form-container">
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
                  required
                  value={productTypeId}
                  onChange={this.handleSelectChange}
                >
                  <option value="" disabled>
                    -select option
                  </option>
                  {availableProductTypes.map((type) => (
                    <option key={type._id} value={type._id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="file-input">
              <label htmlFor="file-input-field" className="file-input-label">
                Product image
                <input
                  id="file-input-field"
                  className="file-input-field"
                  type="file"
                  ref={this.fileInput}
                />
              </label>
            </div>
            {addingError ? (
              <span className="error-message">{addingError}</span>
            ) : (
              ''
            )}
          </div>
          <div className="form-footer">
            <CustomButton type="submit" isLoading={addingProduct}>
              <FontAwesomeIcon icon={faPlus} />
              Create
            </CustomButton>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  availableProductTypes: selectAvailableProductTypes(state),
  addingProduct: selectAddingProduct(state),
  addingError: selectAddingError(state),
  authToken: selectAuthToken(state),
})

const mapDispatchToProps = (dispatch) => ({
  addProductStart: (reqObj) => dispatch(addProductStart(reqObj)),
})

AddProductForm.defaultProps = {
  availableProductTypes: null,
  addingProduct: false,
  addingError: null,
  authToken: null,
  prevPath: '/',
  history: {
    push: null,
  },
  addProductStart: null,
}

AddProductForm.propTypes = {
  availableProductTypes: PropTypes.arrayOf(PropTypes.object),
  addingProduct: PropTypes.bool,
  addingError: PropTypes.string,
  authToken: PropTypes.string,
  prevPath: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  addProductStart: PropTypes.func,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddProductForm))
