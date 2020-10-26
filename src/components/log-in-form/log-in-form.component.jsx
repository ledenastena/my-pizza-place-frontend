import React from 'react'
import './log-in-form.styles.scss'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import FormInputField from '../form-input-field/form-input-field.component'
import CustomButton from '../custom-button/custom-button.component'
import {
  selectUserErrorMessage,
  selectFetchingUserData,
} from '../../redux/user/user.selectors'
import { userLoginStart } from '../../redux/user/user.actions'

class LogInForm extends React.Component {
  state = {
    email: '',
    password: '',
  }

  componentDidUpdate(prevProps) {
    const { fetchingUserData, userErrorMessage, history, prevPath } = this.props

    // Redirect to previous page if the user has successfuly logged in
    if (prevProps.fetchingUserData && !fetchingUserData && !userErrorMessage) {
      history.push(prevPath)
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const { userLoginStart } = this.props

    userLoginStart({
      email: this.state.email,
      password: this.state.password,
    })

    this.setState({
      email: '',
      password: '',
    })
  }

  handleChange = (e) => {
    const { name, value } = e.target

    this.setState({
      [name]: value,
    })
  }

  render() {
    const { userErrorMessage, fetchingUserData } = this.props
    const { email, password } = this.state

    return (
      <div className="log-in-form-container">
        <div className="form-title">Log in with existing account</div>
        <form className="log-in-form" onSubmit={this.handleSubmit}>
          <div className="form-fields">
            <FormInputField
              name="email"
              type="email"
              label="Email"
              value={email}
              required
              onChange={this.handleChange}
            />
            <FormInputField
              name="password"
              type="password"
              label="Password"
              value={password}
              required
              onChange={this.handleChange}
            />
          </div>
          <div className="form-footer">
            {userErrorMessage ? (
              <span className="error-message">{userErrorMessage}</span>
            ) : (
              ''
            )}
            <CustomButton type="submit" isLoading={fetchingUserData}>
              Log in
            </CustomButton>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  userErrorMessage: selectUserErrorMessage(state),
  fetchingUserData: selectFetchingUserData(state),
})

const mapDispatchToProps = (dispatch) => ({
  userLoginStart: (loginData) => dispatch(userLoginStart(loginData)),
})

LogInForm.defaultProps = {
  userErrorMessage: null,
  fetchingUserData: false,
  userLoginStart: null,
  prevPath: '/',
  history: {
    push: null,
  },
}

LogInForm.propTypes = {
  userErrorMessage: PropTypes.string,
  fetchingUserData: PropTypes.bool,
  userLoginStart: PropTypes.func,
  prevPath: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LogInForm))
