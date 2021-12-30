import {DateTime} from "luxon";

export const state = () => ({

})

export const getters = {

};

export const mutations = {

};

export const actions = {
  async createPayment({ rootGetters }) {
    const res = await this.$axios.post('/api/payment', {
        sum: rootGetters["cart/totalSumCart"],
        metadata: {
          return_url: window.location.href
        }
    })
    const cartModify = rootGetters['cart/cart'].map(item => {
      return {
        id: item.id,
        name: item.name,
        images: item.images,
        amount: item.count,
        code: item.code,
        sum: item.price
      }
    })
    await this.$strapi.$orders.create({
      number:  Math.floor(Math.random() * Math.floor(9999)),
      clients: rootGetters["account/user"].id,
      phone: rootGetters["account/user"].phone,
      name: rootGetters["account/user"].name,
      paymentType: rootGetters['iiko/paymentType'],
      isSelfService: rootGetters['iiko/isSelfService'],
      date: DateTime.now().toFormat('yyyy-LL-dd HH:mm:ss'),
      cart: cartModify,
      address: rootGetters["iiko/address"],
      yandex_payment_id: res.data.id,
      yandexPayment: res.data
    })
    return res;
    // return await this.$axios.post('/api/payment', {
    //   sum: rootGetters["cart/totalSumCart"],
    //   metadata: {
    //     return_url: window.location.href
    //   }
    // })
  },

  async checkPayment(_, payload){
    try {
      return await this.$axios.$get(`/api/payment/${payload}`)
    } catch (e) {
      console.error(e)
    }
  }
};

