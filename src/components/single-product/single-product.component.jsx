import React from 'react';
import './single-product.styles.scss';
import { addItemToCart, toggleCartVisible } from '../../redux/cart/cart.actions';
import { selectSelectedCurrency } from '../../redux/product/product.selectors';
import { selectCurrentUserType } from '../../redux/user/user.selectors'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import LoadingImage from '../loading-image/loading-image.component'
import squareImage from '../../assets/square.png'

class SingleProduct extends React.Component {
  state = {
    quantity: 0,
    addingMessageShowing: false,
    showDescription: false
  }

  timeoutVar = null
  
  toggleShowDescription = () => {
    this.setState(prevState => ({
      showDescription: !prevState.showDescription
    }))
  }

  handleChange = (e) => {
    this.setState({
      quantity: parseInt(e.target.value)
    });
  }

  handleMinusClick = () => {
    if (this.state.quantity > 0)
      this.setState(prevState => ({
        quantity: prevState.quantity - 1
      }));
  }

  handlePlusClick = () => {
    if (this.state.quantity < 10)
      this.setState(prevState => ({
        quantity: prevState.quantity + 1
      }));
  }

  handleAddToCartClick = () => {    
    const { addItemToCart, toggleCartVisible, item } = this.props
    const quantity = this.state.quantity

    if (quantity > 0) {
      addItemToCart({ item, quantity })
      toggleCartVisible()
      this.setState({
        quantity: 0
      })

      // Showing a message inside the button that products have been added to the cart
      if (!this.state.addingMessageShowing) {
        this.setState({
          addingMessageShowing: true
        }, () => {
          this.timeoutVar = setTimeout(() => {
            this.setState({
              addingMessageShowing: false
            })
          }, 1900)
        })
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutVar)
  }

  render() {
    const { item, currentUserType, selectedCurrency } = this.props;
    
    return (
      <div className='single-product-container'>
        <div className={ `product-description ${ this.state.showDescription ? 'show-description' : '' }`}>
          <LoadingImage className='small-image' imageSrc={ `${process.env.BACKEND_URL}/products/${item._id}/${item.image_name}` } onError={ (e) => e.target.src=squareImage } alt='product-image' />
          <div>
            { item.description }
          </div>
        </div>
        <LoadingImage className={ `list-image ${ this.state.showDescription ? 'hide-image' : '' }`} imageSrc={ `${process.env.BACKEND_URL}/products/${item._id}/${item.image_name}` } onError={ (e) => e.target.src=squareImage } alt='product-image' onClick={ this.toggleShowDescription }/>
        <span className='item-title'>{ item.name }</span>
        {
          (selectedCurrency === 'eur')?
            <span className='item-price'>&euro; { item.price_eur.toFixed(2) }</span>
            :
            <span className='item-price'>$ { item.price_usd.toFixed(2) }</span>      
        }
        <div className='quantity-section'>
          <div className='small-btn minus-quantity' onClick={ this.handleMinusClick }>-</div>
          <input className='display-quantity' value={ this.state.quantity } onChange={ this.handleChange } readOnly />
          <div className='small-btn plus-quantity' onClick={ this.handlePlusClick }>+</div>
        </div>
        <div className='add-to-cart-section'>
          <div className='add-to-cart-button' onClick={ this.handleAddToCartClick }>
            {
              !this.state.addingMessageShowing ?
                <span className='add-to-cart-text'>Add to Cart</span>
                : <span className='added-cart-text'>Added!</span>

            }
          </div>
        </div>
        {
          currentUserType === 'admin' ?
            <div className='admin-section'>
              <Link to={ { pathname: `/edit-product/${item._id}`, state: { prevPath: location.pathname} }   }>
                <span className='edit-icon'>
                  <FontAwesomeIcon icon={ faPen } />
                </span>
                Edit
                </Link>
            </div>
            : ''
        }
      </div>
  );
  }
}

const mapStateToProps = (state) => ({
  currentUserType: selectCurrentUserType(state),
  selectedCurrency: selectSelectedCurrency(state)
})

const mapDispatchToProps = (dispatch) => ({
  addItemToCart: (payload) => dispatch(addItemToCart(payload)),
  toggleCartVisible: () => dispatch(toggleCartVisible()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)