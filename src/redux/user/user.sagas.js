import { takeLatest, put } from 'redux-saga/effects'
import userActionTypes from './user.types'
import { userLoginSucces,
         userLoginFailure,
         userLogoutSucces,
         userLogoutFailure,
         userSignUpSucces,
         userSignUpFailure,
         editUserSucces,
         editUserFailure
        } from './user.actions'
import axios from 'axios'

export function* onUserLoginStart() {
  yield takeLatest(userActionTypes.USER_LOG_IN_START, userLoginStartAsync)
}

export function* userLoginStartAsync(action) {
  try {
    const response = yield axios.post(`${process.env.BACKEND_URL}/users/login`, {
      email: action.payload.email,
      password: action.payload.password
    })

    yield put(userLoginSucces(response.data))
  }
  catch(err) {
    yield put(userLoginFailure('Unable to login.'))
  }
}

export function* onUserLogoutStart() {
  yield takeLatest(userActionTypes.USER_LOG_OUT_START, userLogoutStartAsync)
}

export function* userLogoutStartAsync(action) {
  try {
    yield axios.post(`${process.env.BACKEND_URL}/users/logout`, {}, {
      headers: {
        'Authorization': `Bearer ${action.payload}`
      }
    })
    yield put(userLogoutSucces())
  }
  catch(err) {
    yield put(userLogoutFailure('There was a problem logging out.'))
  }
}

export function* onUserSignUpStart() {
  yield takeLatest(userActionTypes.USER_SIGN_UP_START, userSignUpStartAsync)
}

export function* userSignUpStartAsync(action) {
  try{
    const response = yield axios.post(`${process.env.BACKEND_URL}/users`, action.payload)

    yield put(userSignUpSucces(response.data))
  }
  catch(err) {
    yield put(userSignUpFailure(err.response.data))
  }
}

export function* onEditUserStart() {
  yield takeLatest(userActionTypes.EDIT_USER_START, editUserStartAsync)
}

export function* editUserStartAsync(action) {
  try {
    const response = yield axios.patch(`${process.env.BACKEND_URL}/users/me`,
      action.payload.request, {
      headers: {
        'Authorization': `Bearer ${action.payload.token}`
      }
    })

    yield put(editUserSucces(response.data))
  }
  catch(err) {
    yield put(editUserFailure(err.response.data))
  }
}