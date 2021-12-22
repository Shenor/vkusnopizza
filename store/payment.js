export const state = () => ({

})

export const getters = {};

export const mutations = {};

export const actions = {
  async createPayment(_, { sum, metadata }) {
    return await this.$axios.post('/api/payment', {
      sum,
      metadata
    })
  }
};

