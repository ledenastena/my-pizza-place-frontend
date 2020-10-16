import { onUserLoginStart, onUserLogoutStart, onUserSignUpStart, onEditUserStart } from '../src/redux/user/user.sagas'
import userActionTypes from '../src/redux/user/user.types'
import mockAxios from 'axios'
import SagaTester from 'redux-saga-tester'
import userReducer from '../src/redux/user/user.reducer'

describe('testing logging in user', () => {
  const initialState = {
    reducer: {      
      currentUser: null,
      currentUserType: null,
      fetchingUserData: false,
      authToken: null,
      errorMessage: null
    }
  }  
  const sagaTester = new SagaTester({ initialState, reducers: { reducer: userReducer }})
  sagaTester.start(onUserLoginStart)

  afterEach(() => {
    sagaTester.reset(true)
  })
  
  it('tests user login success', async () => {
    // The state is initialized properly
    expect(sagaTester.getState()).toEqual(initialState)

    mockAxios.post.mockImplementationOnce(() => Promise.resolve({ data: { user: { name: 'Bob' }, userType: 'regular', token: '12345'}}))
    sagaTester.dispatch({ type: userActionTypes.USER_LOG_IN_START, payload: { email: 'email@email.com', password: '33pass66'} })
    await sagaTester.waitFor(userActionTypes.USER_LOG_IN_SUCCESS)
    
    // Async call is made only once and with email and password action payload properly passed as arguments
    expect(mockAxios.post.mock.calls.length).toBe(1)
    expect(mockAxios.post.mock.calls[0][1]).toEqual({
      email: 'email@email.com',
      password: '33pass66'
    })

    // The reducer state is updated properly
    expect(sagaTester.getState()).toEqual({
      reducer: {      
        currentUser: { name: 'Bob' },
        currentUserType: 'regular',
        fetchingUserData: false,
        authToken: '12345',
        errorMessage: null
      }
    })
    
    // Actions are called only once
    expect(sagaTester.numCalled(userActionTypes.USER_LOG_IN_START)).toBe(1)
    expect(sagaTester.numCalled(userActionTypes.USER_LOG_IN_SUCCESS)).toBe(1)
  })

  it('tests user login error', async () => {
    // The state is initialized properly
    expect(sagaTester.getState()).toEqual(initialState)

    mockAxios.post.mockImplementationOnce(() => Promise.reject())
    sagaTester.dispatch({ type: userActionTypes.USER_LOG_IN_START, payload: { email: 'email@email.com', password: '33pass66'} })
    await sagaTester.waitFor(userActionTypes.USER_LOG_IN_FAILURE)
    
    // Async call is made only once and with email and password action payload properly passed as arguments
    expect(mockAxios.post.mock.calls.length).toBe(1)
    expect(mockAxios.post.mock.calls[0][1]).toEqual({
      email: 'email@email.com',
      password: '33pass66'
    })

    // The reducer state is updated properly
    expect(sagaTester.getState()).toEqual({
      reducer: {      
        currentUser: null,
        currentUserType: null,
        fetchingUserData: false,
        authToken: null,
        errorMessage: 'Unable to login.'
      }
    })
    
    // Actions are called only once
    expect(sagaTester.numCalled(userActionTypes.USER_LOG_IN_START)).toBe(1)
    expect(sagaTester.numCalled(userActionTypes.USER_LOG_IN_FAILURE)).toBe(1)
  })
})

