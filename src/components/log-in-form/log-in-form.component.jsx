import React from 'react';
import './log-in-form.styles.scss';
import FormInputField from '../form-input-field/form-input-field.component';
import CustomButton from '../custom-button/custom-button.component'
import { selectUserErrorMessage, selectFetchingUserData } from '../../redux/user/user.selectors'
import { userLoginStart } from '../../redux/user/user.actions'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'

class LogInForm extends React.Component {
  state = {
    email: '',
    password: ''
  }  

  componentDidUpdate(prevProps) {
    const { fetchingUserData, userErrorMessage } = this.props
    
    // Redirect to previous page if the user has successfuly logged in
    if (prevProps.fetchingUserData && !fetchingUserData && !userErrorMessage) {
      this.props.history.push(this.props.prevPath);
    }
  }
  
  handleSubmit = async (e) => {
    e.preventDefault();
    const { userLoginStart } = this.props
    
    userLoginStart({
      email: this.state.email,
      password: this.state.password
    })

    this.setState({
      email: '',
      password: ''
    });
  }
  
  handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    
    this.setState({
      [name]: value
    });
  }
  
  render() {
    const { userErrorMessage, fetchingUserData } = this.props;
    return (
      <div className='log-in-form-container'>
        <div className='form-title'>Log in with existing account</div>
        <form className='log-in-form' onSubmit={ this.handleSubmit }>
          <div className='form-fields'>
            <FormInputField 
              name='email'
              type='email'
              label='Email'
              value={ this.state.email }
              required
              onChange={ this.handleChange }
              />
            <FormInputField 
              name='password'
              type='password'
              label='Password'
              value={ this.state.password }
              required
              onChange={ this.handleChange }
              />
          </div>
            <div className='form-footer'>
              {
                userErrorMessage ?  
                <span className='error-message'>{ userErrorMessage }</span>
                : ''
              }
              <CustomButton type='submit' isLoading={ fetchingUserData } >
                Log in
              </CustomButton>
            </div>
        </form>
      </div>
  );
  }
}

const mapStateToProps = (state) => ({
  userErrorMessage: selectUserErrorMessage(state),
  fetchingUserData: selectFetchingUserData(state)
})

const mapDispatchToProps = (dispatch) => ({
  userLoginStart: (loginData) => dispatch(userLoginStart(loginData))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LogInForm));