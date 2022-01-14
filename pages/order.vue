<template>
  <div class="container order mb-5">
    <div class="row">
      <div class="col col-12">
        <h2 class="order__title text-left">Оформление заказа</h2>
        <b-alert show variant="danger">
          Мы доставляем бесплатно только в зоне указанной на карте. Доставку в
          остальные районы вы можете заказать через Яндекс.Еда, Delivery,
          Broniboy, Антей Сервис. Приносим свои извинения за доставленные
          неудобства.
        </b-alert>
        <div v-if="!orderNumber" class="row order__content-wrapper col col-12">
          <div
            class="order__body-wrapper d-flex flex-column text-left col col-lg-8 col-md-7 col-sm-12"
          >
            <div class="order__body">
              <b-form-group>
                <b-form-radio-group
                  id="btn-radios-2"
                  v-model="isSelfService"
                  :options="options"
                  buttons
                  button-variant="outline-primary"
                  name="radio-btn-outline"
                ></b-form-radio-group>
              </b-form-group>

              <div>
                <div class="font-weight-semibold mb-2">
                  Контактная информация
                </div>
                <div class="order__body__input-wrapper mb-4">
                  <b-form-group
                    label-for="name"
                    invalid-feedback="Обязательное поле"
                  >
                    <b-form-input
                      id="name"
                      v-model.trim="$v.name.$model"
                      class="pt-3 pb-3 mb-2"
                      :class="{ 'is-invalid': $v.name.$error }"
                      placeholder="Введите имя"
                      autocomplete="off"
                    ></b-form-input>
                  </b-form-group>
                </div>
                <div class="order__body__input-wrapper mb-4">
                  <b-form-group
                    label-for="phone"
                    :invalid-feedback="
                      !$v.name.minLength || !$v.name.maxLength
                        ? 'Номер некорректный'
                        : 'Обязательное поле'
                    "
                  >
                    <b-form-input
                      id="phone"
                      v-model.trim="$v.phone.$model"
                      v-mask="'+7 (###) ###-##-##'"
                      class="pt-3 pb-3 mb-2"
                      type="tel"
                      :class="{ 'is-invalid': $v.phone.$error }"
                      placeholder="+7"
                      autocomplete="off"
                    ></b-form-input>
                  </b-form-group>
                </div>
              </div>

              <div v-show="!isSelfService">
                <div class="font-weight-semibold mb-2">Адрес доставки</div>
                <div class="order__body__input-wrapper mb-4">
                  <b-form-group
                    :state="streetState"
                    label-for="street"
                    invalid-feedback="Данная улица не найдена"
                  >
                    <b-form-input
                      id="street"
                      v-model.trim="$v.street.$model"
                      class="pt-3 pb-3 mb-2"
                      :class="{ 'is-invalid': $v.street.$error }"
                      placeholder="Введите улицу"
                      autocomplete="off"
                    ></b-form-input>
                  </b-form-group>
                  <div class="d-flex">
                    <b-form-input
                      v-model.trim="$v.home.$model"
                      class="pt-3 pb-3 mr-2"
                      :class="{ 'is-invalid': $v.home.$error }"
                      placeholder="Дом"
                    ></b-form-input>
                    <b-form-input
                      v-model.trim="entrance"
                      class="pt-3 pb-3 mr-2"
                      placeholder="Подъезд"
                    ></b-form-input>
                    <b-form-input
                      v-model.trim="apartment"
                      class="pt-3 pb-3"
                      placeholder="Квартира"
                    ></b-form-input>
                  </div>
                </div>
              </div>

              <div class="font-weight-semibold mb-2">Способ оплаты</div>
              <b-form-group>
                <b-form-radio
                  v-model="paymentType"
                  name="payment-radios"
                  value="CASH"
                  >Наличными</b-form-radio
                >
                <b-form-radio
                  v-model="paymentType"
                  name="payment-radios"
                  value="CARD"
                  >Картой онлайн</b-form-radio
                >
                <b-form-radio
                  v-model="paymentType"
                  name="payment-radios"
                  value="CARD1"
                  >Онлайн перевод при получении</b-form-radio
                >
              </b-form-group>

              <div class="font-weight-semibold mb-2">Зоны доставки</div>
              <div
                class="ymaps__wrapper"
                style="position: relative; overflow: hidden"
              >
                <a
                  href="https://yandex.ru/maps/35/krasnodar/?utm_medium=mapframe&utm_source=maps"
                  style="
                    color: #eee;
                    font-size: 12px;
                    position: absolute;
                    top: 0px;
                  "
                  >Краснодар</a
                ><a
                  href="https://yandex.ru/maps/35/krasnodar/?ll=39.031616%2C45.050482&mode=usermaps&source=constructorLink&um=constructor%3A90352660613978a51d72198028a7e513f012cbd87c62f2438a9682010d04db5a&utm_medium=mapframe&utm_source=maps&z=15"
                  style="
                    color: #eee;
                    font-size: 12px;
                    position: absolute;
                    top: 14px;
                  "
                  >Яндекс.Карты — транспорт, навигация, поиск мест</a
                >
                <iframe
                  class="ymaps__map"
                  src="https://yandex.ru/map-widget/v1/-/CCUyQFTvlC"
                  frameborder="1"
                  allowfullscreen="true"
                  style="position: relative"
                ></iframe>
              </div>
            </div>

            <div class="order__footer">
              <div class="mb-1">Доставка: {{ delivery }} ₽</div>
              <div class="mb-3">Итого: {{ totalSumCart }} ₽</div>
              <b-alert v-if="error" show class="error-alert" variant="danger"
                ><small>{{ error }}</small></b-alert
              >
              <div
                class="order__footer__btn-action d-flex px-3 py-2 mb-2"
                :class="[
                  loading
                    ? 'justify-content-center'
                    : 'justify-content-between',
                ]"
                @click="submit"
              >
                <b-spinner
                  v-if="loading"
                  style="width: 1.3rem; height: 1.3rem"
                  variant="light"
                  label="Spinning"
                ></b-spinner>
                <span v-if="!loading">Заказать</span>
                <span v-if="!loading">{{ totalSumCart }} ₽</span>
              </div>
              <div class="text-muted">
                *Нажимая кнопку 'Заказать' вы соглашаетесь с политикой
                конфиденциальности и публичной офертой
              </div>
            </div>
          </div>

          <div
            class="order__cart d-none d-md-block d-xl-block text-left col col-lg-4 col-md-5"
          >
            <div class="order__cart-title text-right mb-3">Корзина</div>
            <div class="order__cart-list">
              <client-only>
                <item-cart-sidebar
                  v-for="item in cart"
                  :key="item.key"
                  class="order__cart-list__item"
                  :item="item"
                >
                </item-cart-sidebar>
              </client-only>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import { mapActions, mapGetters } from "vuex";
