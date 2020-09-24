<template>
  <div class="main">

    <!-- Header Site -->
    <Header></Header>

    <!-- Navigation Site -->
    <Navigation></Navigation>

     <!-- Content Site -->
          <Nuxt />

      <!-- Footer Site -->
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Menu/Header'
import Footer from '@/components/Footer/Footer'
import Navigation from '@/components/Menu/Navigation'
export default {
  data() {
    return{}
  },
  components: {
    Header,
    Footer,
    Navigation
  }
}
</script>

<style lang="scss" scoped>

</style>
