import productReducer from '../../../src/redux/product/product.reducer'
import productActionTypes from '../../../src/redux/product/product.types'

describe('testing product reducer', () => {
  const initialState = {
    items: [],
    isFetching: false,
    errorMessage: null,
    currentlyShowingProducts: null,
    availableProductTypes: null,
    isProductTypesFetching: false,
    errorProductTypesMessage: null,
    editingProduct: false,
    editingError: null,
    addingProduct: false,
    addingError: null,
    deletingProduct: false,
    deletingError: null,
    selectedCurrency: 'eur'
  }

  it('should initialize state correctly', () => {
    expect(productReducer(undefined, {})).toEqual(initialState)
  })

  it('should handle FETCH_PRODUCTS_START', () => {
    const inputState = {
      ...initialState,
      errorMessage: 'Some error message'
    }
    const expectedState = {
      ...initialState,
      isFetching: true,
      errorMessage: null
    }

    expect(productReducer(inputState, { 
      type: productActionTypes.FETCH_PRODUCTS_START
    })).toEqual(expectedState)
  })
  
  it('should handle FETCH_PRODUCTS_SUCCESS', () => {
    const inputState = {
      ...initialState,
      isFetching: true,
      errorMessage: 'Some error message'
    }
    const expectedState = {
      ...initialState,
      items: [ 'prod1', 'prod2'],
      currentlyShowingProducts: 'pizzas',
      isFetching: false,
      errorMessage: null
    }

    expect(productReducer(inputState, { 
      type: productActionTypes.FETCH_PRODUCTS_SUCCESS,
      payload: {
        products: [ 'prod1', 'prod2'],
        typeOfProducts: 'pizzas'
      }
    })).toEqual(expectedState)
  })
  
  it('should handle FETCH_PRODUCTS_FAILURE', () => {
    const inputState = {
      ...initialState,
      isFetching: true
    }
    const expectedState = {
      ...initialState,
      isFetching: false,
      errorMessage: 'An error occured while getting data!'
    }

    expect(productReducer(inputState, { 
      type: productActionTypes.FETCH_PRODUCTS_FAILURE
    })).toEqual(expectedState)
  })
  
  it('should handle FETCH_PRODUCT_TYPES_START', () => {
    const inputState = {
      ...initialState,
      errorProductTypesMessage: 'Some error message'
    }
    const expectedState = {
      ...initialState,
      isProductTypesFetching: true,
      errorProductTypesMessage: null
    }

    expect(productReducer(inputState, { 
      type: productActionTypes.FETCH_PRODUCT_TYPES_START
    })).toEqual(expectedState)
  })
  
  it('should handle FETCH_PRODUCT_TYPES_SUCCESS', () => {
    const inputState = {
      ...initialState,
      isProductTypesFetching: true,
      errorProductTypesMessage: 'Some error message'
    }
    const expectedState = {
      ...initialState,
      availableProductTypes: ['type1', 'type2'],
      isProductTypesFetching: false,
      errorProductTypesMessage: null
    }

    expect(productReducer(inputState, { 
      type: productActionTypes.FETCH_PRODUCT_TYPES_SUCCESS,
      payload: ['type1', 'type2']
    })).toEqual(expectedState)
  })
  
  it('should handle FETCH_PRODUCT_TYPES_FAILURE', () => {
    const inputState = {
      ...initialState,
      isProductTypesFetching: true
    }
    const expectedState = {
      ...initialState,
      isProductTypesFetching: false,
      errorProductTypesMessage: 'An error occured while getting data!'
    }

    expect(productReducer(inputState, { 
      type: productActionTypes.FETCH_PRODUCT_TYPES_FAILURE
    })).toEqual(expectedState)
  })
  
  it('should handle EDIT_PRODUCT_START', () => {
    const inputState = {
      ...initialState,
      editingError: 'Some error message'
    }
    const expectedState = {
      ...initialState,
      editingProduct: true,
      editingError: null
    }

    expect(productReducer(inputState, { 
      type: productActionTypes.EDIT_PRODUCT_START
    })).toEqual(expectedState)
  })
  
  it('should handle EDIT_PRODUCT_SUCCESS', () => {
    const inputState = {
      ...initialState,
      items: ['item1', 'item2'],
      currentlyShowingProducts: 'pizzas',
      editingProduct: true,
      editingError: 'Some error message'
    }
    const expectedState = {
      ...initialState,
      items: [],
      currentlyShowingProducts: null,
      editingProduct: false,
      editingError: null
    }

    expect(productReducer(inputState, { 
      type: productActionTypes.EDIT_PRODUCT_SUCCESS
    })).toEqual(expectedState)
  })
  
  it('should handle EDIT_PRODUCT_FAILURE', () => {
    const inputState = {
      ...initialState,
      editingProduct: true
    }
    const expectedState = {
      ...initialState,
      editingProduct: false,
      editingError: 'Some error message'
    }

    expect(productReducer(inputState, { 
      type: productActionTypes.EDIT_PRODUCT_FAILURE,
      payload: 'Some error message'
    })).toEqual(expectedState)
  })
  
  it('should handle ADD_PRODUCT_START', () => {
    const inputState = {
      ...initialState,
      addingError: 'Some error message'
    }
    const expectedState = {
      ...initialState,
      addingProduct: true,
      addingError: null
    }

    expect(productReducer(inputState, { 
      type: productActionTypes.ADD_PRODUCT_START
    })).toEqual(expectedState)
  })
  
  it('should handle ADD_PRODUCT_SUCCESS', () => {
    const inputState = {
      ...initialState,
      items: ['item1', 'item2'],
      currentlyShowingProducts: 'pizzas',
      addingProduct: true,
      addingError: 'Some error message'
    }
    const expectedState = {
      ...initialState,
      items: [],
      currentlyShowingProducts: null,
      addingProduct: false,
      addingError: null
    }

    expect(productReducer(inputState, { 
      type: productActionTypes.ADD_PRODUCT_SUCCESS
    })).toEqual(expectedState)
  })
  
  it('should handle ADD_PRODUCT_FAILURE', () => {
    const inputState = {
      ...initialState,
      addingProduct: true
    }
    const expectedState = {
      ...initialState,
      addingProduct: false,
      addingError: 'Some error message'
    }

    expect(productReducer(inputState, { 
      type: productActionTypes.ADD_PRODUCT_FAILURE,
      payload: 'Some error message'
    })).toEqual(expectedState)
  })
  
  it('should handle DELETE_PRODUCT_START', () => {
    const inputState = {
      ...initialState,
      deletingError: 'Some error message'
    }
    const expectedState = {
      ...initialState,
      deletingProduct: true,
      deletingError: null
    }

    expect(productReducer(inputState, { 
      type: productActionTypes.DELETE_PRODUCT_START
    })).toEqual(expectedState)
  })
  
  it('should handle DELETE_PRODUCT_SUCCESS', () => {
    const inputState = {
      ...initialState,
      items: ['item1', 'item2'],
      currentlyShowingProducts: 'pizzas',
      deletingProduct: true,
      deletingError: 'Some error message'
    }
    const expectedState = {
      ...initialState,
      items: [],
      currentlyShowingProducts: null,
      deletingProduct: false,
      deletingError: null
    }

    expect(productReducer(inputState, { 
      type: productActionTypes.DELETE_PRODUCT_SUCCESS
    })).toEqual(expectedState)
  })
  
  it('should handle DELETE_PRODUCT_FAILURE', () => {
    const inputState = {
      ...initialState,
      deletingProduct: true
    }
    const expectedState = {
      ...initialState,
      deletingProduct: false,
      deletingError: 'An error occurred while deleting data!'
    }

    expect(productReducer(inputState, { 
      type: productActionTypes.DELETE_PRODUCT_FAILURE
    })).toEqual(expectedState)
  })
  
  it('should handle CHANGE_CURRENCY', () => {
    const inputState = {
      ...initialState,
      selectedCurrency: 'usd'
    }
    const expectedState = {
      ...initialState,
      selectedCurrency: 'eur'
    }

    expect(productReducer(inputState, { 
      type: productActionTypes.CHANGE_CURRENCY
    })).toEqual(expectedState)
  })

})