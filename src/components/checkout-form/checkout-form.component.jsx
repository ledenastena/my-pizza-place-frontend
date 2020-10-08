import React from 'react';
import './checkout-form.styles.scss';
import { clearAllCartItems, addOrderStart } from '../../redux/cart/cart.actions';
import { selectCartItems, selectAddingOrder, selectAddingOrderError } from '../../redux/cart/cart.selectors';
import { selectCurrentUser, selectAuthToken } from '../../redux/user/user.selectors'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import CustomButton from '../custom-button/custom-button.component';

class CheckoutForm extends React.Component {
  state = {
    isLoading: false,
    success: false,
    name: '',
    number: '',
    address: ''
  }

  componentDidUpdate(prevProps) {
    if (prevProps.addingOrder && !this.props.addingOrder && !this.props.addingOrderError) {
      this.setState({
        success: true
      })
    }

    if (this.state.success) {
      setTimeout(() => {
        this.props.clearAllCartItems();
        this.props.history.push('/');
      }, 1500)
    }
  }

  handleChange = (e) => {
    let key = e.target.name;
    let value = e.target.value;

    this.setState({
      [key]: value
    });

  }

  handleSubmit = (e) => {
    const { currentUser, authToken, addOrderStart, cartItems, qtyTotal, cartTotalEur, cartTotalUsd } = this.props
    e.preventDefault();
      
    if (currentUser) {
      let items = []
      let quantities = []

      cartItems.forEach(cartItem => {
        items.push(cartItem.item._id)
        quantities.push(cartItem.quantity)
      })    
      
      this.setState({
        name: '',
        number: '',
        address: ''
      })

      addOrderStart({
        order: {
          user_id: currentUser._id,
          items,
          quantities,
          total_quantity: qtyTotal,
          total_price_eur: cartTotalEur,
          total_price_usd: cartTotalUsd
        },
        token: authToken
      })            
    } else {
      this.setState({
        isLoading: true,
        name: '',
        number: '',
        address: ''
      });
      setTimeout(() => (this.setState({
        isLoading: false,
        success: true
      })), 1500);
    }          
  }

  render() {
    const { isLoading, success } = this.state;
    const { addingOrder, addingOrderError } = this.props

    let buttonText = success ? 'Done' : 'Order';

    return (
      <div className='checkout-form-container'>
        <form onSubmit={ this.handleSubmit }>
          <label
            htmlFor='name'
            className='form-label'
            >
              Your Name
          </label>
          <input 
            id='name'
            type='text'
            name='name'
            required
            value={ this.state.name }
            className='form-input'
            onChange={ this.handleChange }
          />
          <label
            htmlFor='number'
            className='form-label'
            >
              Your Number
          </label>
          <input
            id='number'
            type='text'
            name='number'
            required
            value={ this.state.number }
            className='form-input'
            onChange={ this.handleChange }
          />
          <label
            htmlFor='address'
            className='form-label'
            >
              Your Addres
          </label>
          <input
            id='address'
            type='text'
            name='address'
            required
            value={ this.state.address }
            className='form-input'
            onChange={ this.handleChange }
          />
          <div className='form-footer'>
            {
              addingOrderError ?  
              <span className='error-message'>{ addingOrderError }</span>
              : ''
            }
            <CustomButton type='submit' isLoading={ isLoading || addingOrder }>
              { buttonText }
            </CustomButton>
          </div>
        </form>
      </div>
   );
  };
}

const mapStateToProps = (state) => ({
  addingOrder: selectAddingOrder(state),
  addingOrderError: selectAddingOrderError(state),
  currentUser: selectCurrentUser(state),
  authToken: selectAuthToken(state),
  cartItems: selectCartItems(state)
})

const mapDispatchToProps = (dispatch) => ({
  clearAllCartItems: () => dispatch(clearAllCartItems()),
  addOrderStart: (reqObj) => dispatch(addOrderStart(reqObj))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CheckoutForm));