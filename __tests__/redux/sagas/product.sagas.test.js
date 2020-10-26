import SagaTester from 'redux-saga-tester'
import mockAxios from 'axios'
import {
  onFetchProductsStart,
  onFetchProductTypesStart,
  onEditProductStart,
  onAddProductStart,
  onDeleteProductStart,
} from '../../../src/redux/product/product.sagas'
import productReducer from '../../../src/redux/product/product.reducer'
import productActionTypes from '../../../src/redux/product/product.types'

describe('testing fetching of products', () => {
  const initialState = {
    reducer: {
      items: [],
      currentlyShowingProducts: null,
      isFetching: false,
      errorMessage: null,
    },
  }
  const sagaTester = new SagaTester({
    initialState,
    reducers: { reducer: productReducer },
  })
  sagaTester.start(onFetchProductsStart)

  afterEach(() => {
    sagaTester.reset(true)
  })

  it('tests fetching products success', async () => {
    // The state is initialized properly
    expect(sagaTester.getState()).toEqual(initialState)

    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: ['prod1', 'prod2'] })
    )
    sagaTester.dispatch({
      type: productActionTypes.FETCH_PRODUCTS_START,
      payload: 'pizzas',
    })
    await sagaTester.waitFor(productActionTypes.FETCH_PRODUCTS_SUCCESS)

    // Async call is made only once and with an argument properly determined based on action payload
    expect(mockAxios.get.mock.calls.length).toBe(1)
    expect(mockAxios.get.mock.calls[0][0]).toBe(
      `${process.env.BACKEND_URL}/products/?type=pizza`
    )

    // The reducer state is updated properly
    expect(sagaTester.getState()).toEqual({
      reducer: {
        items: ['prod1', 'prod2'],
        currentlyShowingProducts: 'pizzas',
        isFetching: false,
        errorMessage: null,
      },
    })

    // Actions are called only once
    expect(sagaTester.numCalled(productActionTypes.FETCH_PRODUCTS_START)).toBe(
      1
    )
    expect(
      sagaTester.numCalled(productActionTypes.FETCH_PRODUCTS_SUCCESS)
    ).toBe(1)
  })

  it('tests fetching products error', async () => {
    // The state is initialized properly
    expect(sagaTester.getState()).toEqual(initialState)

    mockAxios.get.mockImplementationOnce(() => Promise.reject())
    sagaTester.dispatch({
      type: productActionTypes.FETCH_PRODUCTS_START,
      payload: 'pizzas',
    })
    await sagaTester.waitFor(productActionTypes.FETCH_PRODUCTS_FAILURE)

    // Async call is made only once and with an argument properly determined based on action payload
    expect(mockAxios.get.mock.calls.length).toBe(1)
    expect(mockAxios.get.mock.calls[0][0]).toBe(
      `${process.env.BACKEND_URL}/products/?type=pizza`
    )

    // The reducer state is updated properly
    expect(sagaTester.getState()).toEqual({
      reducer: {
        items: [],
        currentlyShowingProducts: null,
        isFetching: false,
        errorMessage: 'An error occured while getting data!',
      },
    })

    // Actions are called only once
    expect(sagaTester.numCalled(productActionTypes.FETCH_PRODUCTS_START)).toBe(
      1
    )
    expect(
      sagaTester.numCalled(productActionTypes.FETCH_PRODUCTS_FAILURE)
    ).toBe(1)
  })
})

