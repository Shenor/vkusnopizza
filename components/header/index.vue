<template>
  <b-container>
    <HeaderDesktop />
    <HeaderMobile />
  </b-container>
</template>

<script>
import HeaderMobile from "./HeaderMobile";
import HeaderDesktop from "./HeaderDesktop";
export default {
  components: {
    HeaderMobile,
    HeaderDesktop,
  },
};
</script>

<style lang="scss" scoped>
//.menu{
//.btn-enter{
//  padding: 4px 16px;
//  color: $black-color;
//  border: 1px solid$black-color;
//  font-size: 12px;
//  max-height: 30px;
//
//  &:hover,
//  &:not(:disabled):not(.disabled):active,
//  &:not(:disabled):not(.disabled):active:focus {
//    border-color: $primary-color;
//    box-shadow: none;
//    color: $primary-color;
//    background-color: transparent;
//  }
//
//  &:focus,
//  &:active{
//    box-shadow: none;
//  }
//}
//}
</style>
