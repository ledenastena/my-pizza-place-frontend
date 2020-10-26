import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render } from '../test-utils'
import CartDropdown from '../../src/components/cart-dropdown/cart-dropdown.component'

describe('<CartDropdown /> component tests', () => {
  it('should initialy render the component correctly', () => {
    const initialState = {
      product: {
        selectedCurrency: 'eur',
      },
      cart: {
        cartItems: [],
      },
    }

    const wrapper = render(
      <MemoryRouter>
        <CartDropdown />
      </MemoryRouter>,
      { initialState }
    )

    expect(wrapper.container.firstChild).toMatchSnapshot()
    expect(wrapper.queryByText('Your cart is empty')).toBeTruthy()
  })

  it('should render the component with a custom state', () => {
    const initialState = {
      product: {
        selectedCurrency: 'eur',
      },
      cart: {
        cartItems: [
          {
            item: {
              _id: '556',
            },
            quantity: 2,
          },
          {
            item: {
              _id: '559',
            },
            quantity: 4,
          },
        ],
      },
    }
    const wrapper = render(
      <MemoryRouter>
        <CartDropdown cartButtonRef="mockRef" />
      </MemoryRouter>,
      { initialState }
    )

    expect(wrapper.getAllByTestId('cart-item').length).toBe(2)
  })
})
