import React from 'react'
import CustomButton from '../custom-button/custom-button.component'
import FormInputField from '../form-input-field/form-input-field.component'
import './profile-edit-form.styles.scss'
import { selectCurrentUser, selectEditingUser, selectEditingError, selectAuthToken } from '../../redux/user/user.selectors'
import { editUserStart } from '../../redux/user/user.actions'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTimes} from '@fortawesome/free-solid-svg-icons'

class ProfileEditForm extends React.Component {
  state = {
    name: this.props.currentUser.name,
    email: this.props.currentUser.email,
    old_password: '',
    new_password: '',
    new_password_confirm: '',
    frontendError: null
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { editUserStart, authToken, formType } = this.props

    this.setState({
      frontendError: null
    }, () => {
      if ( this.state.new_password !== this.state.new_password_confirm) {
        this.setState({
          frontendError: 'Passwords must match exactly!'
        })
      } else {
          let reqObj = {}

          switch (formType) {
            case ('name'): {
              reqObj = {
                request: {
                  updates: {
                    name: this.state.name
                  }
                }
              }
              break
            }
            case ('email'): {
              reqObj = {
                request: {
                  updates: {
                    email: this.state.email
                  }
                }
              }
              break
            }
            case ('password'): {
              reqObj = {
                request: {
                  old_password: this.state.old_password,
                  updates: {
                    password: this.state.new_password
                  }
                }
              }
              break
            }
            default: {
              reqObj = {
                updates: {}
              }
            }
          }        

          editUserStart({
            token: authToken,
            ...reqObj
          })
          
          this.setState({
            old_password: '',
            new_password: '',
            new_password_confirm: ''
          })
        }
    })
  }

  render() {
    const { formType, editingUser, editingError, applyClass, cancelEditing } = this.props

    return (
      <div className={`profile-edit-form-container ${applyClass}`}>
        <form onSubmit={ this.handleSubmit }>
          <div className='form-fields'>
            <FormInputField
              type='text'
              name='name'
              label='New name'
              required={ formType === 'name' }
              applyClass={ `${formType !== 'name' ? 'hide-field' : ''}`}
              value={ this.state.name }
              onChange={ this.handleChange }
            />
            <FormInputField
              type='email'
              name='email'
              label='New email'
              required={ formType === 'email' }
              applyClass={ `${formType !== 'email' ? 'hide-field' : ''}`}
              value={ this.state.email }
              onChange={ this.handleChange}
            />
            <FormInputField
              type='password'
              name='old_password'
              autoComplete='new-password'
              label='Old password'
              required={ formType === 'password' }
              applyClass={ `${formType !== 'password' ? 'hide-field' : ''}`}
              value={ this.state.old_password }
              onChange={ this.handleChange }
            />
            <FormInputField
              type='password'
              name='new_password'
              autoComplete='new-password'
              label='New password'
              required={ formType === 'password' }
              applyClass={ `${formType !== 'password' ? 'hide-field' : ''}`}
              value={ this.state.new_password }
              onChange={ this.handleChange }
            />
            <FormInputField
              type='password'
              name='new_password_confirm'
              autoComplete='new-password'
              label='Confirm password'
              required={ formType === 'password' }
              applyClass={ `${formType !== 'password' ? 'hide-field' : ''}`}
              value={ this.state.new_password_confirm }
              onChange={ this.handleChange }
            />            
            <span className={`password-info ${formType !== 'password' ? 'hide-info' : ''}`}>* password must contain at least 7 characters</span>
          </div>
          <div className={`form-footer ${applyClass !== '' ? 'show-form-footer' : ''}`}>
            {
              editingError || this.state.frontendError ?  
              <span className='error-message'>{ editingError ? editingError : this.state.frontendError }</span>
              : ''
            }            
            <CustomButton type='submit' isLoading={ editingUser } buttonStyle='edit' >
                <FontAwesomeIcon icon={ faPen } />
                Edit
            </CustomButton>
            <button className='cancel-editing-button' type='button' onClick={ cancelEditing }>
                <FontAwesomeIcon icon={ faTimes } />
            </button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
  editingUser: selectEditingUser(state),
  editingError: selectEditingError(state),
  authToken: selectAuthToken(state)
})

const mapDispatchToProps = (dispatch) => ({
  editUserStart: (editData) => dispatch(editUserStart(editData))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditForm)