<template>
  <b-modal id="modal-banners"  ref="modalBanner" centered size="lg">
    <b-col lg="10" md="10" offset="1" class="text-left align-self-start" v-if="item">
      <p class="title font-weight-semibold">{{item.title}}</p>
      <div v-html="$md.render(item.text)"></div>
    </b-col>
    <template v-slot:modal-footer="">
      <b-button size="md" variant="outline-primary" @click="$bvModal.hide('modal-banners')">Закрыть</b-button>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: "bannerModal.vue",
  data () {
    return {}
  },
  props: ['item']
}
</script>

<style lang="scss" scoped>
.title{
  font-size: $font-size + .2;
}
</style>
