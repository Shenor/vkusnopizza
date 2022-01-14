<template>
  <b-nav>
    <template v-if="window.width > 768">
      <b-nav-item
        v-for="item in menu"
        :key="item.key"
        :to="item.link"
        :class="item.class"
      >
        {{ item.title }}
      </b-nav-item>
    </template>
    <client-only v-else>
      <flicking
        class="slider-nav grabbing"
        :options="options"
        :tag="'div'"
        :viewport-tag="'div'"
      >
        <template v-for="item in mobileMenu">
          <div v-if="!item.class" :key="item.key" class="panel">
            <b-nav-item :to="item.link" :class="item.class">
              {{ item.title }}
            </b-nav-item>
          </div>
        </template>
      </flicking>
    </client-only>
  </b-nav>
</template>

<script>
import data from "@/store/menu.json";
export default {
  name: "Menu",
  data() {
    return {
      menu: data,
      options: {
        align: "prev",
        horizontal: true,
      },
      window: {
        width: 0,
      },
    };
  },
  computed: {
    mobileMenu() {
      return this.menu.filter((item) => !item.class);
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
      this.onResize();
    });
  },
  destroyed() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    onResize() {
      this.window.width = window.innerWidth;
    },
  },
};
</script>

<style lang="scss" scoped>
.slider-nav {
  position: relative;
  outline: none;
  width: 100%;
  overflow: hidden;
}
.nav-link {
  font-size: $font-size - 0.05;
  line-height: 17px;
  color: #212121;

  &:hover,
  &.active {
    color: $primary-color;
  }
}
</style>
