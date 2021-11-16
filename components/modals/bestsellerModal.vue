<template>
  <b-modal id="modal-product" centered size="lg">
    <b-container class='wrapper-modal' v-if="item">
      <b-col lg="6" md="10">
        <b-img :src="imageUrl(item)" fluid alt="Responsive image"></b-img>
      </b-col>
      <b-col lg="6" md="10" class="text-left align-self-start">
        <p class="title font-weight-semibold">{{item.name}}</p>
        <b-form-group>
          <b-form-radio-group
            class="text-center"
            v-model="selectedModifiers"
            text-field="name"
            value-field="id"
            :options="modifiers"
            buttons
            button-variant="outline-primary"
            name="radio-btn-outline"
          ></b-form-radio-group>
        </b-form-group>
        <p>{{item.description}}</p>
      </b-col>
    </b-container>
    <template v-slot:modal-footer="">
      <b-button size="md" variant="outline-primary" @click="add(null)">
        Добавить в корзину - <b>{{priceSelectedModifiers}} ₽</b>
      </b-button>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: "bestsellerModal",
  props: ['item'],
  data(){
    return {
      groupModifiers: null,
      selectedModifiers: '',
      price: 0
    }
  },
  methods: {
    imageUrl(item){
      return item.images[item.images.length - 1]
        ? item.images[item.images.length - 1].imageUrl
        : '/default.png'
    },
  }
}
</script>

<style lang="scss" scoped>
#modal-product{
  .wrapper-modal{
    @media (max-width: 991px) {
      align-items: center;
      flex-direction: column;
      padding: 0;
    }
  }

  .modal-body{
    padding: 0;
  }

  .title{
    font-size: 1.2rem;
  }
}
</style>
