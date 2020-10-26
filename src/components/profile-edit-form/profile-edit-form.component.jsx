import React from 'react'
import './profile-edit-form.styles.scss'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons'
import CustomButton from '../custom-button/custom-button.component'
import FormInputField from '../form-input-field/form-input-field.component'
import {
  selectCurrentUser,
  selectEditingUser,
  selectEditingError,
  selectAuthToken,
} from '../../redux/user/user.selectors'
import { editUserStart } from '../../redux/user/user.actions'

class ProfileEditForm extends React.Component {
  state = {
    name: this.props.currentUser.name,
    email: this.props.currentUser.email,
    oldPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
    frontendError: null,
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { editUserStart, authToken, formType } = this.props

    this.setState(
      {
        frontendError: null,
      },
      () => {
        if (this.state.newPassword !== this.state.newPasswordConfirm) {
          this.setState({
            frontendError: 'Passwords must match exactly!',
          })
        } else {
          let reqObj = {}

          switch (formType) {
            case 'name': {
              reqObj = {
                request: {
                  updates: {
                    name: this.state.name,
                  },
                },
              }
              break
            }
            case 'email': {
              reqObj = {
                request: {
                  updates: {
                    email: this.state.email,
                  },
                },
              }
              break
            }
            case 'password': {
              reqObj = {
                request: {
                  old_password: this.state.oldPassword,
                  updates: {
                    password: this.state.newPassword,
                  },
                },
              }
              break
            }
            default: {
              reqObj = {
                updates: {},
              }
            }
          }

          editUserStart({
            token: authToken,
            ...reqObj,
          })

          this.setState({
            oldPassword: '',
            newPassword: '',
            newPasswordConfirm: '',
          })
        }
      }
    )
  }

  render() {
    const {
      formType,
      editingUser,
      editingError,
      applyClass,
      cancelEditing,
    } = this.props
    const {
      name,
      email,
      oldPassword,
      newPassword,
      newPasswordConfirm,
      frontendError,
    } = this.state

    return (
      <div className={`profile-edit-form-container ${applyClass}`}>
        <form onSubmit={this.handleSubmit}>
          <div className="form-fields">
            <FormInputField
              type="text"
              name="name"
              label="New name"
              required={formType === 'name'}
              applyClass={`${formType !== 'name' ? 'hide-field' : ''}`}
              value={name}
              onChange={this.handleChange}
            />
            <FormInputField
              type="email"
              name="email"
              label="New email"
              required={formType === 'email'}
              applyClass={`${formType !== 'email' ? 'hide-field' : ''}`}
              value={email}
              onChange={this.handleChange}
            />
            <FormInputField
              type="password"
              name="oldPassword"
              autoComplete="new-password"
              label="Old password"
              required={formType === 'password'}
              applyClass={`${formType !== 'password' ? 'hide-field' : ''}`}
              value={oldPassword}
              onChange={this.handleChange}
            />
            <FormInputField
              type="password"
              name="newPassword"
              autoComplete="new-password"
              label="New password"
              required={formType === 'password'}
              applyClass={`${formType !== 'password' ? 'hide-field' : ''}`}
              value={newPassword}
              onChange={this.handleChange}
            />
            <FormInputField
              type="password"
              name="newPasswordConfirm"
              autoComplete="new-password"
              label="Confirm password"
              required={formType === 'password'}
              applyClass={`${formType !== 'password' ? 'hide-field' : ''}`}
              value={newPasswordConfirm}
              onChange={this.handleChange}
            />
            <span
              className={`password-info ${
                formType !== 'password' ? 'hide-info' : ''
              }`}
            >
              * password must contain at least 7 characters
            </span>
          </div>
          <div
            className={`form-footer ${
              applyClass !== '' ? 'show-form-footer' : ''
            }`}
          >
            {editingError || frontendError ? (
              <span className="error-message">
                {editingError || frontendError}
              </span>
            ) : (
              ''
            )}
            <CustomButton
              type="submit"
              isLoading={editingUser}
              buttonStyle="edit"
            >
              <FontAwesomeIcon icon={faPen} />
              Edit
            </CustomButton>
            <button
              className="cancel-editing-button"
              type="button"
              onClick={cancelEditing}
            >
              <FontAwesomeIcon icon={faTimes} />
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
  authToken: selectAuthToken(state),
})

const mapDispatchToProps = (dispatch) => ({
  editUserStart: (editData) => dispatch(editUserStart(editData)),
})

ProfileEditForm.defaultProps = {
  currentUser: null,
  editingUser: false,
  editingError: null,
  authToken: null,
  editUserStart: null,
  formType: null,
  cancelEditing: null,
  applyClass: null,
}

ProfileEditForm.propTypes = {
  currentUser: PropTypes.object,
  editingUser: PropTypes.bool,
  editingError: PropTypes.string,
  authToken: PropTypes.string,
  editUserStart: PropTypes.func,
  formType: PropTypes.oneOf(['name', 'email', 'password']),
  cancelEditing: PropTypes.func,
  applyClass: PropTypes.string,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditForm)
