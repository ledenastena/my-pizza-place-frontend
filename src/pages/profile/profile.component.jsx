import React from 'react'
import './profile.styles.scss'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import {
  selectCurrentUser,
  selectEditingUser,
  selectEditingError,
} from '../../redux/user/user.selectors'
import ProfileEditForm from '../../components/profile-edit-form/profile-edit-form.component'
import UserOrders from '../../components/user-orders/user-orders.component'

class ProfilePage extends React.Component {
  state = {
    showEditForm: false,
    formType: null,
    successMessage: null,
  }

  componentDidUpdate(prevProps) {
    const { editingUser, editingError } = this.props
    const { successMessage } = this.state

    // Check to see if a successful update was performed and set the message for display if it did.
    // Setting the state inside componentDidUpdate must be performed inside a fuction
    if (prevProps.editingUser && !editingUser && !editingError) {
      this.performStateUpdate(() => {
        this.setState({
          showEditForm: false,
          successMessage: 'Update successful!',
        })
      })
    }

    // Reset the success message when we start new updating async action
    if (!prevProps.editingUser && editingUser && successMessage) {
      this.performStateUpdate(() => {
        this.setState({
          successMessage: null,
        })
      })
    }
  }

  performStateUpdate = (callback) => {
    callback()
  }

  handleEditClick = (value) => {
    this.setState({
      showEditForm: true,
      formType: value,
    })
  }

  cancelEditing = () => {
    this.setState({
      showEditForm: false,
      formType: null,
    })
  }

  render() {
    const { currentUser } = this.props
    const { successMessage, showEditForm, formType } = this.state

    return (
      <div className="profile-page-container">
        {currentUser ? (
          <div className="content">
            <div
              className={`success-message ${
                successMessage ? 'show-message' : ''
              }`}
            >
              {successMessage}
            </div>
            <div className="user-info">
              <div className="user-info-row">
                <div className="label">Name</div>
                <div className="value">{currentUser.name}</div>
                <div className="edit-button-column">
                  <button
                    className={`profile-edit-button ${
                      showEditForm ? 'hide-edit-button' : ''
                    }`}
                    type="button"
                    onClick={() => this.handleEditClick('name')}
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                </div>
              </div>
              <div className="user-info-row">
                <div className="label">Email</div>
                <div className="value">{currentUser.email}</div>
                <div className="edit-button-column">
                  <button
                    className={`profile-edit-button ${
                      showEditForm ? 'hide-edit-button' : ''
                    }`}
                    type="button"
                    onClick={() => this.handleEditClick('email')}
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                </div>
              </div>
              <div className="user-info-row">
                <div className="label">Password</div>
                <div className="value">
                  &bull;&bull;&bull;&bull;&bull;&bull;
                </div>
                <div className="edit-button-column">
                  <button
                    className={`profile-edit-button ${
                      showEditForm ? 'hide-edit-button' : ''
                    }`}
                    type="button"
                    onClick={() => this.handleEditClick('password')}
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                </div>
              </div>
            </div>
            <ProfileEditForm
              formType={formType}
              cancelEditing={this.cancelEditing}
              applyClass={`${showEditForm ? 'show-edit-form' : ''}`}
            />
            <UserOrders />
          </div>
        ) : (
          <span>You are not authorized to view this page.</span>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
  editingUser: selectEditingUser(state),
  editingError: selectEditingError(state),
})

ProfilePage.defaultProps = {
  currentUser: null,
  editingUser: false,
  editingError: null,
}

ProfilePage.propTypes = {
  currentUser: PropTypes.object,
  editingUser: PropTypes.bool,
  editingError: PropTypes.string,
}

export default connect(mapStateToProps)(ProfilePage)
