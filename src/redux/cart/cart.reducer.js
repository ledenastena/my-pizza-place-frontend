import cartActionTypes from './cart.types'
import { insertItemIntoCart, decreaseItemQuantity } from './cart.utils'

const INITIAL_STATE = {
  cartVisible: false,
  cartItems: [],
  userOrders: [],
  fetchingOrders: false,
  fetchingOrdersError: null,
  addingOrder: false,
  addingOrderError: null
}

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case(cartActionTypes.TOGGLE_CART_VISIBLE):
      return {
        ...state,
        cartVisible: !state.cartVisible
      }
    case(cartActionTypes.ADD_ITEM_TO_CART): 
      return {
        ...state,
        cartItems: insertItemIntoCart(state.cartItems, action.payload)
      }
    case (cartActionTypes.DECREASE_ITEM_QUANTITY):
      return {
        ...state,
        cartItems: decreaseItemQuantity(state.cartItems, action.payload)
      }
    case (cartActionTypes.CLEAR_ITEM_FROM_CART): 
      return {
        ...state,
        cartItems: state.cartItems.filter(cartItem => cartItem.item._id !== action.payload.item._id)
      }
    case (cartActionTypes.CLEAR_ALL_CART_ITEMS):
      return {
        ...state,
        cartItems: []
      }
    case (cartActionTypes.FETCH_ORDERS_START):
      return {
        ...state,
        fetchingOrders: true,
        ordersError: null
      }
    case (cartActionTypes.FETCH_ORDERS_SUCCESS):
      return {
        ...state,
        userOrders: action.payload,
        fetchingOrders: false,
        ordersError: null
      }
    case (cartActionTypes.FETCH_ORDERS_FAILURE):
      return {
        ...state,
        fetchingOrders: false,
        ordersError: 'There was a problem fetching your orders.'
      }
    case (cartActionTypes.ADD_ORDER_START):
      return {
        ...state,
        addingOrder: true,
        addingOrderError: null
      }
    case (cartActionTypes.ADD_ORDER_SUCCESS):
      return {
        ...state,
        addingOrder: false,
        addingOrderError: null
      }
    case (cartActionTypes.ADD_ORDER_FAILURE):
      return {
        ...state,
        addingOrder: false,
        addingOrderError: action.payload
      }
    default: 
      return state
    
  }
}

export default cartReducer