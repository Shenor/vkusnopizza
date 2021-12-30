export const state = () => ({
  user: null
})

export const getters = {
 user: ({ user }) => user
}

export const mutations = {
  SET_USER(currentState, payload){
    currentState.user = payload;
  }
}

export const actions = {
  async setName({ state }, payload){
    await this.$strapi.$clients.update(state.user.id, {name: payload})
  },
  async setEmail({ state }, payload){
    await this.$strapi.$clients.update(state.user.id, {email: payload})
  },
  async sendSMS(_, payload){
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    sessionStorage.setItem('verification_code', code)
    try {
      return this.$axios.get(`/api/sms?phone=${payload}&code=${code}`)
    } catch (e) {
      console.error(e)
    }
  },
  async login({state, commit, dispatch}, payload){
    const res = await this.$strapi.find('clients', {phone: payload})
    if(!res.length) return dispatch('register', payload);
    commit('SET_USER', res[0])
    return res[0]
  },
  async logout({commit}){
    this.$strapi.$cookies.remove('strapi_user')
    commit('SET_USER', null)
  },
  async register({state, commit}, payload){
    const res = await this.$axios.post(`${process.env.STRAPI_URL}/clients`, {
      name: 'Гость',
      phone: payload
    }, {
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`
      }
    })
    commit('SET_USER', res.data)
    return res.data
  }
}


