<template>
  <div>
    <MainBanner />
    <Bestsellers />
    <DeliveryBanner />
    <Categories />
    <Info />
  </div>
</template>
<script>
import Info from "@/components/info/index";
import Categories from "@/components/categories/index";
import MainBanner from "@/components/banner/MainBanner";
import Bestsellers from "@/components/bestsellers/index";
import DeliveryBanner from "@/components/banner/DeliveryBanner";
export default {
  data() {
    return {}
  },
  components: {
    Info,
    Categories,
    MainBanner,
    Bestsellers,
    DeliveryBanner
  },
  methods: {
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

</style>