import ItemCartSidebar from "@/components/sidebar/ItemCartSidebar";

export default {
  data() {
    return {
      showMap: false,
      error: null,
      successPayment: false,
      loading: false,
      streetState: true,
      options: [
        { text: "Доставка", value: false },
        { text: "Самовывоз", value: true },
      ],
    };
  },
  validations: {
    name: {
      required,
    },
    phone: {
      required,
      minLength: minLength(18),
      maxLength: maxLength(18),
    },
    home: {
      required,
    },
    street: {
      required,
    },
  },
  components: {
    ItemCartSidebar,
  },
  async mounted() {
    this.showMap = true;
    this.$nextTick(function () {
      $("#street").fias({
        type: $.fias.type.street,
        parentType: $.fias.type.city,
        parentId: 2300000100000,
        spinner: false,
        verify: true,
        select() {
          $("#street").val("");
        },
        check: (street) => {
          if (!street) return (this.streetState = false);
          this.street = street.name;
          this.streetState = true;
        },
        change: (street) => {
          this.street = street.name;
        },
      });
    });
  },
  computed: {
    ...mapGetters({
      user: "account/user",
      cart: "cart/cart",
      getName: "iiko/name",
      getPhone: "iiko/phone",
      getCity: "iiko/city",
      getHome: "iiko/home",
      getStreet: "iiko/street",
      delivery: "iiko/delivery",
      getEntrance: "iiko/entrance",
      getApartment: "iiko/apartment",
      getPaymentType: "iiko/paymentType",
      getIsSelfService: "iiko/isSelfService",
      orderNumber: "iiko/orderNumber",
      totalSumCart: "cart/totalSumCart",
    }),
    name: {
      get() {
        return this.getName;
      },
      set(value) {
        this.setName(value);
      },
    },
    phone: {
      get() {
        return this.getPhone;
      },
      set(value) {
        this.setPhone(value);
      },
    },
    home: {
      get() {
        return this.getHome;
      },
      set(value) {
        this.setHome(value);
      },
    },
    street: {
      get() {
        return this.getStreet;
      },
      set(value) {
        this.setStreet(value);
      },
    },
    entrance: {
      get() {
        return this.getEntrance;
      },
      set(value) {
        this.setEntrance(value);
      },
    },
    apartment: {
      get() {
        return this.getApartment;
      },
      set(value) {
        this.setApartment(value);
      },
    },
    paymentType: {
      get() {
        return this.getPaymentType;
      },
      set(value) {
        this.setPaymentType(value);
      },
    },
    isSelfService: {
      get() {
        return this.getIsSelfService;
      },
      set(value) {
        this.setIsSelfService(value);
      },
    },
    currentDate() {
      return new Date().toLocaleString();
    },
  },
  methods: {
    ...mapActions({
      setName: "iiko/SET_NAME",
      setPhone: "iiko/SET_PHONE",
      setHome: "iiko/SET_HOME",
      setStreet: "iiko/SET_STREET",
      setEntrance: "iiko/SET_ENTRANCE",
      setApartment: "iiko/SET_APARTMENT",
      setPaymentType: "iiko/SET_PAYMENT_TYPE",
      setIsSelfService: "iiko/SET_IS_SELF_SERVICE",
      checkPayment: "payment/checkPayment",
      sendMail: "iiko/sendMail",
      createOrder: "iiko/createOrder",
      createPayment: "payment/createPayment",
    }),
    isValidForm() {
      return (
        !this.$v.home.$error &&
        this.$v.home.$model != "" &&
        !this.$v.street.$error &&
        this.$v.street.$model != ""
      );
    },
    async submit() {
      // if (!this.user) return this.$bvModal.show('modal-code');

      if (!this.isValidForm()) {
        this.$v.street.$touch();
        this.$v.home.$touch();
        return;
      }

      this.loading = true;

      if (this.paymentType === "CARD") {
        const { data } = await this.createPayment();
        this.$strapi.$cookies.set("yandex_payment_id", data.id, {
          maxAge: 60 * 60 * 24,
        });
        console.log(data);
        window.location.href = data.confirmation.confirmation_url;
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 3000));

      await this.createOrder();

      await this.$router.push("/order-success");

      this.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.ymaps {
  &__wrapper {
    position: relative;
    overflow: hidden;
  }
  &__map {
    width: 100%;
    height: 400px;
  }
}
.order {
  display: block;
  padding: 25px;
  background-color: #f9f9f9;
  border-radius: 10px;
  min-height: 80vh;

  &__title {
    font-weight: 600;
    font-size: 2.1rem;
    margin-top: 10px;
    margin-bottom: 40px;
  }

  &__content-wrapper {
    min-height: 65vh;
    margin: auto;
    background-color: #fff;
    border-radius: 20px;
    padding: 20px;
    overflow: hidden;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.13);
  }

  &__body {
    flex-grow: 1;

    &__input-wrapper {
      max-width: 350px;
      min-width: 200px;

      input {
        height: auto;
        border-radius: 10px;

        &::placeholder {
          opacity: 0.3;
        }
      }
    }
  }

  &__footer {
    flex-grow: 0;

    .text-muted {
      font-size: 0.6rem;
      line-height: 1.5;
    }

    &__btn-action {
      color: white;
      background: $secondary-color;
      border-radius: 5px;
      cursor: pointer;
      max-width: 350px;
      min-width: 200px;

      @media (max-width: 576px) {
        font-size: 1rem;
        padding: 0.8rem 1rem !important;
      }

      &:hover {
        text-decoration: none;
      }

      &:active {
        background: darken($secondary-color, 10);
      }
    }

    .error-alert {
      max-width: 350px;
      min-width: 200px;
    }
  }

  &__cart {
    position: relative;
    border-left: 1.5px solid #e2e2e2;

    &-title {
      opacity: 0.7;
      font-size: 1.1rem;
      letter-spacing: 0.03em;
    }

    &-list {
      overflow-y: auto;
      overflow-x: hidden;
      padding: 0 10px;
      height: 100%;

      &__item {
        margin-left: auto;
      }
    }
  }
}
</style>
