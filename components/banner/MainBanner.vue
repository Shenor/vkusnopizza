<template>
  <div>
    <div class="slider-wrapper mb-1">
      <i class="slider-shadow slider-shadow-right d-none d-md-flex d-xl-flex"></i>
      <i class="slider-shadow slider-shadow-left d-none d-md-flex d-xl-flex"></i>
      <client-only>
        <flicking
          ref="mainSlider"
          :style="heightMainSlider"
          class="main-slider grabbing"
          :options="options"
          :tag="'div'"
          :viewportTag="'div'">
          <div class="panel"><b-img class="panel-img" src="/banner.jpg" fluid alt="Fluid image" ondragstart="return false"></b-img></div>
          <div class="panel"><b-img class="panel-img" src="/banner.jpg" fluid alt="Fluid image" ondragstart="return false"></b-img></div>
          <div class="panel"><b-img class="panel-img" src="/banner.jpg" fluid alt="Fluid image" ondragstart="return false"></b-img></div>
        </flicking>

        <div class="text-center" slot="placeholder">
          <b-spinner class="spinner" variant="success" label="Spinning"></b-spinner>
        </div>
      </client-only>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainBanner",
  data() {
    return {
      height: 380,
      options: {
        position: 330,
        gap: 30,
        zIndex: 1,
        defaultIndex: 0,
        hanger:"50%",
        moveType: 'snap',
        useOffset: true,
        autoResize: true,
        adaptive: true,
        circular: true,
      }
    }
  },
  mounted() {
    this.$nextTick(function () {
      this.onResize();
    })
    window.addEventListener('resize', this.onResize)
  },
  destroyed() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    onResize() {
      if(document.documentElement.clientWidth > 768){
        this.height = document.documentElement.clientWidth * 0.22;
      } else if (document.documentElement.clientWidth < 768 && document.documentElement.clientWidth > 576){
        this.options.anchor = '300px'
        this.height = document.documentElement.clientWidth * 0.28;
      } else if(document.documentElement.clientWidth < 576){
        this.height = document.documentElement.clientWidth * 0.34;
      }
    }
  },
  computed: {
    heightMainSlider(){
      return `height: ${this.height}px`;
    }
  }
}
</script>

<style lang="scss" scoped>
.grabbing{
  cursor: grab;

  &:active{
    cursor: grabbing;
  }
}

.slider-wrapper{
  position: relative;
  overflow: hidden;

  .slider-shadow{
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 20%;
    z-index: 2;
    padding: 9px 53.3333px 20px;
    pointer-events: none;
  }

  .slider-shadow-right{
    background-image: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 100%);
    right: 0;
  }

  .slider-shadow-left{
    background-image: linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 100%);
    left: 0;
  }
}

.main-slider{
  position: relative;
  outline: none;

  .panel{
    width: 60%;

    @media (max-width: 576px) {
      width: 95%;
    }

    @media (min-width: 576px) and (max-width: 767.98px) {
      width: 80%;
    }

    &-img{
      border-radius: 20px;

      @media (max-width: 576px) {
        border-radius: 10px;
      }
    }
  }
}
</style>
