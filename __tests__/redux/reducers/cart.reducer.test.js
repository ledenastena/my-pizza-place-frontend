import cartReducer from '../../../src/redux/cart/cart.reducer'
import cartActionTypes from '../../../src/redux/cart/cart.types'

describe('testing cart reducer', () => {
  const initialState = {
    cartVisible: false,
    cartItems: [],
    userOrders: [],
    fetchingOrders: false,
    fetchingOrdersError: null,
    addingOrder: false,
    addingOrderError: null
  }

  it('should initialize state correctly', () => {
    expect(cartReducer(undefined, {})).toEqual(initialState)
  })

  it('should handle TOGGLE_CART_VISIBLE', () => {
    const expectedState = {
      ...initialState,
      cartVisible: true
    }

    expect(cartReducer(undefined, { 
      type: cartActionTypes.TOGGLE_CART_VISIBLE
    })).toEqual(expectedState)
  })
  
  it('should handle ADD_ITEM_TO_CART', () => {
    const inputState = {
      ...initialState,
      cartItems: [
        {
          item: {
            _id: '776',
            name: 'Item1'
          },
          quantity: 5
        }
      ]
    }
    const expectedState = {
      ...initialState,
      cartItems: [
        {
          item: {
            _id: '776',
            name: 'Item1'
          },
          quantity: 5
        },
        {
          item: {
            _id: '887',
            name: 'Item2'
          },
          quantity: 3
        }
      ]
    }

    expect(cartReducer(inputState, { 
      type: cartActionTypes.ADD_ITEM_TO_CART,
      payload: {
        item: {
          _id: '887',
          name: 'Item2'
        },
        quantity: 3
      }
    })).toEqual(expectedState)
    
    const expectedStateAlt = {
      ...initialState,
      cartItems: [
        {
          item: {
            _id: '776',
            name: 'Item1'
          },
          quantity: 8
        }
      ]
    }

    expect(cartReducer(inputState, {
      type: cartActionTypes.ADD_ITEM_TO_CART,
      payload: {
        item: {
          _id: '776',
          name: 'Item1'
        },
        quantity: 3
      }
    })).toEqual(expectedStateAlt)
  })

  it('should handle DECREASE_ITEM_QUANTITY', () => {
    const inputState = {
      ...initialState,
      cartItems: [
        {
          item: {
            _id: '776',
            name: 'Item1'
          },
          quantity: 5
        },
        {
          item: {
            _id: '887',
            name: 'Item2'
          },
          quantity: 1
        }
      ]
    }
    const expectedState = {
      ...initialState,
      cartItems: [
        {
          item: {
            _id: '776',
            name: 'Item1'
          },
          quantity: 4
        },
        {
          item: {
            _id: '887',
            name: 'Item2'
          },
          quantity: 1
        }
      ]
    }

    expect(cartReducer(inputState, { 
      type: cartActionTypes.DECREASE_ITEM_QUANTITY,
      payload: {
        item: {
          _id: '776',
          name: 'Item1'
        },
        quantity: 5
      }
    })).toEqual(expectedState)

    const expectedStateAlt = {
      ...initialState,
      cartItems: [
        {
          item: {
            _id: '776',
            name: 'Item1'
          },
          quantity: 5
        }
      ]
    }

    expect(cartReducer(inputState, { 
      type: cartActionTypes.DECREASE_ITEM_QUANTITY,
      payload: {
        item: {
          _id: '887',
          name: 'Item2'
        },
        quantity: 1
      }
    })).toEqual(expectedStateAlt)
  })

  it('should handle CLEAR_ITEM_FROM_CART', () => {
    const inputState = {
      ...initialState,
      cartItems: [
        {
          item: {
            _id: '776',
            name: 'Item1'
          },
          quantity: 5
        },
        {
          item: {
            _id: '887',
            name: 'Item2'
          },
          quantity: 1
        }
      ]
    }
    const expectedState = {
      ...initialState,
      cartItems: [
        {
          item: {
            _id: '776',
            name: 'Item1'
          },
          quantity: 5
        }
      ]
    }

    expect(cartReducer(inputState, { 
      type: cartActionTypes.CLEAR_ITEM_FROM_CART,
      payload: {
        item: {
          _id: '887',
          name: 'Item2'
        },
        quantity: 1
      }
    })).toEqual(expectedState)
  })
  
  it('should handle CLEAR_ALL_CART_ITEMS', () => {
    const inputState = {
      ...initialState,
      cartItems: [
        {
          item: {
            _id: '776',
            name: 'Item1'
          },
          quantity: 5
        },
        {
          item: {
            _id: '887',
            name: 'Item2'
          },
          quantity: 1
        }
      ]
    }
    const expectedState = {
      ...initialState,
      cartItems: []
    }

    expect(cartReducer(inputState, { 
      type: cartActionTypes.CLEAR_ALL_CART_ITEMS
    })).toEqual(expectedState)
  })
  
  it('should handle FETCH_ORDERS_START', () => {
    const inputState = {
      ...initialState,
      ordersError: 'Some error message'
    }
    const expectedState = {
      ...initialState,
      fetchingOrders: true,
      ordersError: null
    }

    expect(cartReducer(inputState, { 
      type: cartActionTypes.FETCH_ORDERS_START
    })).toEqual(expectedState)
  })
  
  it('should handle FETCH_ORDERS_SUCCESS', () => {
    const inputState = {
      ...initialState,
      fetchingOrders: true,
      ordersError: 'Some error message'
    }
    const expectedState = {
      ...initialState,
      userOrders: [ 'order1', 'order2'],
      fetchingOrders: false,
      ordersError: null
    }

    expect(cartReducer(inputState, { 
      type: cartActionTypes.FETCH_ORDERS_SUCCESS,
      payload: [ 'order1', 'order2']
    })).toEqual(expectedState)
  })
  
  it('should handle FETCH_ORDERS_FAILURE', () => {
    const inputState = {
      ...initialState,
      fetchingOrders: true
    }
    const expectedState = {
      ...initialState,
      fetchingOrders: false,
      ordersError: 'There was a problem fetching your orders.'
    }

    expect(cartReducer(inputState, { 
      type: cartActionTypes.FETCH_ORDERS_FAILURE
    })).toEqual(expectedState)
  })
  
  it('should handle ADD_ORDER_START', () => {
    const inputState = {
      ...initialState,
      addingOrderError: 'Some error message'
    }
    const expectedState = {
      ...initialState,
      addingOrder: true,
      addingOrderError: null
    }

    expect(cartReducer(inputState, { 
      type: cartActionTypes.ADD_ORDER_START
    })).toEqual(expectedState)
  })
  
  it('should handle ADD_ORDER_SUCCESS', () => {
    const inputState = {
      ...initialState,
      addingOrder: true,
      addingOrderError: 'Some error message'
    }
    const expectedState = {
      ...initialState,
      addingOrder: false,
      addingOrderError: null
    }

    expect(cartReducer(inputState, { 
      type: cartActionTypes.ADD_ORDER_SUCCESS
    })).toEqual(expectedState)
  })
  
  it('should handle ADD_ORDER_FAILURE', () => {
    const inputState = {
      ...initialState,
      addingOrder: true
    }
    const expectedState = {
      ...initialState,
      addingOrder: false,
      addingOrderError: 'Some error message'
    }

    expect(cartReducer(inputState, { 
      type: cartActionTypes.ADD_ORDER_FAILURE,
      payload: 'Some error message'
    })).toEqual(expectedState)
  })
})