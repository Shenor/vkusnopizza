<template>
  <div>
    <MainBanner />
    <Bestsellers />
    <DeliveryBanner />

    <b-container id="combo" class="main-title mb-4 justify-content-start">Комбо</b-container>
    <b-container class="main-content flex-wrap mb-4">
        <b-card
          :title="item.title"
          img-src="/combo.png"
          img-top
          align="left"
          tag="article"
          class="mb-5"
          v-for="item in combo"
          :key="item.key"
        >
          <b-card-text>
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </b-card-text>

          <div class="text-right">
            <b-button href="#" variant="outline-primary" class="ml-auto">Выбрать</b-button>
          </div>
        </b-card>
    </b-container>

    <b-container id="pizza" class="main-title mb-4 justify-content-start">Пицца</b-container>
    <b-container class="main-content flex-wrap mb-4">
        <b-card
          :title="item.title"
          img-src="/combo.png"
          img-top
          align="left"
          tag="article"
          class="mb-5"
          v-for="item in items"
          :key="item.key"
        >
          <b-card-text>
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </b-card-text>

          <div class="text-right">
            <b-button href="#" variant="outline-primary" class="ml-auto">Выбрать</b-button>
          </div>
        </b-card>
    </b-container>

    <b-container id="drinks" class="main-title mb-4 justify-content-start">Напитки</b-container>
      <b-container class="main-content flex-wrap mb-4">
        <b-card
          :title="item.name"
          :img-src="imageUrl(item)"
          img-top
          align="left"
          tag="article"
          class="mb-5"
          v-for="item in uploadData.drinksItems"
          :key="item.key"
        >
          <b-card-text>
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </b-card-text>

          <div class="text-right">
            <b-button href="#" variant="outline-primary" class="ml-auto" @click="add(item)">Выбрать</b-button>
          </div>
        </b-card>
    </b-container>

    <Info />
  </div>
</template>
<script>
import data from '@/store/data.json';
import Info from "@/components/info/index";
import MainBanner from "@/components/banner/MainBanner";
import Bestsellers from "@/components/bestsellers/index";
import DeliveryBanner from "@/components/banner/DeliveryBanner";
export default {
  data() {
    return {
      modalInfo:{
        selectedItem: null,
        groupModifiers: null,
        selectedModifiers: '',
        price: 0
      },
      loadCategoryID: {
        newsCategoryID: '7ba3f2a8-fa96-c6ad-0174-b5ba1356019a',
        comboCategoryID: '',
        drinksCategoryID: 'f07bedd4-fbfa-4203-0174-be6eb197baf5'
      },
      uploadData: {
        nomenclature: data.nomenclature,
        comboItems: null,
        drinksItems: data.nomenclature.products.filter(i => i.productCategoryId == 'f07bedd4-fbfa-4203-0174-be6eb197baf5'),
        newsItems: data.nomenclature.products.filter(i => i.productCategoryId == '7ba3f2a8-fa96-c6ad-0174-b5ba1356019a' && i.type == "dish")
      },
      items: [
        {id: 1, title: 'Пицца 4 сезона', price: '350'},
        {id: 2, title: 'Пицца 4 сыра', price: '250'},
        {id: 3, title: 'Пицца Аспромонте', price: '550'},
        {id: 4, title: 'Пицца Болоньезе', price: '650'},
        {id: 5, title: 'Пицца Вегетарианская', price: '250'},
        {id: 6, title: 'Пицца Фирменная', price: '450'},
      ],
      combo: [
        {id: 7, title: 'Комбо 3 в 1', price: '599'},
        {id: 8, title: 'Комбо на двоих', price: '599'},
        {id: 9, title: 'Комбо на компанию', price: '599'},
        {id: 10, title: 'Комбо максимум', price: '599'},
        {id: 11, title: 'Комбо медиум', price: '599'},
        {id: 12, title: 'Комбо лоу', price: '599'},
        {id: 13, title: 'Комбо экспресс', price: '599'},
        {id: 14, title: 'Комбо экспресс', price: '599'}
      ]
    }
  },
  components: {
    Info,
    MainBanner,
    Bestsellers,
    DeliveryBanner
  },
  mounted: function () {
    this.visibleSliders = true
    document.querySelector('.delivery').addEventListener('click', this.onCollapseDelivery)
  },
  destroyed(){
    document.querySelector('.delivery').addEventListener('click', this.onCollapseDelivery)
  },
  computed:{
    priceSelectedModifiers(){
      const {price} = this.modalInfo.groupModifiers.find(item => {
        return item.id == this.modalInfo.selectedModifiers
      })
      return price
    }
  },
  methods: {
    onCollapseDelivery(){
      document.querySelector('.delivery').classList.add('delivery--isActive')
    },
    imageUrl(item){
      return item.images[item.images.length - 1] ? item.images[item.images.length - 1].imageUrl : '/default.png'
    },
    showProductCard(payload){
      this.modalInfo.selectedItem = payload
      this.$bvModal.show('modal-product')
    },
    add(payload){
      if(payload){
        this.$eventHub.$emit('viewBuyMsg')
        this.$store.commit('addToCart', {...payload, count: 1})
        this.$bvModal.hide('modal-product')
        console.log(this.$store.getters.getCart)
      } else {
        const candidate = this.modalInfo.groupModifiers.find((item) => {
          if(item.id == this.modalInfo.selectedModifiers){
            const parent = this.uploadData.nomenclature.products.find((product) => {
              return product.groupModifiers[0].childModifiers.find(modify => {return modify.modifierId ==item.id})
            })
            item.images = parent.images
            return item
          }
        });
        this.$eventHub.$emit('viewBuyMsg')
        this.$store.commit('addToCart', {...candidate, count: 1})
        this.$bvModal.hide('modal-product')
        console.log(this.$store.getters.getCart)
      }
    },
    changeModifiers(){
      console.log('object')
    },
    async dataApi(){
      this.$http.setHeader('Organization')
      const nomenclature = await this.$http.$get()
      console.log(nomenclature)
      this.uploadData.nomenclature = nomenclature;
      this.uploadData.newsItems = nomenclature.products.filter(element => {
        return element.productCategoryId == this.loadCategoryID.newsCategoryID
        && element.type == "dish"
      });
      this.uploadData.drinksItems = nomenclature.products.filter(element => {
        return element.productCategoryId == this.loadCategoryID.drinksCategoryID
      });
    }
  }
}
</script>

<style lang="scss" scoped>

.main-content{
  justify-content: start;

  @media (max-width: 1199.98px) {
    justify-content: center;
  }

  .card{
    width: 18rem;
    height: 22rem;
    border: none;
    box-shadow: 0px 4px 7px 1px rgba(0, 0, 0, 0.2);

    @media (max-width: 767.98px) {
      margin-right: 0;
      width: 24rem;
      height: auto;
    }
    @media (min-width: 768px) and (max-width: 1199.98px) {
      margin-right: 5.5%;
    }

    @media (min-width: 1199.98px) {
      &:not(:nth-child(3n)){
        margin-right: 10.5%;
      }
    }

    &-img-top{
      max-width: 150px;
      margin: auto;
      transition: all .3s;
      cursor: pointer;

      &:hover{
        transform: translate(0, 5px);
      }
    }

    &-title{
      font-weight: 600;
      font-size: 1.1rem;
    }

    &-text{
      font-size: .9rem;
      font-weight: 300;
      min-height: 65px;
      overflow: hidden
    }
  }
}

.grabbing{
  cursor: grab;

  &:active{
    cursor: grabbing;
  }
}

.container{
  align-items: start;
}

.spinner{
  margin: 0 auto;
}
</style>
