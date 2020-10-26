import userReducer from '../../../src/redux/user/user.reducer'
import userActionTypes from '../../../src/redux/user/user.types'

describe('testing user reducer', () => {
  const initialState = {
    currentUser: null,
    currentUserType: null,
    fetchingUserData: false,
    errorMessage: null,
    authToken: null,
    editingUser: false,
    editingError: null
  }

  it('should initialize state correctly', () => {
    expect(userReducer(undefined, {})).toEqual(initialState)
  })

  it('should handle USER_LOG_IN_START', () => {
    const inputState = {
      ...initialState,
      errorMessage: 'Some error message'
    }
    const expectedState = {
      ...initialState,
      fetchingUserData: true,
      errorMessage: null
    }

    expect(userReducer(inputState, {
      type: userActionTypes.USER_LOG_IN_START
    }))
    .toEqual(expectedState)
  })
  
  it('should handle USER_SIGN_UP_START', () => {
    const inputState = {
      ...initialState,
      errorMessage: 'Some error message'
    }
    const expectedState = {
      ...initialState,
      fetchingUserData: true,
      errorMessage: null
    }

    expect(userReducer(inputState, {
      type: userActionTypes.USER_SIGN_UP_START
    })).toEqual(expectedState)
  })
  
  it('should handle USER_LOG_IN_SUCCESS', () => {
    const inputState = {
      ...initialState,
      errorMessage: 'Some error message'
    }
    const expectedState = {
      ...initialState,
      currentUser: { name: 'Bob' },
      currentUserType: 'regular',
      fetchingUserData: false,
      authToken: '12345',
      errorMessage: null
    }

    expect(userReducer(inputState, {
      type: userActionTypes.USER_LOG_IN_SUCCESS,
      payload: {
        user: { name: 'Bob' },
        userType: 'regular',
        token: '12345'
      }
    })).toEqual(expectedState)
  })
  
  it('should handle USER_SIGN_UP_SUCCESS', () => {
    const inputState = {
      ...initialState,
      errorMessage: 'Some error message'
    }
    const expectedState = {
      ...initialState,
      currentUser: { name: 'Bob' },
      currentUserType: 'regular',
      fetchingUserData: false,
      authToken: '12345',
      errorMessage: null
    }

    expect(userReducer(inputState, {
      type: userActionTypes.USER_SIGN_UP_SUCCESS,
      payload: {
        user: { name: 'Bob' },
        userType: 'regular',
        token: '12345'
      }
    })).toEqual(expectedState)
  })
  
  it('should handle USER_LOG_OUT_SUCCESS', () => {
    const inputState = {
      ...initialState,
      errorMessage: 'Some error message'
    }
    const expectedState = {
      ...initialState,
      currentUser: null,
      currentUserType: null,
      errorMessage: null,
      authToken: null
    }

    expect(userReducer(inputState, {
      type: userActionTypes.USER_LOG_OUT_SUCCESS
    })).toEqual(expectedState)
  })
  
  it('should handle USER_LOG_IN_FAILURE', () => {
    const inputState = {
      ...initialState,
      fetchingUserData: true
    }
    const expectedState = {
      ...initialState,
      fetchingUserData: false,
      errorMessage: 'Some error message'
    }

    expect(userReducer(inputState, {
      type: userActionTypes.USER_LOG_IN_FAILURE,
      payload: 'Some error message'
    })).toEqual(expectedState)
  })
  
  it('should handle USER_SIGN_UP_FAILURE', () => {
    const inputState = {
      ...initialState,
      fetchingUserData: true
    }
    const expectedState = {
      ...initialState,
      fetchingUserData: false,
      errorMessage: 'Some error message'
    }

    expect(userReducer(inputState, {
      type: userActionTypes.USER_SIGN_UP_FAILURE,
      payload: 'Some error message'
    })).toEqual(expectedState)
  })
  
  it('should handle USER_LOG_OUT_FAILURE', () => {
    const inputState = {
      ...initialState,
      fetchingUserData: true
    }
    const expectedState = {
      ...initialState,
      fetchingUserData: false,
      errorMessage: 'Some error message'
    }

    expect(userReducer(inputState, {
      type: userActionTypes.USER_LOG_OUT_FAILURE,
      payload: 'Some error message'
    })).toEqual(expectedState)
  })
  
  it('should handle EDIT_USER_START', () => {
    const inputState = {
      ...initialState,
      editingError: 'Some error message'
    }
    const expectedState = {
      ...initialState,
      editingUser: true,
      editingError: null
    }

    expect(userReducer(inputState, {
      type: userActionTypes.EDIT_USER_START
    })).toEqual(expectedState)
  })
  
  it('should handle EDIT_USER_SUCCESS', () => {
    const inputState = {
      ...initialState,
      editingUser: true,
      editingError: 'Some error message'
    }
    const expectedState = {
      ...initialState,
      currentUser: { name: 'Bob'},
      editingUser: false,
      editingError: null
    }

    expect(userReducer(inputState, {
      type: userActionTypes.EDIT_USER_SUCCESS,
      payload: { name: 'Bob' }
    })).toEqual(expectedState)
  })
  
  it('should handle EDIT_USER_FAILURE', () => {
    const inputState = {
      ...initialState,
      editingUser: true
    }
    const expectedState = {
      ...initialState,
      editingUser: false,
      editingError: 'Some error message'
    }

    expect(userReducer(inputState, {
      type: userActionTypes.EDIT_USER_FAILURE,
      payload: 'Some error message'
    })).toEqual(expectedState)
  })
})