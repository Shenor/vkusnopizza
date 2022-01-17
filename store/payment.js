import { DateTime } from "luxon";

export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
  async createPayment({ rootGetters }) {
    const number = Math.floor(Math.random() * Math.floor(9999));
    const res = await this.$axios.post(`${process.env.SITE_URL}/api/payment`, {
      sum: rootGetters["cart/totalSumCart"],
      metadata: {
        number,
        return_url: window.location.origin + "/payment-status",
      },
    });
    const cartModify = rootGetters["cart/cart"].map((item) => {
      return {
        id: item.id,
        name: item.name,
        images: item.images,
        amount: item.count,
        code: item.code,
        sum: item.price,
      };
    });
    await this.$strapi.$orders.create({
      number,
      phone: rootGetters["iiko/phone"],
      name: rootGetters["iiko/name"],
      paymentType: rootGetters["iiko/paymentType"],
      isSelfService: rootGetters["iiko/isSelfService"],
      date: DateTime.now().toFormat("yyyy-LL-dd HH:mm:ss"),
      cart: cartModify,
      address: rootGetters["iiko/address"],
      yandex_payment_id: res.data.id,
      yandexPayment: res.data,
    });
    return res;
  },

  async checkPayment(_, payload) {
    try {
      return await this.$axios.$get(
        `${process.env.SITE_URL}/api/payment/${payload}`
      );
    } catch (e) {
      console.error(e);
    }
  },
};
