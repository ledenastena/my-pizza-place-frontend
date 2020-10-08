import { Provider } from 'react-redux'
import productActionTypes from './product.types'

const INITIAL_STATE = {
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

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Fetching products
    case (productActionTypes.FETCH_PRODUCTS_START):
      return {
        ...state,
        isFetching: true,
        errorMessage: null
      }
    case (productActionTypes.FETCH_PRODUCTS_SUCCESS):
      return {
        ...state,
        items: action.payload.products,
        currentlyShowingProducts: action.payload.typeOfProducts,
        isFetching: false,
        errorMessage: null
      }    
    case (productActionTypes.FETCH_PRODUCTS_FAILURE):
      return {
        ...state,
        isFetching: false,
        errorMessage: 'An error occured while getting data!'
      }
    // Fetching product types
    case (productActionTypes.FETCH_PRODUCT_TYPES_START):
      return {
        ...state,
        isProductTypesFetching: true,
        errorProductTypesMessage: null
      }
    case (productActionTypes.FETCH_PRODUCT_TYPES_SUCCESS):
      return {
        ...state,
        availableProductTypes: action.payload,
        isProductTypesFetching: false,
        errorProductTypesMessage: null
      }    
    case (productActionTypes.FETCH_PRODUCT_TYPES_FAILURE):
      return {
        ...state,
        isProductTypesFetching: false,
        errorProductTypesMessage: 'An error occured while getting data!'
      }
    // Editing a product
    case (productActionTypes.EDIT_PRODUCT_START):
      return {
        ...state,
        editingProduct: true,
        editingError: null
      }
    case (productActionTypes.EDIT_PRODUCT_SUCCESS):
      return {
        ...state,
        items: [],
        currentlyShowingProducts: null,
        editingProduct: false,
        editingError: null
      }    
    case (productActionTypes.EDIT_PRODUCT_FAILURE):
      return {
        ...state,
        editingProduct: false,
        editingError: action.payload
      }
    // Creating a product
    case (productActionTypes.ADD_PRODUCT_START): 
      return {
        ...state,
        addingProduct: true,
        addingError: null
      }
    case (productActionTypes.ADD_PRODUCT_SUCCESS): 
      return {
        ...state,
        items: [],
        currentlyShowingProducts: null,
        addingProduct: false,
        addingError: null
      }
    case (productActionTypes.ADD_PRODUCT_FAILURE): 
      return {
        ...state,
        addingProduct: false,
        addingError: action.payload
      }
    // Deleting a product
    case (productActionTypes.DELETE_PRODUCT_START): 
      return {
        ...state,
        deletingProduct: true,
        deletingError: null
      }
    case (productActionTypes.DELETE_PRODUCT_SUCCESS): 
      return {
        ...state,
        items: [],
        currentlyShowingProducts: null,
        deletingProduct: false,
        deletingError: null
      }
    case (productActionTypes.DELETE_PRODUCT_FAILURE): 
      return {
        ...state,
        deletingProduct: false,
        deletingError: 'An error occurred while deleting data!'
      }
    case (productActionTypes.CHANGE_CURRENCY): 
      return {
        ...state,
        selectedCurrency: state.selectedCurrency === 'eur' ? 'usd' : 'eur'
      }
    default: {
      return state
    }
  }
}

export default productReducer