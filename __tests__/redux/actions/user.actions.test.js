import {
  userLoginStart,
  userLoginSucces,
  userLoginFailure,
  userLogoutStart,
  userLogoutSucces,
  userLogoutFailure,
  userSignUpStart,
  userSignUpSucces,
  userSignUpFailure,
  editUserStart,
  editUserSucces,
  editUserFailure
} from '../../../src/redux/user/user.actions'
import userActionTypes from '../../../src/redux/user/user.types'

describe('testing user actions', () => {
  it('should create an action for starting user login', () => {
    const loginData = { email: 'email@email.com', password: '445password665' }
    expect(userLoginStart(loginData)).toEqual({
      type: userActionTypes.USER_LOG_IN_START,
      payload: loginData
    })
  })
  
  it('should create an action for success of user login', () => {
    const loginResponse = { user: 'Bob', token: '12345' }
    expect(userLoginSucces(loginResponse)).toEqual({
      type: userActionTypes.USER_LOG_IN_SUCCESS,
      payload: loginResponse
    })
  })
  
  it('should create an action for failure of user login', () => {
    const errorMessage = 'Some error message'
    expect(userLoginFailure(errorMessage)).toEqual({
      type: userActionTypes.USER_LOG_IN_FAILURE,
      payload: errorMessage
    })
  })

  it('should create an action for starting user log out', () => {
    const token = '12345'
    expect(userLogoutStart(token)).toEqual({
      type: userActionTypes.USER_LOG_OUT_START,
      payload: token
    })
  })
  
  it('should create an action for success of user log out', () => {
    expect(userLogoutSucces()).toEqual({
      type: userActionTypes.USER_LOG_OUT_SUCCESS
    })
  })

  it('should create an action for failure of user log out', () => {
    const errorMessage = 'Some error message'
    expect(userLogoutFailure(errorMessage)).toEqual({
      type: userActionTypes.USER_LOG_OUT_FAILURE,
      payload: errorMessage
    })
  })

  it('should create an action for starting user sign up', () => {
    const signUpData = { email: 'email@email.com', password: '445password665' }
    expect(userSignUpStart(signUpData)).toEqual({
      type: userActionTypes.USER_SIGN_UP_START,
      payload: signUpData
    })
  })
  
  it('should create an action for success of user sign up', () => {
    const signUpResponse = { user: 'Bob', token: '12345' }
    expect(userSignUpSucces(signUpResponse)).toEqual({
      type: userActionTypes.USER_SIGN_UP_SUCCESS,
      payload: signUpResponse
    })
  })
  
  it('should create an action for failure of user sign up', () => {
    const errorMessage = 'Some error message'
    expect(userSignUpFailure(errorMessage)).toEqual({
      type: userActionTypes.USER_SIGN_UP_FAILURE,
      payload: errorMessage
    })
  })
  
  it('should create an action for starting a user edit', () => {
    const editData = { editProp1: 'New value1', editProp2: 'New value2' }
    expect(editUserStart(editData)).toEqual({
      type: userActionTypes.EDIT_USER_START,
      payload: editData
    })
  })
  
  it('should create an action for success of a user edit', () => {
    const editResponse = { user: 'Bob', token: '12345' }
    expect(editUserSucces(editResponse)).toEqual({
      type: userActionTypes.EDIT_USER_SUCCESS,
      payload: editResponse
    })
  })
  
  it('should create an action for failure of a user edit', () => {
    const errorMessage = 'Some error message'
    expect(editUserFailure(errorMessage)).toEqual({
      type: userActionTypes.EDIT_USER_FAILURE,
      payload: errorMessage
    })
  })
})