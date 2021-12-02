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
  add: ({cart}, payload) => {
    const candidate = cart.find(item => item.id === payload.id);
    candidate ? candidate.count++ : cart.push({...payload, count: 1});
  },
  del({cart}, payload) {
    const candidate = cart.find(item => item.id === payload.id);
    const index = cart.findIndex(item => item.id === payload.id)

    candidate.count <= 1
      ? cart.splice(index, 1)
      : candidate.count--
  },
  updateItem: ({cart}, payload) => {
    const candidate = cart.find(item => item.id === payload.id);
    candidate.count = +payload.count
  },
  clear: ({cart}) => cart = [],
}

export const actions = {

}


