<template>
  <div>
      <client-only>
        <div class="container">
        <Flicking  class="main-slider" :options="options">
          <div class="panel">
              <b-img class="panel-img" src="/banner_3.jpg" fluid alt="Fluid image" ondragstart="return false"></b-img>
          </div>
          <div class="panel">
              <b-img class="panel-img" src="/banner_3.jpg" fluid alt="Fluid image" ondragstart="return false"></b-img>
          </div>
          <div class="panel">
            <b-img class="panel-img" src="/banner_3.jpg" fluid alt="Fluid image" ondragstart="return false"></b-img>
          </div>
          <div class="panel">
            <b-img class="panel-img" src="/banner_4.jpg" fluid alt="Fluid image" ondragstart="return false"></b-img>
          </div>
          <div class="panel">
            <b-img class="panel-img" src="/banner_4.jpg" fluid alt="Fluid image" ondragstart="return false"></b-img>
          </div>
        </Flicking >
        </div>

        <div class="text-center" slot="placeholder">
          <b-spinner class="spinner" variant="success" label="Spinning"></b-spinner>
        </div>
      </client-only>
    </div>
</template>

<script>
export default {
  name: "MainBanner",
  data() {
    return {
      options: {
        align: "prev",
        bound: true,
        horizontal: true,
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main-slider{
  position: relative;
  outline: none;
  width: 100%;
  overflow: hidden;

  .panel{
    width: 200px;
    height: 250px;
    cursor: pointer;

    &:not(:last-child) {
      margin-right: 25px;
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
