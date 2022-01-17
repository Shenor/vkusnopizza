<template>
  <div class="main">
    <!-- Header Site -->
    <Header></Header>

    <!-- Navigation Site -->
    <Navigation></Navigation>

    <!-- Content Site -->
    <Nuxt keep-alive />

    <!-- Alerts -->
    <ErrorAlert />

    <!-- Footer Site -->
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/header/index";
import Footer from "@/components/footer/Footer";
import Navigation from "@/components/menu/Navigation";
import ErrorAlert from "@/components/elements/alerts/ErrorAlert";

export default {
  components: {
    Header,
    Footer,
    Navigation,
    ErrorAlert,
  },
  data() {
    return {};
  },
  async mounted() {
    await this.$strapi.login({
      identifier: "test@test.ru",
      password: "1q2w3e4R",
    });
    // if (this.$strapi.$cookies.get("strapi_user")) {
    //   const id = this.$strapi.$cookies.get("strapi_user");
    //   try {
    //     await this.$strapi.login({
    //       identifier: "test@test.ru",
    //       password: "1q2w3e4R",
    //     });
    //     const res = await this.$strapi.find("clients", { id });
    //     if (!res.length) return;
    //     return this.$store.commit("account/SET_USER", res[0]);
    //   } catch (e) {
    //     console.error(e);
    //   }
    // }
    // this.$store.commit("account/SET_USER", null);
  },
};
</script>

<style lang="scss" scoped></style>