describe('testing fetching of product types', () => {
  const initialState = {
    reducer: {
      availableProductTypes: null,
      isProductTypesFetching: false,
      errorProductTypesMessage: null,
    },
  }
  const sagaTester = new SagaTester({
    initialState,
    reducers: { reducer: productReducer },
  })
  sagaTester.start(onFetchProductTypesStart)

  afterEach(() => {
    sagaTester.reset(true)
  })

  it('tests fetching product types success', async () => {
    // The state is initialized properly
    expect(sagaTester.getState()).toEqual(initialState)

    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: ['type1', 'type2'] })
    )
    sagaTester.dispatch({
      type: productActionTypes.FETCH_PRODUCT_TYPES_START,
      payload: '12345',
    })
    await sagaTester.waitFor(productActionTypes.FETCH_PRODUCT_TYPES_SUCCESS)

    // Async call is made only once and with action payload as an argument passed properly
    expect(mockAxios.get.mock.calls.length).toBe(1)
    expect(mockAxios.get.mock.calls[0][1]).toEqual({
      headers: { Authorization: 'Bearer 12345' },
    })

    // The reducer state is updated properly
    expect(sagaTester.getState()).toEqual({
      reducer: {
        availableProductTypes: ['type1', 'type2'],
        isProductTypesFetching: false,
        errorProductTypesMessage: null,
      },
    })

    // Actions are called only once
    expect(
      sagaTester.numCalled(productActionTypes.FETCH_PRODUCT_TYPES_START)
    ).toBe(1)
    expect(
      sagaTester.numCalled(productActionTypes.FETCH_PRODUCT_TYPES_SUCCESS)
    ).toBe(1)
  })

  it('tests fetching product types failure', async () => {
    // The state is initialized properly
    expect(sagaTester.getState()).toEqual(initialState)

    mockAxios.get.mockImplementationOnce(() => Promise.reject())
    sagaTester.dispatch({
      type: productActionTypes.FETCH_PRODUCT_TYPES_START,
      payload: '12345',
    })
    await sagaTester.waitFor(productActionTypes.FETCH_PRODUCT_TYPES_FAILURE)

    // Async call is made only once and with action payload as an argument passed properly
    expect(mockAxios.get.mock.calls.length).toBe(1)
    expect(mockAxios.get.mock.calls[0][1]).toEqual({
      headers: { Authorization: 'Bearer 12345' },
    })

    // The reducer state is updated properly
    expect(sagaTester.getState()).toEqual({
      reducer: {
        availableProductTypes: null,
        isProductTypesFetching: false,
        errorProductTypesMessage: 'An error occured while getting data!',
      },
    })

    // Actions are called only once
    expect(
      sagaTester.numCalled(productActionTypes.FETCH_PRODUCT_TYPES_START)
    ).toBe(1)
    expect(
      sagaTester.numCalled(productActionTypes.FETCH_PRODUCT_TYPES_FAILURE)
    ).toBe(1)
  })
})

describe('testing editing product', () => {
  const initialState = {
    reducer: {
      items: ['prod1', 'prod2'],
      currentlyShowingProducts: 'pizzas',
      editingProduct: false,
      editingError: null,
    },
  }
  const sagaTester = new SagaTester({
    initialState,
    reducers: { reducer: productReducer },
  })
  sagaTester.start(onEditProductStart)

  afterEach(() => {
    sagaTester.reset(true)
  })

  it('tests editing product success', async () => {
    // The state is initialized properly
    expect(sagaTester.getState()).toEqual(initialState)
    mockAxios.patch.mockImplementationOnce(() => Promise.resolve())

    sagaTester.dispatch({
      type: productActionTypes.EDIT_PRODUCT_START,
      payload: { product: {}, product_id: '445', token: '12345' },
    })
    await sagaTester.waitFor(productActionTypes.EDIT_PRODUCT_SUCCESS)

    // Async call is made only once and with product_id and token action payload passed in as arguments properly
    expect(mockAxios.patch.mock.calls.length).toBe(1)
    expect(mockAxios.patch.mock.calls[0][0]).toBe(
      `${process.env.BACKEND_URL}/products/445`
    )
    expect(mockAxios.patch.mock.calls[0][2]).toEqual({
      headers: {
        Authorization: 'Bearer 12345',
        'Content-Type': 'multipart/form-data;boundary="boundary"',
      },
    })

    // The reducer state is updated properly
    expect(sagaTester.getState()).toEqual({
      reducer: {
        items: [],
        currentlyShowingProducts: null,
        editingProduct: false,
        editingError: null,
      },
    })

    // Actions are called only once
    expect(sagaTester.numCalled(productActionTypes.EDIT_PRODUCT_START)).toBe(1)
    expect(sagaTester.numCalled(productActionTypes.EDIT_PRODUCT_SUCCESS)).toBe(
      1
    )
  })

  it('tests editing product falure', async () => {
    // The state is initialized properly
    expect(sagaTester.getState()).toEqual(initialState)
    mockAxios.patch.mockImplementationOnce(() =>
      Promise.reject({ response: { data: 'This is some error message' } })
    )

    sagaTester.dispatch({
      type: productActionTypes.EDIT_PRODUCT_START,
      payload: { product: {}, product_id: '445', token: '12345' },
    })
    await sagaTester.waitFor(productActionTypes.EDIT_PRODUCT_FAILURE)

    // Async call is made only once and with product_id and token action payload passed in as arguments properly
    expect(mockAxios.patch.mock.calls.length).toBe(1)
    expect(mockAxios.patch.mock.calls[0][0]).toBe(
      `${process.env.BACKEND_URL}/products/445`
    )
    expect(mockAxios.patch.mock.calls[0][2]).toEqual({
      headers: {
        Authorization: 'Bearer 12345',
        'Content-Type': 'multipart/form-data;boundary="boundary"',
      },
    })

    // The reducer state is updated properly
    expect(sagaTester.getState()).toEqual({
      reducer: {
        items: ['prod1', 'prod2'],
        currentlyShowingProducts: 'pizzas',
        editingProduct: false,
        editingError: 'This is some error message',
      },
    })

    // Actions are called only once
    expect(sagaTester.numCalled(productActionTypes.EDIT_PRODUCT_START)).toBe(1)
    expect(sagaTester.numCalled(productActionTypes.EDIT_PRODUCT_FAILURE)).toBe(
      1
    )
  })
})

