const base_api = 'https://iiko.biz:9900/api/0';

export const state = () => ({})

export const getters = {};

export const mutations = {};

export const actions = {
  async getToken() {
    try {
      const { data } = await this.$axios.get(
        `${base_api}/auth/access_token?user_id=${process.env.LOGIN_IIKO_BIZ}&user_secret=${process.env.PASSWORD_IIKO_BIZ}`
      );
      return data
    } catch (e) {
      console.error(e)
    }
  },

  async getNomenclature({ dispatch }){
    try {
      const token = await dispatch('getToken');
      const { data } = await this.$axios.get(`${base_api}/nomenclature/${process.env.ORHANIZATION_ID}?access_token=${token}&revision=0`)
      return data;
    } catch (e) {
      console.error(e)
    }
  },

  async createOrder({ rootState, dispatch }, payload){
    const cart = rootState.cart.cart.map(item => {
      return {
        id: item.id,
        name: item.name,
        amount: item.count,
        code: item.code,
        sum: item.price
      }
    })
    const order = {
      organization: process.env.ORHANIZATION_ID,
      customer: {
        name: "Петя",
        phone: "+79998887766"
      },
      order: {
        id: "d8195714-b901-5fb2-ed89-e94233ba5497",
        date: "2019-05-16 13:49:00",
        phone: "+79998887766",
        isSelfService: "false",
        items: cart,
        address: payload.address,
      }
    }

    try {
      const token = await dispatch('getToken');
      const data = await this.$axios.$post(`https://iiko.biz:9900/api/0/orders/add?access_token=${token}`, {...order})
      console.log(data)
      return data
    } catch (e) {
      console.error(e.message)
    }
  }
};

