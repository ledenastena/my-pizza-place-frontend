import {
  addItemToCart,
  decreaseItemQuantity,
  clearItemFromCart,
  clearAllCartItems,
  toggleCartVisible,
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  addOrderStart,
  addOrderSuccess,
  addOrderFailure
} from '../../../src/redux/cart/cart.actions'
import cartActionTypes from '../../../src/redux/cart/cart.types'

describe('testing cart actions', () => {
  it('should create an action for adding an item to cart', () => {
    const itemObj = { name: 'Product', price: '55' }
    expect(addItemToCart(itemObj)).toEqual({
      type: cartActionTypes.ADD_ITEM_TO_CART,
      payload: itemObj
    })
  })
  
  it('should create an action for decreasing item quantity in the cart', () => {
    const itemObj = { name: 'Product', price: '55' }
    expect(decreaseItemQuantity(itemObj)).toEqual({
      type: cartActionTypes.DECREASE_ITEM_QUANTITY,
      payload: itemObj
    })
  })
  
  it('should create an action for clearing an item from cart', () => {
    const itemObj = { name: 'Product', price: '55' }
    expect(clearItemFromCart(itemObj)).toEqual({
      type: cartActionTypes.CLEAR_ITEM_FROM_CART,
      payload: itemObj
    })
  })
  
  it('should create an action for clearing all items from cart', () => {
    expect(clearAllCartItems()).toEqual({
      type: cartActionTypes.CLEAR_ALL_CART_ITEMS
    })
  })
  
  it('should create an action for toggling visibility of cart dropdown', () => {
    expect(toggleCartVisible()).toEqual({
      type: cartActionTypes.TOGGLE_CART_VISIBLE
    })
  })

  it('should create an action for starting fetching of orders', () => {
    const requestObj = { requestProp1: 'Value1', requestProp2: 'Value2' }
    expect(fetchOrdersStart(requestObj)).toEqual({
      type: cartActionTypes.FETCH_ORDERS_START,
      payload: requestObj
    })
  })
  
  it('should create an action for success of fetching orders', () => {
    const ordersObj = { order1: 'First order', order2: 'Second order' }
    expect(fetchOrdersSuccess(ordersObj)).toEqual({
      type: cartActionTypes.FETCH_ORDERS_SUCCESS,
      payload: ordersObj
    })
  })
  
  it('should create an action for failure of fetching orders', () => {
    expect(fetchOrdersFailure()).toEqual({
      type: cartActionTypes.FETCH_ORDERS_FAILURE
    })
  })

  it('should create an action for starting adding of order', () => {
    const requestObj = { requestProp1: 'Value1', requestProp2: 'Value2' }
    expect(addOrderStart(requestObj)).toEqual({
      type: cartActionTypes.ADD_ORDER_START,
      payload: requestObj
    })
  })

  it('should create an action for success of adding an order', () => {
    const ordersObj = { order1: 'First order', order2: 'Second order' }
    expect(addOrderSuccess(ordersObj)).toEqual({
      type: cartActionTypes.ADD_ORDER_SUCCESS,
      payload: ordersObj
    })
  })
  
  it('should create an action for failure of adding an order', () => {
    const errorMessage = 'Some error message'
    expect(addOrderFailure(errorMessage)).toEqual({
      type: cartActionTypes.ADD_ORDER_FAILURE,
      payload: errorMessage
    })
  })
})