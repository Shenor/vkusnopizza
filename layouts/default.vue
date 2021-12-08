<template>
  <div class="main">

    <!-- Header Site -->
    <Header></Header>

    <!-- Navigation Site -->
    <Navigation></Navigation>

     <!-- Content Site -->
          <Nuxt />

      <!-- Alerts -->
      <ErrorAlert />

      <!-- Footer Site -->
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/header/index'
import Footer from '@/components/Footer/Footer'
import Navigation from '@/components/Menu/Navigation'
import ErrorAlert from "@/components/elements/alerts/ErrorAlert";

export default {
  data() {
    return{}
  },
  components: {
    Header,
    Footer,
    Navigation,
    ErrorAlert
  }
}
</script>

<style lang="scss" scoped>

</style>
