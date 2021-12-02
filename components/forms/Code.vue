<template>
  <b-modal id="modal-code" title="Вход на сайт" centered>
    <template v-slot:default>
      <div class="d-flex container mb-4">
        <a href="/" class="mr-2">
          <b-img src="/dark-logo-vkusnopizza.svg" fluid alt="Fluid image"></b-img>
        </a>
        <div class="logo-text text-left">
          <div class="title">PIZZABURG</div>
          <div class="sub-title">лучшая пицца - по лучшей цене</div>
        </div>
      </div>
      <b-container class="text-left">
        <form ref="form" @submit.stop.prevent="">
          <b-form-group
            label="Номер телефона"
            label-for="phone-input">

            <the-mask
              class="form-control"
              id="phone-input"
              :mask="['+7 (###) ###-##-##']"
              :masked="true"
              v-model.trim="$v.phone.$model"
              required />
          </b-form-group>
        </form>
      </b-container>
    </template>
    <template v-slot:modal-footer>
      <b-button
        class="actionBtn rounded-pill pl-3 pr-3"
        :disabled="$v.phone.$invalid"
        :class="{'actionBtn--disable': $v.phone.$invalid}"
        size="md">
        Выслать код
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import {minLength, required} from "vuelidate/lib/validators";

export default {
  name: "Code",
  data() {
    return {
      phone: '+7 ',
      error: '',
    }
  },
  validations: {
    phone: {
      required,
      minLength: minLength(18)
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep{
  #modal-code{
    .modal-content {
      top: -100px
    }
  }
}
.logo-text{
  margin-right: 45px;

  @media (max-width: 768px) {
    margin-right: 0;
  }
}

.title{
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0.07em;
}

.sub-title{
  font-size: 9px;
  text-transform: uppercase;
}

.actionBtn{
  border-radius: 10px;

  &--disable{
    &:hover{
      background-color: #6c757d;
      border-color: #6c757d;
      cursor: not-allowed;
    }
  }
}
</style>
