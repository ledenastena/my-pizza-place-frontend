import userActionTypes from './user.types'

const INITIAL_STATE = {
  currentUser: null,
  currentUserType: null,
  fetchingUserData: false,
  errorMessage: null,
  authToken: null,
  editingUser: false,
  editingError: null,
}

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionTypes.USER_LOG_IN_START:
    case userActionTypes.USER_SIGN_UP_START:
      return {
        ...state,
        fetchingUserData: true,
        errorMessage: null,
      }
    case userActionTypes.USER_LOG_IN_SUCCESS:
    case userActionTypes.USER_SIGN_UP_SUCCESS:
      return {
        ...state,
        currentUser: action.payload.user,
        currentUserType: action.payload.userType,
        fetchingUserData: false,
        authToken: action.payload.token,
        errorMessage: null,
      }
    case userActionTypes.USER_LOG_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        currentUserType: null,
        errorMessage: null,
        authToken: null,
      }
    case userActionTypes.USER_LOG_IN_FAILURE:
    case userActionTypes.USER_SIGN_UP_FAILURE:
    case userActionTypes.USER_LOG_OUT_FAILURE:
      return {
        ...state,
        fetchingUserData: false,
        errorMessage: action.payload,
      }
    case userActionTypes.EDIT_USER_START:
      return {
        ...state,
        editingUser: true,
        editingError: null,
      }
    case userActionTypes.EDIT_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        editingUser: false,
        editingError: null,
      }
    case userActionTypes.EDIT_USER_FAILURE:
      return {
        ...state,
        editingUser: false,
        editingError: action.payload,
      }
    default:
      return state
  }
}

export default userReducer
