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
  delete({cart}, payload) {
    const candidate = cart.find(item => item.id === payload.id);
    candidate.count <= 1
      ? cart = cart.filter(item => item.id !== payload.id)
      : candidate.count--
  },
  updatItem: ({cart}, payload) => {
    const candidate = cart.find(item => item.id === payload.id);
    candidate.count = +payload.count
  },
  clear: ({cart}) => cart = [],
}

export const actions = {

}


