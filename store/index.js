//TODO: Разделить стейт на отдельные файлы
export const state = () => ({
  user: '',
  authorization: false,
  token: ''
})

export const mutations = {
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
