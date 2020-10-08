import cartActionTypes from './cart.types'

export const addItemToCart = (itemObj) => ({
  type: cartActionTypes.ADD_ITEM_TO_CART,
  payload: itemObj
})

export const decreaseItemQuantity = (item) => ({
  type: cartActionTypes.DECREASE_ITEM_QUANTITY,
  payload: item
})

export const clearItemFromCart = (item) => ({
  type: cartActionTypes.CLEAR_ITEM_FROM_CART,
  payload: item
})

export const clearAllCartItems = () => ({
  type: cartActionTypes.CLEAR_ALL_CART_ITEMS
})

export const toggleCartVisible = () => ({
  type: cartActionTypes.TOGGLE_CART_VISIBLE
})

export const fetchOrdersStart = (reqObj) => ({
  type: cartActionTypes.FETCH_ORDERS_START,
  payload: reqObj
})

export const fetchOrdersSuccess = (orders) => ({
  type: cartActionTypes.FETCH_ORDERS_SUCCESS,
  payload: orders
})

export const fetchOrdersFailure = () => ({
  type: cartActionTypes.FETCH_ORDERS_FAILURE
})

export const addOrderStart = (reqObj) => ({
  type: cartActionTypes.ADD_ORDER_START,
  payload: reqObj
})

export const addOrderSuccess = (orders) => ({
  type: cartActionTypes.ADD_ORDER_SUCCESS,
  payload: orders
})

export const addOrderFailure = (errorMessage) => ({
  type: cartActionTypes.ADD_ORDER_FAILURE,
  payload: errorMessage
})