describe('testing user logging out', () => {
  const initialState = {
    reducer: {      
      currentUser: { name: 'Bob' },
      currentUserType: 'regular',
      fetchingUserData: false,
      authToken: '12345',
      errorMessage: null
    }
  }  
  const sagaTester = new SagaTester({ initialState, reducers: { reducer: userReducer }})
  sagaTester.start(onUserLogoutStart)

  afterEach(() => {
    sagaTester.reset(true)
  })
  
  it('tests user logout success', async () => {
    // The state is initialized properly
    expect(sagaTester.getState()).toEqual(initialState)

    mockAxios.post.mockImplementationOnce(() => Promise.resolve())
    sagaTester.dispatch({ type: userActionTypes.USER_LOG_OUT_START, payload: '12345' })
    await sagaTester.waitFor(userActionTypes.USER_LOG_OUT_SUCCESS)
    
    // Async call is made only once and with action payload properly passed as an argument
    expect(mockAxios.post.mock.calls.length).toBe(1)
    expect(mockAxios.post.mock.calls[0][2]).toEqual({
      headers: {
        'Authorization': 'Bearer 12345'
      }
    })

    // The reducer state is updated properly
    expect(sagaTester.getState()).toEqual({
      reducer: {      
        currentUser: null,
        currentUserType: null,
        fetchingUserData: false,
        authToken: null,
        errorMessage: null
      }
    })
    
    // Actions are called only once
    expect(sagaTester.numCalled(userActionTypes.USER_LOG_OUT_START)).toBe(1)
    expect(sagaTester.numCalled(userActionTypes.USER_LOG_OUT_SUCCESS)).toBe(1)
  })

  it('tests user logout error', async () => {
    // The state is initialized properly
    expect(sagaTester.getState()).toEqual(initialState)

    mockAxios.post.mockImplementationOnce(() => Promise.reject())
    sagaTester.dispatch({ type: userActionTypes.USER_LOG_OUT_START, payload: '12345' })
    await sagaTester.waitFor(userActionTypes.USER_LOG_OUT_FAILURE)
    
    // Async call is made only once and with action payload properly passed as an argument
    expect(mockAxios.post.mock.calls.length).toBe(1)
    expect(mockAxios.post.mock.calls[0][2]).toEqual({
      headers: {
        'Authorization': 'Bearer 12345'
      }
    })

    // The reducer state is updated properly
    expect(sagaTester.getState()).toEqual({
      reducer: {      
        currentUser: { name: 'Bob' },
        currentUserType: 'regular',
        fetchingUserData: false,
        authToken: '12345',
        errorMessage: 'There was a problem logging out.'
      }
    })
    
    // Actions are called only once
    expect(sagaTester.numCalled(userActionTypes.USER_LOG_OUT_START)).toBe(1)
    expect(sagaTester.numCalled(userActionTypes.USER_LOG_OUT_FAILURE)).toBe(1)
  })
})

describe('testing user signing up', () => {
  const initialState = {
    reducer: {      
      currentUser: null,
      currentUserType: null,
      fetchingUserData: false,
      authToken: null,
      errorMessage: null
    }
  }  
  const sagaTester = new SagaTester({ initialState, reducers: { reducer: userReducer }})
  sagaTester.start(onUserSignUpStart)

  afterEach(() => {
    sagaTester.reset(true)
  })
  
  it('tests user sign up success', async () => {
    // The state is initialized properly
    expect(sagaTester.getState()).toEqual(initialState)

    mockAxios.post.mockImplementationOnce(() => Promise.resolve({ data: { user: { name: 'Bob' }, userType: 'regular', token: '12345'}}))
    sagaTester.dispatch({ type: userActionTypes.USER_SIGN_UP_START, payload: { userObject: {} }})
    await sagaTester.waitFor(userActionTypes.USER_SIGN_UP_SUCCESS)
    
    // Async call is made only once and with action payload properly passed as an argument
    expect(mockAxios.post.mock.calls.length).toBe(1)
    expect(mockAxios.post.mock.calls[0][1]).toEqual({ userObject: {} })

    // The reducer state is updated properly
    expect(sagaTester.getState()).toEqual({
      reducer: {      
        currentUser: { name: 'Bob' },
        currentUserType: 'regular',
        fetchingUserData: false,
        authToken: '12345',
        errorMessage: null
      }
    })
    
    // Actions are called only once
    expect(sagaTester.numCalled(userActionTypes.USER_SIGN_UP_START)).toBe(1)
    expect(sagaTester.numCalled(userActionTypes.USER_SIGN_UP_SUCCESS)).toBe(1)
  })

  it('tests user sign up error', async () => {
    // The state is initialized properly
    expect(sagaTester.getState()).toEqual(initialState)

    mockAxios.post.mockImplementationOnce(() => Promise.reject({ response: { data: 'Some error message' }}))
    sagaTester.dispatch({ type: userActionTypes.USER_SIGN_UP_START, payload: { userObject: {} }})
    await sagaTester.waitFor(userActionTypes.USER_SIGN_UP_FAILURE)
    
    // Async call is made only once and with action payload properly passed as an argument
    expect(mockAxios.post.mock.calls.length).toBe(1)
    expect(mockAxios.post.mock.calls[0][1]).toEqual({ userObject: {} })

    // The reducer state is updated properly
    expect(sagaTester.getState()).toEqual({
      reducer: {      
        currentUser: null,
        currentUserType: null,
        fetchingUserData: false,
        authToken: null,
        errorMessage: 'Some error message'
      }
    })
    
    // Actions are called only once
    expect(sagaTester.numCalled(userActionTypes.USER_SIGN_UP_START)).toBe(1)
    expect(sagaTester.numCalled(userActionTypes.USER_SIGN_UP_FAILURE)).toBe(1)
  })
})

