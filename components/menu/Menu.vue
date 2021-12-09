<template>
  <b-nav>
    <template v-if="window.width > 768">
      <b-nav-item
        v-for="item in menu"
        :key="item.key"
        :to="item.link"
        :class="item.class">
          {{ item.title }}
      </b-nav-item>
    </template>
    <client-only v-else>
      <flicking
        class="slider-nav grabbing"
        :options="options"
        :tag="'div'"
        :viewportTag="'div'">
          <template v-for="item in mobileMenu">
            <div class="panel" v-if="!item.class" :key="item.key">
              <b-nav-item
                :to="item.link"
                :class="item.class">
                {{ item.title }}
              </b-nav-item>
            </div>
          </template>
      </flicking>
    </client-only>
  </b-nav>
</template>

<script>
import data from '@/store/menu.json';
export default {
  name: "Menu",
  data(){
    return {
      menu: data,
      // menu: [
      //   {link: '/#pizza', title: "Пицца"},
      //   {link: '/#combo', title: "Комбо"},
      //   {link: '/#drinks', title: "Напитки"},
      //   {link: '/#1', title: "Закуски"},
      //   {link: '/#2', title: "Салаты"},
      //   {link: '/#3', title: "Бургеры"},
      //   {link: '/#4', title: "Горячее"},
      //   {link: '/#5', title: "Паста"},
      //   {link: '/#6', title: "Десерты"},
      //   {link: '/stocks', title: "Акции", class: 'd-none d-md-flex d-xl-flex'},
      //   {link: '/contacts', title: "Контакты", class: 'd-none d-md-flex d-xl-flex'},
      //   {link: '/about', title: "О нас", class: 'd-none d-md-flex d-xl-flex'},
      // ],
      options: {
        align: "prev",
        horizontal: true,
      },
      window: {
        width: 0
      }
    }
  },
  mounted(){
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize)
      this.onResize()
    });
  },
  destroyed(){
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    onResize(){
      this.window.width = window.innerWidth
    }
  },
  computed: {
    mobileMenu() {
      return this.menu.filter(item => !item.class)
    }
  }
}
</script>

<style lang="scss" scoped>
.slider-nav{
  position: relative;
  outline: none;
  width: 100%;
  overflow: hidden;
}
.nav-link{
  font-size: $font-size - .05;
  line-height: 17px;
  color: #212121;

  &:hover,
  &.active{
     color: $primary-color;
   }
}
</style>