describe('testing adding product', () => {
  const initialState = {
    reducer: {
      items: ['prod1', 'prod2'],
      currentlyShowingProducts: 'pizzas',
      addingProduct: false,
      addingError: null,
    },
  }
  const sagaTester = new SagaTester({
    initialState,
    reducers: { reducer: productReducer },
  })
  sagaTester.start(onAddProductStart)

  afterEach(() => {
    sagaTester.reset(true)
  })

  it('tests adding product success', async () => {
    // The state is initialized properly
    expect(sagaTester.getState()).toEqual(initialState)
    mockAxios.post.mockImplementationOnce(() => Promise.resolve())

    sagaTester.dispatch({
      type: productActionTypes.ADD_PRODUCT_START,
      payload: { product: {}, token: '12345' },
    })
    await sagaTester.waitFor(productActionTypes.ADD_PRODUCT_SUCCESS)

    // Async call is made only once and with token action payload passed in as an argument properly
    expect(mockAxios.post.mock.calls.length).toBe(1)
    expect(mockAxios.post.mock.calls[0][2]).toEqual({
      headers: {
        Authorization: 'Bearer 12345',
        'Content-Type': 'multipart/form-data;boundary="boundary"',
      },
    })

    // The reducer state is updated properly
    expect(sagaTester.getState()).toEqual({
      reducer: {
        items: [],
        currentlyShowingProducts: null,
        addingProduct: false,
        addingError: null,
      },
    })

    // Actions are called only once
    expect(sagaTester.numCalled(productActionTypes.ADD_PRODUCT_START)).toBe(1)
    expect(sagaTester.numCalled(productActionTypes.ADD_PRODUCT_SUCCESS)).toBe(1)
  })

  it('tests adding product failure', async () => {
    // The state is initialized properly
    expect(sagaTester.getState()).toEqual(initialState)
    mockAxios.post.mockImplementationOnce(() =>
      Promise.reject({ response: { data: 'Some error message' } })
    )

    sagaTester.dispatch({
      type: productActionTypes.ADD_PRODUCT_START,
      payload: { product: {}, token: '12345' },
    })
    await sagaTester.waitFor(productActionTypes.ADD_PRODUCT_FAILURE)

    // Async call is made only once and with token action payload passed in as an argument properly
    expect(mockAxios.post.mock.calls.length).toBe(1)
    expect(mockAxios.post.mock.calls[0][2]).toEqual({
      headers: {
        Authorization: 'Bearer 12345',
        'Content-Type': 'multipart/form-data;boundary="boundary"',
      },
    })

    // The reducer state is updated properly
    expect(sagaTester.getState()).toEqual({
      reducer: {
        items: ['prod1', 'prod2'],
        currentlyShowingProducts: 'pizzas',
        addingProduct: false,
        addingError: 'Some error message',
      },
    })

    // Actions are called only once
    expect(sagaTester.numCalled(productActionTypes.ADD_PRODUCT_START)).toBe(1)
    expect(sagaTester.numCalled(productActionTypes.ADD_PRODUCT_FAILURE)).toBe(1)
  })
})

