<template>
  <b-alert
    class="error-alert"
    :show="dismissCountDown"
    variant="danger"
    @dismissed="dismissCountDown=0"
    @dismiss-count-down="countDownChanged"
  >
    <span>{{text || 'Что-то пошло не так'}}</span>
  </b-alert>
</template>

<script>
export default {
  name: "ErrorAlert",
  data() {
    return {
      text: '',
      dismissCountDown: 0,
    }
  },
  methods: {
    countDownChanged() {
      this.dismissCountDown = 3
    },
  },
  created(){
    this.$eventHub.$on('error', (payload) => {
      this.text = payload
      this.countDownChanged()
    })
  },
  destroyed(){
    this.$eventHub.$off('error')
  },
}
</script>

<style lang="scss" scoped>
.error-alert{
  position: fixed;
  top: 8%;
  right: 10%;
  z-index: 1000;
  border: none;
  box-shadow: 0 4px 7px 1px rgba(0, 0, 0, 0.2);

  @include for-mobile {
    width: 240px;
    right: 50%;
    transform: translate(50%, 0)
  }
}
</style>
