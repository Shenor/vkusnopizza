<template>
  <div class="main container d-block text-left about">
    <h2 class="about__title mb-3">О нас</h2>
    <div class="about__content">
      <div><span>Мы готовим самую вкусную пиццу в г. Красноодар:</span></div>
      Мы работаем 24 часа в сутки, 7 дней в неделю, 365 дней в году. В течение 45 минут или раньше заказ будет доставлен.
      Сделайте заказ и получите его в течение 45 минут по указанному вами адресу, или установите удобные для вас дату и
      время доставки. Нужно быстрее? Турбо-сеты доставят в течение 29 минут в пределах города!
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
.main{
  min-height: 100vh;
}

.about{
  &__content{
    font-weight: 300;

    span{
      font-weight: 600;
    }
  }
}
</style>
