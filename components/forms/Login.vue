<template>
  <b-modal id="modal-login" title="Личный кабинет">
    <template #default>
      <div class="d-flex container mb-4">
        <a href="/" class="mr-2">
          <b-img
            src="/dark-logo-vkusnopizza.svg"
            fluid
            alt="Fluid image"
          ></b-img>
        </a>
        <div class="logo-text text-left">
          <div class="title">PIZZABURG</div>
          <div class="sub-title">лучшая пицца - по лучшей цене</div>
        </div>
      </div>
      <b-container class="text-left">
        <form ref="form" @submit.stop.prevent="enter">
          <b-alert v-if="errorLogin" show variant="danger"
            ><small>{{ errorLogin }}</small></b-alert
          >
          <b-form-group label="Телефон" label-for="phone-input">
            <the-mask
              id="phone-input"
              v-model.trim="$v.login.phone.$model"
              class="form-control"
              :mask="['+7 (###) ###-##-##']"
              :masked="true"
              :class="{ 'is-invalid': $v.login.phone.$error }"
              required
            />
            <div v-if="$v.login.phone.$error">
              <div
                v-if="!$v.login.phone.required"
                class="small text-danger px-2"
              >
                Поле является обязательным
              </div>
              <div
                v-if="!$v.login.phone.minLength"
                class="small text-danger px-2"
              >
                Неполный номер
              </div>
            </div>
          </b-form-group>
          <b-form-group label="Пароль" label-for="password-input">
            <b-form-input
              id="password-input"
              v-model.trim="$v.login.password.$model"
              :type="'password'"
              :class="{ 'is-invalid': $v.login.password.$error }"
              autocomplete="on"
              required
            ></b-form-input>
            <div v-if="$v.login.password.$error">
              <div
                v-if="!$v.login.password.required"
                class="small text-danger px-2"
              >
                Поле является обязательным
              </div>
            </div>
          </b-form-group>
        </form>
      </b-container>
      <div class="sub-title text-center mt-3">
        У вас ещё нет аккаунта?
        <span
          class="btn-link-modal"
          @click="
            $bvModal.hide('modal-enter'), $bvModal.show('modal-registration')
          "
          >Зарегистрироваться</span
        >
      </div>
    </template>
    <template #modal-footer>
      <b-button size="md" variant="secondary" @click="enter">Войти</b-button>
    </template>
  </b-modal>
</template>

<script>
import { minLength, required } from "vuelidate/lib/validators";

export default {
  name: "Login",
  data() {
    return {
      login: {
        phone: "",
        password: "",
      },
      errorLogin: "",
    };
  },
  validations: {
    login: {
      phone: {
        required,
        minLength: minLength(18),
      },
      password: {
        required,
      },
    },
  },
  methods: {
    isValidLoginForm() {
      return (
        !this.$v.login.phone.$error &&
        this.$v.login.phone.$model != "" &&
        !this.$v.login.password.$error &&
        this.$v.login.password.$model != ""
      );
    },
    async enter() {
      if (!this.isValidLoginForm())
        return (this.errorLogin = "Заполните корректно форму");
      this.errorLogin = "";
      try {
        const res = await this.$http.post("login", {
          phone: this.$v.login.phone.$model.split(" ").join(""),
          password: this.$v.login.password.$model,
        });
        const data = await res.json();
        this.username = data.user;
        this.$store.commit("login", data);
        this.$bvModal.hide("modal-enter");
      } catch (err) {
        this.errorLogin = "Неверный телефон/пароль";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.logo-text {
  margin-right: 45px;

  @media (max-width: 768px) {
    margin-right: 0;
  }
}

.title {
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0.07em;
}

.sub-title {
  font-size: 9px;
  text-transform: uppercase;
}
</style>