describe('testing user editing', () => {
  const initialState = {
    reducer: {      
      currentUser: { name: 'Bob'},
      editingUser: false,
      editingError: null
    }
  }  
  const sagaTester = new SagaTester({ initialState, reducers: { reducer: userReducer }})
  sagaTester.start(onEditUserStart)

  afterEach(() => {
    sagaTester.reset(true)
  })
  
  it('tests user editing success', async () => {
    // The state is initialized properly
    expect(sagaTester.getState()).toEqual(initialState)

    mockAxios.patch.mockImplementationOnce(() => Promise.resolve({ data: { name: 'Mr Bob' }}))
    sagaTester.dispatch({ type: userActionTypes.EDIT_USER_START, payload: { request: { requestObj: {} }, token: '12345' }})
    await sagaTester.waitFor(userActionTypes.EDIT_USER_SUCCESS)
    
    // Async call is made only once and with request and token action payload properly passed as arguments
    expect(mockAxios.patch.mock.calls.length).toBe(1)
    expect(mockAxios.patch.mock.calls[0][1]).toEqual({ requestObj: {} })
    expect(mockAxios.patch.mock.calls[0][2]).toEqual({
      headers: {
        'Authorization': 'Bearer 12345'
      }
    })

    // The reducer state is updated properly
    expect(sagaTester.getState()).toEqual({
      reducer: {      
        currentUser: { name: 'Mr Bob'},
        editingUser: false,
        editingError: null
      }
    })
    
    // Actions are called only once
    expect(sagaTester.numCalled(userActionTypes.EDIT_USER_START)).toBe(1)
    expect(sagaTester.numCalled(userActionTypes.EDIT_USER_SUCCESS)).toBe(1)
  })

  it('tests user editing error', async () => {
    // The state is initialized properly
    expect(sagaTester.getState()).toEqual(initialState)

    mockAxios.patch.mockImplementationOnce(() => Promise.reject({ response: { data: 'Some error message' }}))
    sagaTester.dispatch({ type: userActionTypes.EDIT_USER_START, payload: { request: { requestObj: {} }, token: '12345' }})
    await sagaTester.waitFor(userActionTypes.EDIT_USER_FAILURE)
    
    // Async call is made only once and with request and token action payload properly passed as arguments
    expect(mockAxios.patch.mock.calls.length).toBe(1)
    expect(mockAxios.patch.mock.calls[0][1]).toEqual({ requestObj: {} })
    expect(mockAxios.patch.mock.calls[0][2]).toEqual({
      headers: {
        'Authorization': 'Bearer 12345'
      }
    })

    // The reducer state is updated properly
    expect(sagaTester.getState()).toEqual({
      reducer: {      
        currentUser: { name: 'Bob'},
        editingUser: false,
        editingError: 'Some error message'
      }
    })
    
    // Actions are called only once
    expect(sagaTester.numCalled(userActionTypes.EDIT_USER_START)).toBe(1)
    expect(sagaTester.numCalled(userActionTypes.EDIT_USER_FAILURE)).toBe(1)
  })
})