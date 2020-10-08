import { combineReducers } from 'redux'
import productReducer from './product/product.reducer'
import userReducer from './user/user.reducer'
import cartReducer from './cart/cart.reducer'

const rootReducer = combineReducers({
  product: productReducer,
  user: userReducer,
  cart: cartReducer
})

export default rootReducer
