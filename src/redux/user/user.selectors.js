import { createStore } from 'redux'
import { createSelector } from 'reselect'

const selectUser = state => state.user

export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser
)

export const selectCurrentUserType = createSelector(
  [selectUser],
  user => user.currentUserType
)

export const selectFetchingUserData = createSelector(
  [selectUser],
  user => user.fetchingUserData
)

export const selectUserErrorMessage = createSelector(
  [selectUser],
  user => user.errorMessage
)

export const selectAuthToken = createSelector(
  [selectUser],
  user => user.authToken
)

export const selectEditingUser = createSelector(
  [selectUser],
  user => user.editingUser
)
export const selectEditingError = createSelector(
  [selectUser],
  user => user.editingError
)