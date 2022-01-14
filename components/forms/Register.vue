<template>
  <b-modal id="modal-registration" title="Регистрация">
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
          <div class="title">VKUSNOPIZZA</div>
          <div class="sub-title">лучшая пицца - по лучшей цене</div>
        </div>
      </div>
      <b-container class="text-left">
        <form ref="form" style="max-width: 236px" @submit.stop.prevent="enter">
          <b-alert v-if="error" show variant="danger"
            ><small>{{ error }}</small></b-alert
          >

          <b-form-group label-for="phone-input">
            <the-mask
              id="phone-input"
              v-model.trim="$v.registr.phone.$model"
              class="form-control"
              :mask="['+7 (###) ###-##-##']"
              :masked="true"
              :class="{ 'is-invalid': $v.registr.phone.$error }"
              placeholder="Телефон"
              required
            />
            <div v-if="$v.registr.phone.$error">
              <div
                v-if="!$v.registr.phone.required"
                class="small text-danger px-2"
              >
                Поле является обязательным
              </div>
              <div
                v-if="!$v.registr.phone.minLength"
                class="small text-danger px-2"
              >
                Неполный номер
              </div>
            </div>
          </b-form-group>
          <b-form-group label-for="name-input">
            <b-form-input
              id="name-input"
              v-model.trim="$v.registr.name.$model"
              :type="'text'"
              :class="{ 'is-invalid': $v.registr.name.$error }"
              placeholder="Имя"
              autocomplete="new-login"
              required
            ></b-form-input>
            <div v-if="$v.registr.name.$error">
              <div
                v-if="!$v.registr.name.required"
                class="small text-danger px-2"
              >
                Поле является обязательным
              </div>
              <div
                v-if="!$v.registr.name.minLength"
                class="small text-danger px-2"
              >
                Минимум {{ $v.registr.name.$params.minLength.min }} симвовла
              </div>
            </div>
          </b-form-group>
          <b-form-group label-for="password-input">
            <b-form-input
              id="password-input"
              v-model.trim="$v.registr.password.$model"
              :class="{ 'is-invalid': $v.registr.password.$error }"
              :type="'password'"
              autocomplete="new-password"
              placeholder="Пароль"
              required
            ></b-form-input>
            <div v-if="$v.registr.password.$error">
              <div
                v-if="!$v.registr.password.required"
                class="small text-danger px-2"
              >
                Поле является обязательным
              </div>
            </div>
          </b-form-group>
          <b-form-group label-for="email-input">
            <b-form-input
              id="email-input"
              v-model.trim="$v.registr.email.$model"
              :class="{ 'is-invalid': $v.registr.email.$error }"
              :type="'email'"
              autocomplete="new-password"
              placeholder="E-mail"
              required
            ></b-form-input>
            <div v-if="$v.registr.email.$error">
              <div
                v-if="!$v.registr.email.minLength"
                class="small text-danger px-2"
              >
                Минимум {{ $v.registr.email.$params.minLength.min }} символа
              </div>
            </div>
          </b-form-group>
          <b-form-group label-for="phone-input">
            <the-mask
              id="date-input"
              v-model.trim="$v.registr.date.$model"
              class="form-control"
              :class="{ 'is-invalid': $v.registr.date.$error }"
              :mask="['##/##/####']"
              :masked="true"
              placeholder="Дата рождения"
            />
            <div v-if="$v.registr.date.$error">
              <div
                v-if="!$v.registr.date.minLength"
                class="small text-danger px-2"
              >
                Неполная дата
              </div>
            </div>
          </b-form-group>
        </form>
      </b-container>
      <div class="sub-title text-center mt-3">
        Уже есть аккаунт?
        <span
          class="btn-link-modal"
          @click="
            $bvModal.hide('modal-registration'), $bvModal.show('modal-login')
          "
          >Войти</span
        >
      </div>
    </template>
    <template #modal-footer>
      <b-button variant="secondary" @click="registration"
        >Зарегистрироваться</b-button
      >
    </template>
  </b-modal>
</template>

<script>
import { minLength, required } from "vuelidate/lib/validators";

export default {
  name: "Register",
  data() {
    return {
      registr: {
        name: "",
        date: "",
        phone: "",
        email: "",
        password: "",
      },
    };
  },
  validations: {
    registr: {
      name: {
        required,
        minLength: minLength(3),
      },
      phone: {
        required,
        minLength: minLength(18),
      },
      password: {
        required,
      },
      date: {
        minLength: minLength(8),
      },
      email: {
        minLength: minLength(3),
      },
    },
  },
  methods: {
    isValidRegistrForm() {
      return (
        !this.$v.registr.name.$error &&
        this.$v.registr.name.$model != "" &&
        !this.$v.registr.phone.$error &&
        this.$v.registr.phone.$model != "" &&
        !this.$v.registr.password.$error &&
        this.$v.registr.password.$model != "" &&
        !this.$v.registr.email.$error &&
        !this.$v.registr.date.$error
      );
    },
    async registration() {
      if (!this.isValidRegistrForm())
        return (this.error = "Заполните корректно форму");
      this.error = "";
      try {
        const res = await this.$http.post("users", {
          name: this.$v.registr.name.$model,
          date: this.$v.registr.date.$model,
          email: this.$v.registr.email.$model,
          phone: this.$v.registr.phone.$model.split(" ").join(""),
          password: this.$v.registr.password.$model,
        });
        const data = await res.json();
        // this.$store.commit('login', data.token);
        this.$bvModal.hide("modal-registration");
        this.$bvModal.show("modal-enter");
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped></style>
