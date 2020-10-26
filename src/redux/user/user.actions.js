import userActionTypes from './user.types'

export const userLoginStart = (loginData) => ({
  type: userActionTypes.USER_LOG_IN_START,
  payload: loginData,
})

export const userLoginSucces = (loginResponse) => ({
  type: userActionTypes.USER_LOG_IN_SUCCESS,
  payload: loginResponse,
})

export const userLoginFailure = (errorMessage) => ({
  type: userActionTypes.USER_LOG_IN_FAILURE,
  payload: errorMessage,
})

export const userLogoutStart = (token) => ({
  type: userActionTypes.USER_LOG_OUT_START,
  payload: token,
})

export const userLogoutSucces = () => ({
  type: userActionTypes.USER_LOG_OUT_SUCCESS,
})

export const userLogoutFailure = (errorMessage) => ({
  type: userActionTypes.USER_LOG_OUT_FAILURE,
  payload: errorMessage,
})

export const userSignUpStart = (signUpData) => ({
  type: userActionTypes.USER_SIGN_UP_START,
  payload: signUpData,
})

export const userSignUpSucces = (signUpResponse) => ({
  type: userActionTypes.USER_SIGN_UP_SUCCESS,
  payload: signUpResponse,
})

export const userSignUpFailure = (errorMessage) => ({
  type: userActionTypes.USER_SIGN_UP_FAILURE,
  payload: errorMessage,
})

export const editUserStart = (editData) => ({
  type: userActionTypes.EDIT_USER_START,
  payload: editData,
})

export const editUserSucces = (editResponse) => ({
  type: userActionTypes.EDIT_USER_SUCCESS,
  payload: editResponse,
})

export const editUserFailure = (errorMessage) => ({
  type: userActionTypes.EDIT_USER_FAILURE,
  payload: errorMessage,
})
