import React from 'react'
import './login.styles.scss'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import LogInForm from '../../components/log-in-form/log-in-form.component'

const LoginPage = ({ location }) => (
  <div className="login-page-container">
    <LogInForm prevPath={location.state ? location.state.prevPath : '/'} />
    <div className="sign-up-link">
      Don&apos;t have an account? <Link to="/sign-up">Sign up</Link>
    </div>
  </div>
)

LoginPage.defaultProps = {
  location: {},
}

LoginPage.propTypes = {
  location: PropTypes.object,
}

export default LoginPage
