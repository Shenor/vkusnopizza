<template>
  <div class="container order-success mb-5">
    <div class="row order__content-wrapper d-flex align-items-center flex-column">
      <h3 class="restore-order__form-success-title"> Спасибо за заказ </h3>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox = "0 0 80 80" class="pt-5 pb-5" style="max-width: 150px;">
        <path fill="#bae0bd" d="M40,77.5C19.3,77.5,2.5,60.7,2.5,40S19.3,2.5,40,2.5S77.5,19.3,77.5,40S60.7,77.5,40,77.5z" />
        <path fill="#5e9c76"
              d="M40,3c20.4,0,37,16.6,37,37S60.4,77,40,77S3,60.4,3,40S19.6,3,40,3 M40,2C19,2,2,19,2,40s17,38,38,38 s38-17,38-38S61,2,40,2L40,2z" />
        <path fill="#fff" d="M34 56L20.2 42.2 24.5 38 34 47.6 58.2 23.4 62.5 27.6z" />
      </svg>
      <div class="order-success__content">
        <div>Ваш заказ принят в обработку</div>
        <div class="mt-3 mb-3">
          Номер заказа: {{successPayment.number}} <br>
          Время заказа: {{successPayment.createdTime}}
        </div>
        <div>В ближайшее время с вами свяжутся для уточнения деталей и подтверждения заказа</div>
        <div>
          Если после оплаты заказа у Вас возникли технические проблемы или Вы обнаружили ошибку (ФИО/адрес/номер и д.р),
          обратитесь по номеру {{ $config.CALL_CENTER }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderId",
  data() {
    return {
      successPayment: {
        number: Math.floor(Math.random() * Math.floor(5000)),
        createdTime: new Date().toLocaleString()
      },
    }
  }
}
</script>

<style lang="scss" scoped>
.order-success {
  display: block;
  padding: 25px;
  background-color: #F9F9F9;
  border-radius: 10px;
  min-height: 80vh;

  &__content{
    max-width: 70%;
  }
}
</style>
