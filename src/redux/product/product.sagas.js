import { takeEvery, put, takeLatest } from 'redux-saga/effects'
import productActionTypes from './product.types'
import { 
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchProductTypesSuccess,
  fetchProductTypesFailure,
  editProductSuccess,
  editProductFailure,
  addProductSuccess,
  addProductFailure,
  deleteProductSuccess,
  deleteProductFailure
} from './product.actions'
import axios from 'axios'

export function* onFetchProductsStart() {
  yield takeEvery(
    productActionTypes.FETCH_PRODUCTS_START,
    fetchProductsStartAsync
)
}

export function* fetchProductsStartAsync(action) {
  const typeOfProducts = ['pizzas', 'drinks', 'desserts'].includes(action.payload) ? action.payload : 'all'
  let reqQueryParam = ''

  switch (typeOfProducts) {
    case ('pizzas'): {
      reqQueryParam = 'pizza'
      break
    }
    case ('drinks'): {
      reqQueryParam = 'drink'
      break
    }
    case ('desserts'): {
      reqQueryParam = 'dessert'
      break
    }
    default: {
      reqQueryParam = ''
    }
  }

  try {
    const response = yield axios.get(`${process.env.BACKEND_URL}/products${reqQueryParam !== '' ? '/?type=' + reqQueryParam : ''}`)
    
    yield put(fetchProductsSuccess({ products: response.data, typeOfProducts })) 
  }
  catch(err) {
    yield put(fetchProductsFailure())
  }
}

export function* onFetchProductTypesStart() {
  yield takeLatest(productActionTypes.FETCH_PRODUCT_TYPES_START, fetchProductTypesAsync)
}

export function* fetchProductTypesAsync(action) {
  try {
    const response = yield axios.get(`${process.env.BACKEND_URL}/product-types`,
    {
      headers: {
        'Authorization': `Bearer ${action.payload}`
      }
    })
    yield put(fetchProductTypesSuccess(response.data))
  }
  catch(err) {
    yield put(fetchProductTypesFailure())
  }
}

export function* onEditProductStart() {
  yield takeLatest(productActionTypes.EDIT_PRODUCT_START, editProductStartAsync)
}

export function* editProductStartAsync(action) {
  try{
    const formData = new FormData()
    const productKeys = Object.keys(action.payload.product)
    productKeys.forEach(key => formData.append(key, action.payload.product[key]))
    
    if (action.payload.image) {
      formData.append('image', action.payload.image)
    }

    yield axios.patch(`${process.env.BACKEND_URL}/products/${action.payload.product_id}`,
      formData, 
      {
        headers: {
          'Authorization': `Bearer ${action.payload.token}`,
          'Content-Type': 'multipart/form-data;boundary="boundary"'
      }
    })
    yield put(editProductSuccess())
  }
  catch(err) {
    yield put(editProductFailure(err.response.data))
  }
}

export function* onAddProductStart() {
  yield takeLatest(productActionTypes.ADD_PRODUCT_START, addProductStartAsync)
}

export function* addProductStartAsync(action) {
  try{
    const formData = new FormData()
    const productKeys = Object.keys(action.payload.product)
    productKeys.forEach(key => formData.append(key, action.payload.product[key]))
    
    if (action.payload.image) {
      formData.append('image', action.payload.image)
    }

    yield axios.post(`${process.env.BACKEND_URL}/products`,
    formData,
    {
      headers: {
        'Authorization': `Bearer ${action.payload.token}`,
        'Content-Type': 'multipart/form-data;boundary="boundary"'
      }
    })
    yield put(addProductSuccess())
  }
  catch(err) {
    yield put(addProductFailure(err.response.data))
  }
}

export function* onDeleteProductStart() {
  yield takeLatest(productActionTypes.DELETE_PRODUCT_START, deleteProductStartAsync)
}

export function* deleteProductStartAsync(action) {
  try {
    yield axios.delete(`${process.env.BACKEND_URL}/products/${action.payload._id}`, {
      headers: {
        'Authorization': `Bearer ${action.payload.token}`
      }
    })
    yield put(deleteProductSuccess())
  }
  catch(err) {
    yield put(deleteProductFailure())
  }
}