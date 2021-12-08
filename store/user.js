export const state = () => ({
  user: null
})

export const getters = {
 user: ({ user }) => user
}

export const mutations = {
  ['SET_USER'](currentState, payload){
    // console.log(currentState)
    currentState.user = payload;
  }
}

export const actions = {
  async sendSMS(_, payload){
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    sessionStorage.setItem('verification_code', code)
    try {
      return this.$axios.get(
          `${process.env.SMS_URL}
            ?api_id=${process.env.SMS_API_KEY}
            &to=${payload}
            &msg=${code} - ваш код для входа на сайт pizzburg.ru&json=1`)
    } catch (e) {
      console.error(e)
    }
  }
}


