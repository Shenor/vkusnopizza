<template>
  <b-modal id="modal-code" title="Вход на сайт" centered>
    <template v-slot:default>
      <div class="d-flex container mb-4">
        <b-img src="/pizzburg_logo.png" fluid alt="Fluid image"></b-img>
      </div>
      <b-container class="text-center" v-if="!isSendCode">
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
      <b-container class="text-center" v-else>
          <form ref="form" @submit.stop.prevent="">
            <b-form-group
              label="Проверочный код"
              label-for="phone-input">

              <the-mask
                @input="inputCode"
                class="form-control text-center"
                id="code-input"
                :class="{'is-invalid': error}"
                placeholder="_ _ _ _"
                :mask="['####']"
                :masked="true"
                v-model.trim="$v.code.$model"
                required />
            </b-form-group>
          </form>
      </b-container>
      <b-container>
        <b-alert
          show
          class="w-100"
          v-if="error"
          variant="danger">
          <small>
            {{error}}
          </small>
        </b-alert>
      </b-container>
    </template>
    <template v-slot:modal-footer>
      <b-button
        @click="sendCode"
        class="actionBtn rounded-pill pl-3 pr-3"
        :disabled="$v.phone.$invalid"
        :class="{'actionBtn--disable': $v.phone.$invalid}"
        size="md">
        {{isSendCode ? 'Получить новый код' : 'Выслать код'}}
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import { mapActions } from "vuex";
import {minLength, maxLength, required} from "vuelidate/lib/validators";

export default {
  name: "Code",
  data() {
    return {
      code: '',
      phone: '+7 ',
      error: '',
      isSendCode: false,
    }
  },
  validations: {
    phone: {
      required,
      minLength: minLength(18)
    },
    code: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(4),
    },
  },
  async mounted() {},
  methods: {
    ...mapActions({
      login: 'account/login',
      sendSMS: 'account/sendSMS'
    }),
    async inputCode(){
      if(this.$v.code.$invalid) return
      const phone = this.clearePhone;
      const code = this.code.replace(/ /g, '');
      if(sessionStorage.getItem('verification_code') === code){
        const res = await this.login(phone)
        this.$strapi.$cookies.set('strapi_user', res.id, {
          maxAge: 60 * 60 * 24
        })
        this.$bvModal.hide('modal-code')
      } else {
        this.error = 'Неверный проверочный код'
      }
    },
    async sendCode(){
      const phone = this.clearePhone;
      try {
       const res =  await this.sendSMS(phone)
        console.log(res)
      } catch (e) {
        this.$eventHub.$emit('error')
        this.error = 'Что-то пошло не так. Обратитесь по номеру'
      }
      this.isSendCode = true
    },
  },
  computed: {
    clearePhone(){
      return this.phone.replace(/-|\(|\)|\+| /g, '');
    }
  }
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
