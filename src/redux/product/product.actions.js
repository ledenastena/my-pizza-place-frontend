import productActionTypes from './product.types'

export const fetchProductsStart = (typeParam) => ({
  type: productActionTypes.FETCH_PRODUCTS_START,
  payload: typeParam,
})

export const fetchProductsSuccess = (data) => ({
  type: productActionTypes.FETCH_PRODUCTS_SUCCESS,
  payload: data,
})

export const fetchProductsFailure = () => ({
  type: productActionTypes.FETCH_PRODUCTS_FAILURE,
})

export const setFetchedProductsType = (type) => ({
  type: productActionTypes.SET_FETCHED_PRODUCTS_TYPE,
  payload: type,
})

export const fetchProductTypesStart = (token) => ({
  type: productActionTypes.FETCH_PRODUCT_TYPES_START,
  payload: token,
})

export const fetchProductTypesSuccess = (data) => ({
  type: productActionTypes.FETCH_PRODUCT_TYPES_SUCCESS,
  payload: data,
})

export const fetchProductTypesFailure = () => ({
  type: productActionTypes.FETCH_PRODUCT_TYPES_FAILURE,
})

export const editProductStart = (reqObj) => ({
  type: productActionTypes.EDIT_PRODUCT_START,
  payload: reqObj,
})

export const editProductSuccess = (data) => ({
  type: productActionTypes.EDIT_PRODUCT_SUCCESS,
  payload: data,
})

export const editProductFailure = (message) => ({
  type: productActionTypes.EDIT_PRODUCT_FAILURE,
  payload: message,
})

export const deleteProductStart = (reqObj) => ({
  type: productActionTypes.DELETE_PRODUCT_START,
  payload: reqObj,
})

export const deleteProductSuccess = (productToDelete) => ({
  type: productActionTypes.DELETE_PRODUCT_SUCCESS,
  payload: productToDelete,
})

export const deleteProductFailure = () => ({
  type: productActionTypes.DELETE_PRODUCT_FAILURE,
})

export const addProductStart = (reqObj) => ({
  type: productActionTypes.ADD_PRODUCT_START,
  payload: reqObj,
})

export const addProductSuccess = () => ({
  type: productActionTypes.ADD_PRODUCT_SUCCESS,
})

export const addProductFailure = (message) => ({
  type: productActionTypes.ADD_PRODUCT_FAILURE,
  payload: message,
})

export const changeCurrency = () => ({
  type: productActionTypes.CHANGE_CURRENCY,
})
