import { all, call } from 'redux-saga/effects'
import {
  onFetchProductsStart,
  onFetchProductTypesStart,
  onEditProductStart,
  onAddProductStart,
  onDeleteProductStart,
} from './product/product.sagas'
import {
  onUserLoginStart,
  onUserLogoutStart,
  onUserSignUpStart,
  onEditUserStart,
} from './user/user.sagas'
import { onAddOrderStart, onFetchOrdersStart } from './cart/cart.sagas'

export default function* rootSaga() {
  yield all([
    call(onFetchProductsStart),
    call(onFetchProductTypesStart),
    call(onUserLoginStart),
    call(onUserLogoutStart),
    call(onUserSignUpStart),
    call(onEditUserStart),
    call(onEditProductStart),
    call(onAddProductStart),
    call(onDeleteProductStart),
    call(onAddOrderStart),
    call(onFetchOrdersStart),
  ])
}
