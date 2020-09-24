
export const state = () => ({
  cart: [],
  user: '',
  authorization: false,
  token: ''
})

export const mutations = {
  addToCart(state, payload){
    const candidate = state.cart.find(item => {return item.id == payload.id});
    candidate ? candidate.count++ : state.cart.push(payload);
  },
  deleteFromCart(state, payload) {
    const candidate = state.cart.find(item => {return item.id == payload.id});
    candidate.count <= 1
    ? state.cart = state.cart.filter(item => {return item.id != payload.id})
    : candidate.count--
  },
  updateCartItem(state, payload) {
    const candidate = state.cart.find(item => {return item.id == payload.id});
    candidate.count = +payload.count
  },
  setToken(state, payload){
    state.token = payload
  },
  clearToken(state){
    state.token = ''
  },
  login(state, payload){
    this.commit('setToken', payload.token)
    state.user = payload.user
    state.authorization = true
  },
  logout(state){
    this.commit('clearToken')
    state.user = ''
    state.authorization = false;
  }
}

export const getters = {
  getCart(state){
    return state.cart
  },
  getTotalSumCart(state){
    return state.cart.reduce((sum, item) => {
      return sum + item.count * item.price;
    }, 0);
  },
  getItemCountAllCart(state) {
    return state.cart.reduce((sum, item) => {
      return sum + item.count;
    }, 0);
  },
  getToken(state){
    return state.token
  },
  getUser(state){
    return state.user
  },
  isAuthorization(state){
    return state.authorization
  }
}

