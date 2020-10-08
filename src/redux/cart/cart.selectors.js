import { createSelector } from 'reselect'

const selectCart = state => state.cart

export const selectCartItems = createSelector(
  [selectCart],
  cart => cart.cartItems
)

export const selectCartVisible = createSelector(
  [selectCart],
  cart => cart.cartVisible
)

export const selectUserOrders = createSelector(
  [selectCart],
  cart => cart.userOrders
)

export const selectFetchingOrders = createSelector(
  [selectCart],
  cart => cart.fetchingOrders
)

export const selectFetchingOrdersError = createSelector(
  [selectCart],
  cart => cart.fetchingOrdersError
)

export const selectAddingOrder = createSelector(
  [selectCart],
  cart => cart.addingOrder
)

export const selectAddingOrderError = createSelector(
  [selectCart],
  cart => cart.addingOrderError
)