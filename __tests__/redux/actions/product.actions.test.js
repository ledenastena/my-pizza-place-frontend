import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  setFetchedProductsType,
  fetchProductTypesStart,
  fetchProductTypesSuccess,
  fetchProductTypesFailure,
  editProductStart,
  editProductSuccess,
  editProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
  changeCurrency
} from '../../../src/redux/product/product.actions'
import productActionTypes from '../../../src/redux/product/product.types'

describe('testing product actions', () => {
  it('should create an action for starting of fetching products', () => {
    const typeParam = 'typeOfProducts'
    expect(fetchProductsStart(typeParam)).toEqual({
      type: productActionTypes.FETCH_PRODUCTS_START,
      payload: typeParam
    })
  })
  
  it('should create an action for success of fetching products', () => {
    const data = ['product1', 'product2']
    expect(fetchProductsSuccess(data)).toEqual({
      type: productActionTypes.FETCH_PRODUCTS_SUCCESS,
      payload: data
    })
  })
  
  it('should create an action for failure of fetching products', () => {
    expect(fetchProductsFailure()).toEqual({
      type: productActionTypes.FETCH_PRODUCTS_FAILURE
    })
  })

  it('should create an action for setting type of fetched products', () => {
    const type = 'typeOfProducts'
    expect(setFetchedProductsType(type)).toEqual({
      type: productActionTypes.SET_FETCHED_PRODUCTS_TYPE,
      payload: type
    })
  })

  it('should create an action for starting of fetching product types', () => {
    const token = '12345'
    expect(fetchProductTypesStart(token)).toEqual({
      type: productActionTypes.FETCH_PRODUCT_TYPES_START,
      payload: token
    })
  })
  
  it('should create an action for success of fetching product types', () => {
    const data = ['type1', 'type2']
    expect(fetchProductTypesSuccess(data)).toEqual({
      type: productActionTypes.FETCH_PRODUCT_TYPES_SUCCESS,
      payload: data
    })
  })
  
  it('should create an action for failure of fetching product types', () => {
    expect(fetchProductTypesFailure()).toEqual({
      type: productActionTypes.FETCH_PRODUCT_TYPES_FAILURE
    })
  })
  
  it('should create an action for starting of editing a product', () => {
    const requestObj = { requestProp1: 'Value1', requestProp2: 'Value2' }
    expect(editProductStart(requestObj)).toEqual({
      type: productActionTypes.EDIT_PRODUCT_START,
      payload: requestObj
    })
  })
  
  it('should create an action for success of editing a product', () => {
    const data = { name: 'Product', price: '55' }
    expect(editProductSuccess(data)).toEqual({
      type: productActionTypes.EDIT_PRODUCT_SUCCESS,
      payload: data
    })
  })
  
  it('should create an action for failure of editing a product', () => {
    const errorMessage = 'Some error message'
    expect(editProductFailure(errorMessage)).toEqual({
      type: productActionTypes.EDIT_PRODUCT_FAILURE,
      payload: errorMessage
    })
  })
  
  it('should create an action for starting of deleting a product', () => {
    const requestObj = { requestProp1: 'Value1', requestProp2: 'Value2' }
    expect(deleteProductStart(requestObj)).toEqual({
      type: productActionTypes.DELETE_PRODUCT_START,
      payload: requestObj
    })
  })
  
  it('should create an action for success of deleting a product', () => {
    const data = { name: 'Product', price: '55' }
    expect(deleteProductSuccess(data)).toEqual({
      type: productActionTypes.DELETE_PRODUCT_SUCCESS,
      payload: data
    })
  })
  
  it('should create an action for failure of deleting a product', () => {
    expect(deleteProductFailure()).toEqual({
      type: productActionTypes.DELETE_PRODUCT_FAILURE
    })
  })
  
  it('should create an action for starting of adding a product', () => {
    const requestObj = { requestProp1: 'Value1', requestProp2: 'Value2' }
    expect(addProductStart(requestObj)).toEqual({
      type: productActionTypes.ADD_PRODUCT_START,
      payload: requestObj
    })
  })
  
  it('should create an action for success of adding a product', () => {
    expect(addProductSuccess()).toEqual({
      type: productActionTypes.ADD_PRODUCT_SUCCESS
    })
  })
  
  it('should create an action for failure of adding a product', () => {
    const errorMessage = 'Some error message'
    expect(addProductFailure(errorMessage)).toEqual({
      type: productActionTypes.ADD_PRODUCT_FAILURE,
      payload: errorMessage
    })
  })

  it('should create an action for changing currency', () => {
    expect(changeCurrency()).toEqual({
      type: productActionTypes.CHANGE_CURRENCY
    })
  })
})