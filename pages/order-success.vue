<template>
  <div class="container order-success mb-5">
    <div class="order-success__content-wrappe mt-5">
      <div class="order-success__title">Спасибо за заказ!</div>
      <div>Ваш заказ принят в обработку</div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 80 80"
        class="pt-5 pb-5"
        style="max-width: 150px"
      >
        <path
          fill="#bae0bd"
          d="M40,77.5C19.3,77.5,2.5,60.7,2.5,40S19.3,2.5,40,2.5S77.5,19.3,77.5,40S60.7,77.5,40,77.5z"
        />
        <path
          fill="#5e9c76"
          d="M40,3c20.4,0,37,16.6,37,37S60.4,77,40,77S3,60.4,3,40S19.6,3,40,3 M40,2C19,2,2,19,2,40s17,38,38,38 s38-17,38-38S61,2,40,2L40,2z"
        />
        <path
          fill="#fff"
          d="M34 56L20.2 42.2 24.5 38 34 47.6 58.2 23.4 62.5 27.6z"
        />
      </svg>
      <div class="" style="max-width: 70%; margin: 0 auto">
        <div class="order-success__details mt-3 mb-3">
          Номер заказа: {{ number }}
          <br />
          Время заказа: {{ date }}
        </div>
        <div>
          В ближайшее время с вами свяжутся для уточнения деталей и
          подтверждения заказа
        </div>
        <div>
          Если после оплаты заказа у Вас вознили технические проблемы или Вы
          обнаружили ошибку (ФИО/адрес/номер и д.р), обратитесь по номеру
          <b-link :href="'tel:' + $config.CALL_CENTER_TRIM">{{
            $config.CALL_CENTER
          }}</b-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "OrderSuccess",
  data() {
    return {
      number: null,
      date: null,
    };
  },
  computed: {
    ...mapGetters({
      user: "account/user",
      orderNumber: "iiko/orderNumber",
    }),
    currentDate: () => new Date().toLocaleString(),
  },
  mounted() {
    if (this.orderNumber) {
      sessionStorage.setItem(
        "order_details",
        JSON.stringify({
          date: this.currentDate,
          number: this.orderNumber,
        })
      );
    }
    if (sessionStorage.getItem("order_details")) {
      const order = JSON.parse(sessionStorage.getItem("order_details"));
      this.number = order.number;
      this.date = order.date;
    } else {
      this.$router.push("/");
    }
  },
};
</script>

<style lang="scss" scoped>
.order-success {
  display: block;
  padding: 25px;
  background-color: #f9f9f9;
  border-radius: 10px;
  min-height: 80vh;

  &__title {
    font-weight: 600;
    font-size: 1.4rem;
  }

  &__details {
    font-size: 1.2rem;
  }
}
</style>
