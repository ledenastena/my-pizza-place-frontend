import { combineReducers } from 'redux'
import productReducer from './product/product.reducer'
import userReducer from './user/user.reducer'
import cartReducer from './cart/cart.reducer'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
}

const rootReducer = combineReducers({
  product: productReducer,
  user: userReducer,
  cart: cartReducer
})

export default persistReducer(persistConfig, rootReducer)
