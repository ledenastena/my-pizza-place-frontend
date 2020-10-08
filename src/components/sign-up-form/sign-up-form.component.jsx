import React from 'react'
import './sign-up-form.styles.scss'
import FormInputField from '../form-input-field/form-input-field.component'
import CustomButton from '../custom-button/custom-button.component'
import { selectFetchingUserData, selectUserErrorMessage } from '../../redux/user/user.selectors'
import { userSignUpStart } from '../../redux/user/user.actions'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class SignUpForm extends React.Component {
  
  state = {
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    errorMessage: ''
  }  
  
  componentDidUpdate(prevProps) {
    const { fetchingUserData, userErrorMessage } = this.props
    
    // Redirect to previous page if the user has successfuly logged in
    if (prevProps.fetchingUserData && !fetchingUserData && !userErrorMessage) {
      this.props.history.push('/');
    }
  }

  handleSubmit = async (e) => {
    const { userSignUpStart } = this.props

    e.preventDefault()
    this.setState({
      errorMessage: ''
    }, () => {
      if(this.state.password !== this.state.confirmPassword) {
        this.setState({
          errorMessage: 'Passwords must match exactly'
        })
        return
      }
      
      userSignUpStart({
        name: this.state.username,
        email: this.state.email,
        password: this.state.password
      })
      
      this.setState({
        email: '',
        password: '',
        confirmPassword: '',
        username: '',
        errorMessage: ''
      })
    })
  }
  
  handleChange = (e) => {
    let name = e.target.name
    let value = e.target.value
    
    this.setState({
      [name]: value
    })
  }
  
  render() {
    const { fetchingUserData, userErrorMessage } = this.props

    return (
      <div className='sign-up-form-container'>
        <div className='form-title'>Sign up to create a new account</div>
        <form className='sign-up-form' onSubmit={ this.handleSubmit }>
          <div className='form-fields'>            
            <FormInputField 
              name='username'
              type='text'
              label='Username'
              value={ this.state.username }
              required
              onChange={ this.handleChange }
              />
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
              autoComplete='new-password'
              value={ this.state.password }
              required
              onChange={ this.handleChange }
              />
            <FormInputField 
              name='confirmPassword'
              type='password'
              label='Confirm Password'
              autoComplete='new-password'
              value={ this.state.confirmPassword }
              required
              onChange={ this.handleChange }
              />
            <span className='password-info'>* password must contain at least 7 characters</span>
          </div>
            <div className='form-footer'>
              {
                userErrorMessage || this.state.errorMessage ?  
                <span className='error-message'>{ userErrorMessage ? userErrorMessage : this.state.errorMessage }</span>
                : ''
              }
              <CustomButton type='submit' isLoading={ fetchingUserData }>
                Sign up
              </CustomButton>
            </div>
        </form>
      </div>
  )
  }
}

const mapStateToProps = (state) => ({
  fetchingUserData: selectFetchingUserData(state),
  userErrorMessage: selectUserErrorMessage(state)
})

const mapDispatchToProps = (dispatch) => ({
  userSignUpStart: (userObj) => dispatch(userSignUpStart(userObj))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUpForm))