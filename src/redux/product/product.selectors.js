import { createSelector } from 'reselect'

const selectProduct = (state) => state.product

export const selectItems = createSelector(
  [selectProduct],
  (product) => product.items
)

export const selectIsFetching = createSelector(
  [selectProduct],
  (product) => product.isFetching
)

export const selectProductErrorMessage = createSelector(
  [selectProduct],
  (product) => product.errorMessage
)

export const selectCurrentlyShowingProducts = createSelector(
  [selectProduct],
  (product) => product.currentlyShowingProducts
)

export const selectFetchedProductsType = createSelector(
  [selectProduct],
  (product) => product.fetchedProductsType
)

export const selectAvailableProductTypes = createSelector(
  [selectProduct],
  (product) => product.availableProductTypes
)

export const selectIsProductTypesFetching = createSelector(
  [selectProduct],
  (product) => product.isProductTypesFetching
)

export const selectErrorProductTypesMessage = createSelector(
  [selectProduct],
  (product) => product.errorProductTypesMessage
)

export const selectEditingProduct = createSelector(
  [selectProduct],
  (product) => product.editingProduct
)

export const selectEditingError = createSelector(
  [selectProduct],
  (product) => product.editingError
)

export const selectAddingProduct = createSelector(
  [selectProduct],
  (product) => product.addingProduct
)

export const selectAddingError = createSelector(
  [selectProduct],
  (product) => product.addingError
)

export const selectDeletingProduct = createSelector(
  [selectProduct],
  (product) => product.deletingProduct
)

export const selectDeletingError = createSelector(
  [selectProduct],
  (product) => product.deletingError
)

export const selectSelectedCurrency = createSelector(
  [selectProduct],
  (product) => product.selectedCurrency
)
