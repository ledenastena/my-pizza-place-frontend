export const insertItemIntoCart = (cartItems, itemObj) => {
  const itemIndex = cartItems.findIndex(
    (cartItem) => cartItem.item._id === itemObj.item._id
  )

  if (itemIndex >= 0) {
    return cartItems.map((cartItem, index) =>
      index === itemIndex
        ? {
            item: itemObj.item,
            quantity: cartItem.quantity + itemObj.quantity,
          }
        : cartItem
    )
  }

  return [
    ...cartItems,
    {
      item: itemObj.item,
      quantity: itemObj.quantity,
    },
  ]
}

export const decreaseItemQuantity = (cartItems, { item, quantity }) => {
  if (quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.item._id !== item._id)
  }

  return cartItems.map((cartItem) =>
    cartItem.item._id === item._id
      ? {
          item,
          quantity: cartItem.quantity - 1,
        }
      : cartItem
  )
}
