<template>
  <b-alert
    class="info-buy"
    :show="dismissCountDown"
    variant="light"
    @dismissed="dismissCountDown = 0"
    @dismiss-count-down="countDownChanged"
  >
    <span>Товар добавлен в корзину</span>
  </b-alert>
</template>

<script>
export default {
  name: "AlertAddItemCart",
  data() {
    return {
      dismissCountDown: 0,
    };
  },
  created() {
    this.$eventHub.$on("buyEvent", this.countDownChanged);
  },
  destroyed() {
    this.$eventHub.$off("buyEvent");
  },
  methods: {
    countDownChanged() {
      this.dismissCountDown = 2;
    },
  },
};
</script>

<style lang="scss" scoped>
.info-buy {
  position: absolute;
  bottom: -65px;
  right: 15%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  color: white;
  border: none;
  box-shadow: 0 4px 7px 1px rgba(0, 0, 0, 0.2);

  @include for-mobile {
    width: 250px;
    right: 50%;
    transform: translate(50%, 0);
  }
}
</style>
