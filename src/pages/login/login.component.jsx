import React from 'react'
import './login.styles.scss'
import LogInForm from '../../components/log-in-form/log-in-form.component'
import { Link } from 'react-router-dom'

const LoginPage = (props) => (
  <div className='login-page-container'>
    <LogInForm prevPath={ props.location.state ? props.location.state.prevPath : '/' } />
    <div className='sign-up-link'>
      Don't have an account? <Link to='/sign-up'>Sign up</Link>
    </div>
  </div>
)

export default LoginPage