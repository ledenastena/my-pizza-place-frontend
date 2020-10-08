import React from 'react'
import './add-product-form.styles.scss'
import FormInputField from '../form-input-field/form-input-field.component'
import FormTextarea from '../form-textarea/form-textarea.component'
import CustomButton from '../custom-button/custom-button.component'
import { selectAvailableProductTypes, selectAddingProduct, selectAddingError, selectCurrentlyShowingProducts } from '../../redux/product/product.selectors'
import { addProductStart } from '../../redux/product/product.actions'
import { selectAuthToken } from '../../redux/user/user.selectors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class AddProductForm extends React.Component {
  state = {
    name: '',
    price_eur: '',
    price_usd: '',
    description: '',
    product_type_id: ''
  }

  fileInput = React.createRef()

  componentDidUpdate(prevProps) {
    const { addingProduct, addingError } = this.props;

    // if addingProduct was true before the update and now is false it means adding is finished but we want to redirect only if it was successful i.e. there is no error
    if (prevProps.addingProduct && !addingProduct && !addingError) {
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
    const { addProductStart, authToken } = this.props
    e.preventDefault()

    addProductStart({
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
    const { availableProductTypes, addingError, addingProduct } = this.props

    return (
      <div className='add-product-form-container'>
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
              <select id='product-type-option' className='select-type' required value={this.state.product_type_id} onChange={this.handleSelectChange}>
                  <option value='' disabled>-select option</option>
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
            {
              addingError ?  
              <span className='error-message'>{ addingError }</span>
              : ''
            }
          </div>
          <div className='form-footer'>
            <CustomButton type='submit' isLoading={ addingProduct }>
              <FontAwesomeIcon icon={ faPlus } />
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
  currentlyShowingProducts: selectCurrentlyShowingProducts(state)
})

const mapDispatchToProps = (dispatch) => ({
  addProductStart: (reqObj) => dispatch(addProductStart(reqObj))
})

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(AddProductForm))