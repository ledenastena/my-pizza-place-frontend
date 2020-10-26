import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '../test-utils'
import Header from '../../src/components/header/header.component'

describe('<Header /> component tests', () => {
  it('should initialy render the component correctly', () => {
    const initialState = {
      user: {
        currentUser: null,
        authTooken: null,
      },
      product: {
        selectedCurrency: 'eur',
      },
      cart: {
        cartVisible: false,
      },
    }

    const { container, getByTestId, queryByTestId } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
      { initialState }
    )

    expect(container.firstChild).toMatchSnapshot()
    expect(getByTestId('regular-menu-login-button')).toBeInTheDocument()
    expect(queryByTestId('regular-menu-logout-button')).toBeNull()
    expect(queryByTestId('profile-button')).toBeNull()
    expect(queryByTestId('cart-dropdown')).toBeNull()
  })

  it('should render component with custom state', () => {
    const initialState = {
      user: {
        currentUser: {
          name: 'Bob',
        },
        authTooken: '12345',
      },
      product: {
        selectedCurrency: 'eur',
      },
      cart: {
        cartItems: [],
        cartVisible: true,
      },
    }

    const { queryByTestId } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
      { initialState }
    )

    expect(queryByTestId('regular-menu-login-button')).toBeNull()
    expect(queryByTestId('regular-menu-logout-button')).toBeInTheDocument()
    expect(queryByTestId('profile-button')).toBeInTheDocument()
    expect(queryByTestId('cart-dropdown')).toBeInTheDocument()
  })

  it('should update the DOM appropriately based on user interaction', async () => {
    const initialState = {
      user: {
        currentUser: {
          name: 'Bob',
        },
        authTooken: '12345',
      },
      product: {
        selectedCurrency: 'eur',
      },
      cart: {
        cartItems: [],
        cartVisible: false,
      },
    }

    const { queryByTestId, getByTestId, getByText } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
      { initialState }
    )

    // Clicking the logout button makes it disappear and login button appears
    fireEvent.click(queryByTestId('regular-menu-logout-button'))
    await waitFor(() => {
      expect(queryByTestId('regular-menu-logout-button')).toBeNull()
    })
    expect(getByTestId('regular-menu-login-button')).toBeInTheDocument()

    // Clicking on USD currency button ( selecting it ) when the current state currency is set to EUR should apply new styles to the button
    expect(
      getByTestId('usd-currency-button').getAttribute('class')
    ).not.toEqual('currency-button selected-currency')
    fireEvent.click(getByTestId('usd-currency-button'))
    expect(getByTestId('usd-currency-button').getAttribute('class')).toEqual(
      'currency-button selected-currency'
    )
    expect(
      getByTestId('eur-currency-button').getAttribute('class')
    ).not.toEqual('currency-button selected-currency')

    // Cart dropdown appears after clicking the cart button
    expect(queryByTestId('cart-dropdown')).toBeNull()
    fireEvent.click(queryByTestId('cart-button'))
    expect(queryByTestId('cart-dropdown')).toBeInTheDocument()
    // Clicking inside cart dropdown should not have any effect on the dropdown showing up
    fireEvent.mouseDown(getByText('Your cart is empty'))
    expect(queryByTestId('cart-dropdown')).toBeInTheDocument()
    // When the user clicks anywhere outside of cart dropdown it should disappear
    fireEvent.mouseDown(document.body)
    expect(queryByTestId('cart-dropdown')).toBeNull()

    // Menu dropdown appears after clicking the hamburger button
    expect(queryByTestId('menu-dropdown')).toBeNull()
    fireEvent.click(queryByTestId('hamburger-menu-button'))
    expect(queryByTestId('menu-dropdown')).toBeInTheDocument()
    // Clicking any link inside of menu dropdown should take the user on the requested page and close the dropdown
    fireEvent.click(getByTestId('menu-dropdown-pizzas-link'))
    expect(queryByTestId('menu-dropdown')).toBeNull()
    // Click outside of menu dropdown should make it disappear
    fireEvent.mouseDown(document.body)
    expect(queryByTestId('menu-dropdown')).toBeNull()
  })
})