describe('testing deleting a product', () => {
  const initialState = {
    reducer: {
      items: ['prod1', 'prod2'],
      currentlyShowingProducts: 'pizzas',
      deletingProduct: false,
      deletingError: null,
    },
  }
  const sagaTester = new SagaTester({
    initialState,
    reducers: { reducer: productReducer },
  })
  sagaTester.start(onDeleteProductStart)

  afterEach(() => {
    sagaTester.reset(true)
  })

  it('tests deleting product success', async () => {
    // The state is initialized properly
    expect(sagaTester.getState()).toEqual(initialState)
    mockAxios.delete.mockImplementationOnce(() => Promise.resolve())

    sagaTester.dispatch({
      type: productActionTypes.DELETE_PRODUCT_START,
      payload: { _id: '445', token: '12345' },
    })
    await sagaTester.waitFor(productActionTypes.DELETE_PRODUCT_SUCCESS)

    // Async call is made only once and with _id and token action payload passed in as arguments properly
    expect(mockAxios.delete.mock.calls.length).toBe(1)
    expect(mockAxios.delete.mock.calls[0][0]).toBe(
      `${process.env.BACKEND_URL}/products/445`
    )
    expect(mockAxios.delete.mock.calls[0][1]).toEqual({
      headers: {
        Authorization: 'Bearer 12345',
      },
    })

    // The reducer state is updated properly
    expect(sagaTester.getState()).toEqual({
      reducer: {
        items: [],
        currentlyShowingProducts: null,
        deletingProduct: false,
        deletingError: null,
      },
    })

    // Actions are called only once
    expect(sagaTester.numCalled(productActionTypes.DELETE_PRODUCT_START)).toBe(
      1
    )
    expect(
      sagaTester.numCalled(productActionTypes.DELETE_PRODUCT_SUCCESS)
    ).toBe(1)
  })

  it('tests deleting a product failure', async () => {
    // The state is initialized properly
    expect(sagaTester.getState()).toEqual(initialState)
    mockAxios.delete.mockImplementationOnce(() => Promise.reject())

    sagaTester.dispatch({
      type: productActionTypes.DELETE_PRODUCT_START,
      payload: { _id: '445', token: '12345' },
    })
    await sagaTester.waitFor(productActionTypes.DELETE_PRODUCT_FAILURE)

    // Async call is made only once and with _id and token action payload passed in as arguments properly
    expect(mockAxios.delete.mock.calls.length).toBe(1)
    expect(mockAxios.delete.mock.calls[0][0]).toBe(
      `${process.env.BACKEND_URL}/products/445`
    )
    expect(mockAxios.delete.mock.calls[0][1]).toEqual({
      headers: {
        Authorization: 'Bearer 12345',
      },
    })

    // The reducer state is updated properly
    expect(sagaTester.getState()).toEqual({
      reducer: {
        items: ['prod1', 'prod2'],
        currentlyShowingProducts: 'pizzas',
        deletingProduct: false,
        deletingError: 'An error occurred while deleting data!',
      },
    })

    // Actions are called only once
    expect(sagaTester.numCalled(productActionTypes.DELETE_PRODUCT_START)).toBe(
      1
    )
    expect(
      sagaTester.numCalled(productActionTypes.DELETE_PRODUCT_FAILURE)
    ).toBe(1)
  })
})
