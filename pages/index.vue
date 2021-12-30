<template>
  <div>
    <MainBanner />
<!--    <Bestsellers />-->
    <Categories />
    <Info />
  </div>
</template>
<script>
import Info from "@/components/info/index";
import Categories from "@/components/categories/index";
import MainBanner from "@/components/banner/MainBanner";
import Bestsellers from "@/components/bestsellers/index";

export default {
  data() {
    return {}
  },
  components: {
    Info,
    Categories,
    MainBanner,
    Bestsellers,
  },
  async mounted() {
    // await this.$strapi.login({ identifier: 'test@test.ru', password: '1q2w3e4R' })
    // console.log(await this.$strapi.find('clients', {id: '61ae5a3cea6e4b008eee9973'}))
    // console.log(await this.$axios.get(`${process.env.STRAPI_URL}/clients`))
    // console.log(await this.$axios.get(`${process.env.STRAPI_URL}/clients`))
    // console.log(await this.$axios('/api'))
    // this.$eventHub.$emit('error')
    // console.log(await this.$strapi.$clients.find({fields: 'name'}))
    // const res = await this.$strapi.find('clients', {name: 'Павел'})
    // console.log(res)
    // const userId = this.$strapi.$cookies.get('strapi_user')
    // if(!userId) return
    // this.$strapi.user = await this.$strapi.find('clients', {id: userId})
    // if (!res.length) return
    // this.$strapi.$cookies.set('strapi_user', res[0].id, {
    //   maxAge: 60 * 60 * 24
    // })
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
