import { createSlice } from '@reduxjs/toolkit'

const sampleData = [
  {
    id: '1',
    name: 'Test 1',
    price: 300,
    description: 'Desc 1',
    qty: 1,
  },
  { id: '2', name: 'Test 2', price: 200, description: 'Desc 2', qty: 1 },
  { id: '3', name: 'Test 3', price: 200, description: 'Desc 3', qty: 1 },
]

const initialState = {
  // cart:
  //   typeof window !== 'undefined' && localStorage.getItem('cart')
  //     ? JSON.parse(localStorage.getItem('cart'))
  //     : [],
  cart: [
    {
      id: '1',
      name: 'Test 1',
      price: 300,
      description: 'Desc 1',
      qty: 1,
    },
    { id: '2', name: 'Test 2', price: 200, description: 'Desc 2', qty: 1 },
    { id: '3', name: 'Test 3', price: 200, description: 'Desc 3', qty: 1 },
  ],
  cartTotalAmonut: 0,
  cartTotalQuantity: 0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const itemId = state.cart.findIndex((item) => item.id === payload.id)

      if (itemId >= 0) {
        state.cart[itemId].qty += 1
      } else {
        const newItem = { ...payload, qty: 1 }
        state.cart.push(newItem)
      }

      if (typeof window !== undefined) {
        localStorage.setItem('cart', JSON.stringify(state.cart))
      }
    },
    removeFromCart: (state, { payload }) => {
      const newCart = state.cart.filter((item) => item.id !== payload.id)
      state.cart = newCart

      if (typeof window !== undefined) {
        localStorage.setItem('cart', JSON.stringify(state.cart))
      }
    },
    decreaseQty: (state, { payload }) => {
      const itemId = state.cart.findIndex((item) => item.id === payload.id)

      if (state.cart[itemId].qty > 1) {
        state.cart[itemId].qty -= 1
      } else if (state.cart[itemId].qty === 1) {
        const newCart = state.cart.filter((item) => item.id !== payload.id)

        state.cart = newCart
      }

      if (typeof window !== undefined) {
        localStorage.setItem('cart', JSON.stringify(state.cart))
      }
    },
    getTotal: (state) => {
      let { quantity, total } = state.cart.reduce(
        (cartTotal, cartItem) => {
          const { qty, price } = cartItem

          const itemTotal = qty * price

          cartTotal.total += itemTotal
          cartTotal.quantity += qty

          return cartTotal
        },
        {
          quantity: 0,
          total: 0,
        }
      )

      state.cartTotalAmonut = total
      state.cartTotalQuantity = quantity
    },
    resetCart: (state) => {
      state.cart = []
      if (typeof window !== undefined) {
        localStorage.setItem('cart', state.cart)
      }
      state.cartTotalAmonut = 0
      state.cartTotalQuantity = 0
    },
  },
})

export const { addToCart, removeFromCart, decreaseQty, getTotal, resetCart } =
  cartSlice.actions
export default cartSlice.reducer
