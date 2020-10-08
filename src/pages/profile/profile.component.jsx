import React from 'react'
import './profile.styles.scss'
import { selectCurrentUser, selectEditingUser, selectEditingError } from '../../redux/user/user.selectors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import ProfileEditForm from '../../components/profile-edit-form/profile-edit-form.component'
import UserOrders from '../../components/user-orders/user-orders.component'
import { connect } from 'react-redux'

class ProfilePage extends React.Component {
  state = {
    showEditForm: false,
    formType: null,
    testShow: false,
    successMessage: null
  }

  componentDidUpdate(prevProps) {
    // Check to see if a successful update was performed and set the message for display if it did
    if (prevProps.editingUser && !this.props.editingUser && !this.props.editingError) {
      this.setState({
        showEditForm: false,
        successMessage: 'Update successful!'
      })
    }

    // Reset the success message when we start new updating async action
    if (!prevProps.editingUser && this.props.editingUser && this.state.successMessage) {
      this.setState({
        successMessage: null
      })
    }
  }

  handleEditClick = (value) => {
    this.setState({
      showEditForm: true,
      formType: value
    })
  }

  cancelEditing = () => {
    this.setState({
      showEditForm: false,
      formType: null
    })
  }

  render() {
    const { currentUser } = this.props

    return (
      <div className='profile-page-container'>
        {
          currentUser ? 
            <div className='content'>
              <div className={`success-message ${this.state.successMessage ? 'show-message' : ''}`}>{this.state.successMessage}</div>
              <div className='user-info'>
                <div className='user-info-row'>
                  <div className='label'>Name</div>
                  <div className='value'>{ currentUser.name }</div>
                  {
                    <div className='edit-button-column'>
                      <button className={`profile-edit-button ${this.state.showEditForm ? 'hide-edit-button' : '' }`} onClick={ () => this.handleEditClick('name')}>
                        <FontAwesomeIcon icon={ faPen } />
                      </button>
                    </div>
                  }
                </div>
                <div className='user-info-row'>
                  <div className='label'>Email</div>
                  <div className='value'>{ currentUser.email}</div>
                  {
                    <div className='edit-button-column'>
                      <button className={`profile-edit-button ${this.state.showEditForm ? 'hide-edit-button' : '' }`} onClick={ () => this.handleEditClick('email')}>
                        <FontAwesomeIcon icon={ faPen } />
                      </button>
                    </div>
                  }
                </div>
                <div className='user-info-row'>
                  <div className='label'>Password</div>
                  <div className='value'>&bull;&bull;&bull;&bull;&bull;&bull;</div>
                  {
                    <div className='edit-button-column'>
                      <button className={`profile-edit-button ${this.state.showEditForm ? 'hide-edit-button' : '' }`} onClick={ () => this.handleEditClick('password')}>
                        <FontAwesomeIcon icon={ faPen } />
                      </button>
                    </div>
                  }
                </div>
              </div>
              {
                  <ProfileEditForm formType={ this.state.formType } cancelEditing={ this.cancelEditing} applyClass={`${this.state.showEditForm ? 'show-edit-form' : ''}`} />
              }
              <UserOrders />
            </div>
            : <span>You are not authorized to view this page.</span>
        }        
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
  editingUser: selectEditingUser(state),
  editingError: selectEditingError(state)
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)