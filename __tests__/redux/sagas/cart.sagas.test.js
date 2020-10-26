import SagaTester from 'redux-saga-tester'
import mockAxios from 'axios'
import {
  onAddOrderStart,
  onFetchOrdersStart,
} from '../../../src/redux/cart/cart.sagas'
import cartActionTypes from '../../../src/redux/cart/cart.types'
import cartReducer from '../../../src/redux/cart/cart.reducer'

describe('testing making new order', () => {
  const initialState = {
    reducer: {
      addingOrder: false,
      addingOrderError: null,
    },
  }
  const sagaTester = new SagaTester({
    initialState,
    reducers: { reducer: cartReducer },
  })
  sagaTester.start(onAddOrderStart)

  afterEach(() => {
    sagaTester.reset(true)
  })

  it('tests making an order success', async () => {
    // The state is initialized properly
    expect(sagaTester.getState()).toEqual(initialState)

    mockAxios.post.mockImplementationOnce(() => Promise.resolve())
    sagaTester.dispatch({
      type: cartActionTypes.ADD_ORDER_START,
      payload: { order: { orderObject: {} }, token: '12345' },
    })
    await sagaTester.waitFor(cartActionTypes.ADD_ORDER_SUCCESS)

    // Async call is made only once and with order and token action payload properly passed as arguments
    expect(mockAxios.post.mock.calls.length).toBe(1)
    expect(mockAxios.post.mock.calls[0][1]).toEqual({ orderObject: {} })
    expect(mockAxios.post.mock.calls[0][2]).toEqual({
      headers: {
        Authorization: 'Bearer 12345',
      },
    })

    // The reducer state is updated properly (in this case it stays the same)
    expect(sagaTester.getState()).toEqual({
      reducer: {
        addingOrder: false,
        addingOrderError: null,
      },
    })

    // Actions are called only once
    expect(sagaTester.numCalled(cartActionTypes.ADD_ORDER_START)).toBe(1)
    expect(sagaTester.numCalled(cartActionTypes.ADD_ORDER_SUCCESS)).toBe(1)
  })

  it('tests making an order error', async () => {
    // The state is initialized properly
    expect(sagaTester.getState()).toEqual(initialState)

    mockAxios.post.mockImplementationOnce(() => Promise.reject())
    sagaTester.dispatch({
      type: cartActionTypes.ADD_ORDER_START,
      payload: { order: { orderObject: {} }, token: '12345' },
    })
    await sagaTester.waitFor(cartActionTypes.ADD_ORDER_FAILURE)

    // Async call is made only once and with order and token action payload properly passed as arguments
    expect(mockAxios.post.mock.calls.length).toBe(1)
    expect(mockAxios.post.mock.calls[0][1]).toEqual({ orderObject: {} })
    expect(mockAxios.post.mock.calls[0][2]).toEqual({
      headers: {
        Authorization: 'Bearer 12345',
      },
    })

    // The reducer state is updated properly
    expect(sagaTester.getState()).toEqual({
      reducer: {
        addingOrder: false,
        addingOrderError: 'There was a problem trying to make an order!',
      },
    })

    // Actions are called only once
    expect(sagaTester.numCalled(cartActionTypes.ADD_ORDER_START)).toBe(1)
    expect(sagaTester.numCalled(cartActionTypes.ADD_ORDER_FAILURE)).toBe(1)
  })
})

describe('testing fetching orders', () => {
  const initialState = {
    reducer: {
      userOrders: [],
      fetchingOrders: false,
      ordersError: null,
    },
  }
  const sagaTester = new SagaTester({
    initialState,
    reducers: { reducer: cartReducer },
  })
  sagaTester.start(onFetchOrdersStart)

  afterEach(() => {
    sagaTester.reset(true)
  })

  it('tests fetching orders success', async () => {
    // The state is initialized properly
    expect(sagaTester.getState()).toEqual(initialState)

    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: ['order1', 'order2'] })
    )
    sagaTester.dispatch({
      type: cartActionTypes.FETCH_ORDERS_START,
      payload: '12345',
    })
    await sagaTester.waitFor(cartActionTypes.FETCH_ORDERS_SUCCESS)

    // Async call is made only once and with action payload properly passed as an argument
    expect(mockAxios.get.mock.calls.length).toBe(1)
    expect(mockAxios.get.mock.calls[0][1]).toEqual({
      headers: {
        Authorization: 'Bearer 12345',
      },
    })

    // The reducer state is updated properly
    expect(sagaTester.getState()).toEqual({
      reducer: {
        userOrders: ['order1', 'order2'],
        fetchingOrders: false,
        ordersError: null,
      },
    })

    // Actions are called only once
    expect(sagaTester.numCalled(cartActionTypes.FETCH_ORDERS_START)).toBe(1)
    expect(sagaTester.numCalled(cartActionTypes.FETCH_ORDERS_SUCCESS)).toBe(1)
  })

  it('tests fetching orders error', async () => {
    // The state is initialized properly
    expect(sagaTester.getState()).toEqual(initialState)

    mockAxios.get.mockImplementationOnce(() => Promise.reject())
    sagaTester.dispatch({
      type: cartActionTypes.FETCH_ORDERS_START,
      payload: '12345',
    })
    await sagaTester.waitFor(cartActionTypes.FETCH_ORDERS_FAILURE)

    // Async call is made only once and with action payload properly passed as an argument
    expect(mockAxios.get.mock.calls.length).toBe(1)
    expect(mockAxios.get.mock.calls[0][1]).toEqual({
      headers: {
        Authorization: 'Bearer 12345',
      },
    })

    // The reducer state is updated properly
    expect(sagaTester.getState()).toEqual({
      reducer: {
        userOrders: [],
        fetchingOrders: false,
        ordersError: 'There was a problem fetching your orders.',
      },
    })

    // Actions are called only once
    expect(sagaTester.numCalled(cartActionTypes.FETCH_ORDERS_START)).toBe(1)
    expect(sagaTester.numCalled(cartActionTypes.FETCH_ORDERS_FAILURE)).toBe(1)
  })
})
