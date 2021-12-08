<template>
  <b-nav>
    <b-nav-item to="/#pizza">Пицца</b-nav-item>
    <b-nav-item to="/#combo">Комбо</b-nav-item>
<!--    <b-nav-item to="/#combo">Ролы</b-nav-item>-->
    <!--    <b-nav-item to="/#combo">Закуски</b-nav-item>-->
    <!--    <b-nav-item to="/#combo">Салаты</b-nav-item>-->
    <!--    <b-nav-item to="/#combo">Бургеры</b-nav-item>-->
    <!--    <b-nav-item to="/#combo">Горячее</b-nav-item>-->
    <!--    <b-nav-item to="/#combo">Паста</b-nav-item>-->
    <!--    <b-nav-item to="/#combo">Десерты</b-nav-item>-->
    <b-nav-item to="/#drinks">Напитки</b-nav-item>
    <b-nav-item to="/stocks" class="d-none d-md-flex d-xl-flex">Акции</b-nav-item>
    <b-nav-item to="/contacts" class="d-none d-md-flex d-xl-flex">Контакты</b-nav-item>
    <b-nav-item to="/about" class="d-none d-md-flex d-xl-flex">О нас</b-nav-item>
<!--    <flicking-->
<!--      class="slider-news grabbing d-md-none d-xl-none"-->
<!--      :options="options"-->
<!--      :tag="'div'"-->
<!--      :viewportTag="'div'">-->
<!--        -->
<!--    </flicking>-->
  </b-nav>
</template>

<script>
export default {
  name: "Menu",
  data(){
    return {
      options: {
        align: "prev",
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-link{
  line-height: 17px;
  color: #212121;

  &:hover,
  &.active{
     color: $primary-color;
   }
}
</style>
