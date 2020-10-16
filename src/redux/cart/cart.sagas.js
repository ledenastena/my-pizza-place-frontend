import { takeLatest, put } from 'redux-saga/effects'
import cartActionTypes from './cart.types'
import { fetchOrdersSuccess, fetchOrdersFailure, addOrderSuccess, addOrderFailure} from './cart.actions'
import axios from 'axios'

export function* onAddOrderStart() {
  yield takeLatest(cartActionTypes.ADD_ORDER_START, addOrderStartAsync)
}

export function* addOrderStartAsync(action) {
  try {
    yield axios.post(`${process.env.BACKEND_URL}/orders`, 
    action.payload.order,
    {
      headers: {
        'Authorization': `Bearer ${ action.payload.token }`
      }
    })

    yield put(addOrderSuccess())
  }
  catch(err) {
    yield put(addOrderFailure('There was a problem trying to make an order!'))
  }
}

export function* onFetchOrdersStart() {
  yield takeLatest(cartActionTypes.FETCH_ORDERS_START, fetchOrdersStartAsync)
}

export function* fetchOrdersStartAsync(action) {
  try {
    const response = yield axios.get(`${process.env.BACKEND_URL}/orders`, {
      headers: {
        'Authorization': `Bearer ${action.payload}`
      }
    })

    yield put(fetchOrdersSuccess(response.data))
  }
  catch(err) {
    yield put(fetchOrdersFailure())
  }
}