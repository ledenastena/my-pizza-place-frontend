import React from 'react'
import './edit-product-form.styles.scss'
import FormInputField from '../form-input-field/form-input-field.component'
import FormTextarea from '../form-textarea/form-textarea.component'
import CustomButton from '../custom-button/custom-button.component'
import DeletingSection from '../deleting-section/deleting-section.component'
import { selectAvailableProductTypes, selectEditingProduct, selectEditingError, selectCurrentlyShowingProducts, selectDeletingError } from '../../redux/product/product.selectors'
import { editProductStart } from '../../redux/product/product.actions'
import { selectAuthToken } from '../../redux/user/user.selectors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class EditProductForm extends React.Component {
  state = {
    name: this.props.product.name,
    price_eur: this.props.product.price_eur,
    price_usd: this.props.product.price_usd,
    description: this.props.product.description || '',
    product_type_id: this.props.product.product_type_id
  }

  fileInput = React.createRef()

  componentDidUpdate(prevProps) {
    const { editingProduct, editingError } = this.props;

    // if addingProduct was true before the update and now is false it means adding is finished but we want to redirect only if it was successful i.e. there is no error
    if (prevProps.editingProduct && !editingProduct && !editingError) {
      this.props.history.push(this.props.prevPath);
    }
  }
  
  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    
    this.setState({
      [name]: value
    });
  }

  handleSelectChange = (e) => {
    this.setState({
      product_type_id: e.target.value
    })
  }

  handleSubmit = (e) => {
    const { editProductStart, authToken } = this.props
    e.preventDefault()
    editProductStart({
      product_id: this.props.product._id,
      product: {
        name: this.state.name,
        product_type_id: this.state.product_type_id,
        price_eur: this.state.price_eur,
        price_usd: this.state.price_usd,
        description: this.state.description
      },
      image: this.fileInput.current.files[0] || null,
      token: authToken
    })
  }

  render() {
    const { product, availableProductTypes, editingError, editingProduct, deletingError } = this.props

    return (
      <div className='edit-product-form-container'>
        <form onSubmit={this.handleSubmit}>
          <div className='form-fields'>
            <FormInputField 
              name='name'
              type='text'
              label='Name'
              value={ this.state.name }
              required
              onChange={ this.handleChange }
            />
            <FormInputField 
              name='price_eur'
              type='number'
              label='Price in eur'
              value={ this.state.price_eur }
              required
              onChange={ this.handleChange }
            />
            <FormInputField 
              name='price_usd'
              type='number'
              label='Price in usd'
              value={ this.state.price_usd }
              required
              onChange={ this.handleChange }
            />
            <FormTextarea
              name='description'
              type='text'
              label='Product description'
              value={ this.state.description }
              onChange={ this.handleChange }
              cols='40'
              rows='6'
            />
            <div className='select-type-container'>
              <label htmlFor='product-type-option'>Product type</label>
              <select id='product-type-option' className='select-type' value={this.state.product_type_id} onChange={this.handleSelectChange}>
                {
                  availableProductTypes.map((type, index) => (
                    <option key={index} value={type._id}>{type.name}</option>
                ))
                }
              </select>
            </div>
            <div className='file-input'>
              <label className='file-input-label' htmlFor='file-input-field'>Product image</label>
              <input id='file-input-field' className='file-input-field' type='file' ref={this.fileInput} />
            </div>
          </div>
          <div className='form-footer'>
            {
              editingError || deletingError ?  
              <span className='error-message'>{ editingError || deletingError }</span>
              : ''
            }
            <CustomButton type='submit' isLoading={ editingProduct } buttonStyle='edit' >
              <FontAwesomeIcon icon={ faPen } />
              Edit
            </CustomButton>
            <DeletingSection product={ product } prevPath={ this.props.prevPath } />
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
  currentlyShowingProducts: selectCurrentlyShowingProducts(state),
  deletingError: selectDeletingError(state),
})

const mapDispatchToProps = (dispatch) => ({
  editProductStart: (reqObj) => dispatch(editProductStart(reqObj))
})

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(EditProductForm))