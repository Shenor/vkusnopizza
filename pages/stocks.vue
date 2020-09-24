<template>
  <div class="container d-block main">
    <h2 class="stocks__title text-left pl-3">Акции</h2>
    <div class="stocks__content-wrapper">
      <div class="stocks__item"><b-img class="stocks__item-img" src="banner.jpg" fluid></b-img></div>
      <div class="stocks__item"><b-img class="stocks__item-img" src="banner-2.jpg" fluid></b-img></div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.main{
  min-height: 100vh;
}
.stocks__content-wrapper{
  width: 100%;
}

.stocks__title{
  color: $primary-color;
}

.stocks__item{
  position: relative;
  width: 100%;
  height: auto;
  margin-bottom: 35px;

   @media (max-width: 576px) {
     margin-bottom: 20px;
   }

  &-img{
    border-radius: 20px;
  }
}
</style>
