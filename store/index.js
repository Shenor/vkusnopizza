export const actions = {
  async nuxtServerInit({commit}, {app}){
    if (app.$strapi.$cookies.get('strapi_user')) {
      const id = app.$strapi.$cookies.get('strapi_user');
      try {
        const res = await app.$strapi.find('clients', {id: id})
        if (!res.length) return
        return  commit('user/SET_USER', res[0])
      } catch (e) {
        console.error(e)
      }
    }
    commit('user/SET_USER', null)
  }
}
