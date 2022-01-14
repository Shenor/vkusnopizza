import { DateTime } from "luxon";
const base_api = "https://iiko.biz:9900/api/0";

export const state = () => ({
  orderNumber: null,
  paymentType: "CASH",
  isSelfService: false,
  delivery: 0,
  name: "",
  phone: "",
  address: {
    city: "Краснодар",
    street: "",
    home: "",
    entrance: "",
    apartment: "",
  },
});

export const getters = {
  name: ({ name }) => name,
  phone: ({ phone }) => phone,
  address: ({ address }) => address,
  city: ({ address }) => address.city,
  street: ({ address }) => address.street,
  home: ({ address }) => address.home,
  entrance: ({ address }) => address.entrance,
  delivery: ({ delivery }) => delivery,
  apartment: ({ address }) => address.apartment,
  orderNumber: ({ orderNumber }) => orderNumber,
  paymentType: ({ paymentType }) => paymentType,
  isSelfService: ({ isSelfService }) => isSelfService,
};

export const mutations = {
  SET_NAME(state, payload) {
    state.name = payload;
  },
  SET_PHONE(state, payload) {
    state.phone = payload;
  },
  SET_ADDRESS(state, payload) {
    state.address = payload;
  },
  SET_HOME(state, payload) {
    state.address.home = payload;
  },
  SET_STREET(state, payload) {
    state.address.street = payload;
  },
  SET_ENTRANCE(state, payload) {
    state.address.entrance = payload;
  },
  SET_APARTMENT(state, payload) {
    state.address.apartment = payload;
  },
  SET_PAYMENT_TYPE(state, payload) {
    state.paymentType = payload;
  },
  SET_ORDER_NUMBER(state, payload) {
    state.orderNumber = payload;
  },
  SET_IS_SELF_SERVICE(state, payload) {
    state.isSelfService = payload;
  },
};

export const actions = {
  SET_NAME({ commit }, payload) {
    commit("SET_NAME", payload);
  },
  SET_PHONE({ commit }, payload) {
    commit("SET_PHONE", payload);
  },
  SET_ADDRESS({ commit }, payload) {
    commit("SET_ADDRESS", payload);
  },
  SET_HOME({ commit }, payload) {
    commit("SET_HOME", payload);
  },
  SET_STREET({ commit }, payload) {
    commit("SET_STREET", payload);
  },
  SET_ENTRANCE({ commit }, payload) {
    commit("SET_ENTRANCE", payload);
  },
  SET_APARTMENT({ commit }, payload) {
    commit("SET_APARTMENT", payload);
  },
  SET_PAYMENT_TYPE({ commit }, payload) {
    commit("SET_PAYMENT_TYPE", payload);
  },
  SET_ORDER_NUMBER({ commit }, payload) {
    commit("SET_ORDER_NUMBER", payload);
  },
  SET_IS_SELF_SERVICE({ commit }, payload) {
    commit("SET_IS_SELF_SERVICE", payload);
  },
  async getToken() {
    try {
      const { data } = await this.$axios.get(
        `${base_api}/auth/access_token?user_id=${process.env.LOGIN_IIKO_BIZ}&user_secret=${process.env.PASSWORD_IIKO_BIZ}`
      );
      return data;
    } catch (e) {
      console.error(e);
    }
  },

  async getNomenclature({ dispatch }) {
    try {
      const token = await dispatch("getToken");
      const { data } = await this.$axios.get(
        `${base_api}/nomenclature/${process.env.ORHANIZATION_ID}?access_token=${token}&revision=0`
      );
      return data;
    } catch (e) {
      console.error(e);
    }
  },

  async createOrder({ state, rootState, dispatch }, payload) {
    const number =
      payload?.number || Math.floor(Math.random() * Math.floor(9999));
    const cart = rootState.cart.cart.map((item) => {
      return {
        id: item.id,
        name: item.name,
        images: item.images,
        amount: item.count,
        code: item.code,
        sum: item.price,
      };
    });
    const order = {
      organization: process.env.ORHANIZATION_ID,
      customer: {
        name: rootState.account.user.name,
        phone: "+" + rootState.account.user.phone,
      },
      order: {
        date: DateTime.now().toFormat("yyyy-LL-dd HH:mm:ss"),
        phone: "+" + rootState.account.user.phone,
        isSelfService: state.isSelfService,
        items: cart,
        address: state.isSelfService
          ? null
          : {
              ...state.address,
            },
      },
    };

    dispatch("SET_ORDER_NUMBER", number);
    await dispatch("sendMail", order);
    if (state.paymentType !== "CARD") {
      await dispatch("addToHistory", order);
    }

    dispatch("cart/CLEAR", null, { root: true });

    try {
      const token = await dispatch("getToken");
      const data = await this.$axios.$post(
        `https://iiko.biz:9900/api/0/orders/add?access_token=${token}`,
        { ...order }
      );
      console.log(data);
      return data;
    } catch (e) {
      console.error(e);
    }
  },

  sendMail({ state, rootGetters }, payload) {
    try {
      return this.$axios.post(`${process.env.SITE_URL}/api/mail`, {
        data: {
          number: state.orderNumber,
          totalSum: rootGetters["cart/totalSumCart"],
          ...payload,
        },
      });
    } catch (e) {
      console.error(e);
    }
  },

  async addToHistory({ state, rootGetters }, payload) {
    await this.$strapi.$orders.create({
      number: state.orderNumber,
      clients: rootGetters["account/user"].id,
      phone: rootGetters["account/user"].phone,
      paymentType: state.paymentType,
      name: payload.customer.name,
      date: payload.order.date,
      cart: payload.order.items,
      address: payload.order.address,
      isSelfService: state.isSelfService,
    });
  },
};
