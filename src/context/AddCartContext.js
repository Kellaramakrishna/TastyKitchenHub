import React from 'react'

const AddCartContext = React.createContext({
  cartList: [],
  addToCart: () => {},
  incrementCart: () => {},
  decrementCart: () => {},
  deleteCart: () => {},
  removeCart: () => {},
})

export default AddCartContext
