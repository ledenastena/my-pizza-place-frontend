import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'
import user from '@testing-library/user-event'
import mockAxios from 'axios'
import AddProductForm from '../../src/components/add-product-form/add-product-form.component'
import { render, waitFor } from '../test-utils'

describe('testing add-product-form component', () => {
  const initialState = {
    user: {
      authToken: '12345',
    },
    product: {
      availableProductTypes: [
        {
          _id: '122',
          name: 'pizza',
        },
        {
          _id: '133',
          name: 'dessert',
        },
      ],
      addingProduct: false,
      addingError: null,
    },
  }

  it('should render our form fields', () => {
    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <AddProductForm prevPath="/" />
      </MemoryRouter>,
      { initialState }
    )

    expect(getByLabelText('Name')).toBeInTheDocument()
    expect(getByLabelText('Price in eur')).toBeInTheDocument()
    expect(getByLabelText('Price in usd')).toBeInTheDocument()
    expect(getByLabelText('Product description')).toBeInTheDocument()
    expect(getByLabelText('Product type')).toBeInTheDocument()
    expect(getByText('Create')).toBeInTheDocument()
  })

  it('should make the API request with the form input data, and receive an error message', async () => {
    // For the purpose of testing appearance of error message in the UI we make our mock API returning an error message
    mockAxios.post.mockImplementationOnce(() =>
      Promise.reject({ response: { data: 'Some error message' } })
    )

    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <AddProductForm prevPath="/" />
      </MemoryRouter>,
      { initialState }
    )

    // Values for creating a new product
    const productObj = {
      name: 'Product 1',
      product_type_id: '133',
      price_eur: '4',
      price_usd: '5',
      description: 'Some description',
    }

    user.type(getByLabelText('Name'), productObj.name)
    user.type(getByLabelText('Price in eur'), productObj.price_eur)
    user.type(getByLabelText('Price in usd'), productObj.price_usd)
    user.type(getByLabelText('Product description'), productObj.description)
    user.selectOptions(
      getByLabelText('Product type'),
      productObj.product_type_id
    )
    user.click(getByText('Create'))

    expect(mockAxios.post).toHaveBeenCalledTimes(1)

    // To recreate the API request we have to make the formData object the same way we do it in our saga
    const formData = new FormData()
    const productKeys = Object.keys(productObj)
    productKeys.forEach((key) => formData.append(key, productObj[key]))

    // It doesn't matter that our mock API will return an error message,
    // the important thing we are testing here is that it gets called properly
    expect(mockAxios.post).toHaveBeenCalledWith(
      `${process.env.BACKEND_URL}/products`,
      formData,
      {
        headers: {
          Authorization: 'Bearer 12345',
          'Content-Type': 'multipart/form-data;boundary="boundary"',
        },
      }
    )

    // The error message should appear in the form itself, notifying the user
    await waitFor(() => {
      expect(getByText('Some error message')).toBeInTheDocument()
    })
  })
})
