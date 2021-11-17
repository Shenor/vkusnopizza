export const state = () => ({
  cart: [],
})

export const getters = {
  cart: ({cart}) => cart,
  totalSumCart: ({cart}) => {
    return cart.reduce((sum, item) => {
      return sum + item.count * item.price;
    }, 0);
  },
  allItemsCart: ({cart}) => {
    return cart.reduce((sum, item) => {
      return sum + item.count;
    }, 0);
  }
}

export const mutations = {
  addToCart: ({cart}, payload) => {
    const candidate = cart.find(item => item.id === payload.id);
    candidate ? candidate.count++ : cart.push(payload);
  },
  deleteFromCart({cart}, payload) {
    const candidate = cart.find(item => item.id === payload.id);
    candidate.count <= 1
      ? cart = cart.filter(item => item.id !== payload.id)
      : candidate.count--
  },
  updateCartItem: ({cart}, payload) => {
    const candidate = cart.find(item => item.id === payload.id);
    candidate.count = +payload.count
  },
  clearCart: ({cart}) => cart = [],
}

export const actions = {

}


