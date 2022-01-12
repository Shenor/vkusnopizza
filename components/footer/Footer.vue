<template>
  <div class="footer">
    <b-container class="footer__wrapper justify-content-between align-items-baseline pt-4 text-white">
      <div class="footer__column">
        <div class="footer__column__title">
          PIZZBURG
        </div>
        <p class="footer__column__text">
          Готовим вкусное настроение,
          мы всегда удивим вас качеством и ценами
        </p>
      </div>
      <div class="footer__column">
        <div class="footer__column__title">
          Основные ссылки
        </div>
        <ul class="footer__column__list">
          <li><NuxtLink to='/about'>О компании</NuxtLink></li>
          <li><NuxtLink to='/'>Каталог</NuxtLink></li>
<!--          <li><NuxtLink to='#'>Доставка</NuxtLink></li>-->
<!--          <li><NuxtLink to='#'>Оплата</NuxtLink></li>-->
        </ul>
      </div>
      <div class="footer__column">
        <div class="footer__column__title">
          Категории
        </div>
        <ul class="footer__column__list">
          <li><NuxtLink to='/#pizza'>Пицца</NuxtLink></li>
          <li><NuxtLink to='/#rolls'>Роллы</NuxtLink></li>
          <li><NuxtLink to='/#burgers'>Бургеры</NuxtLink></li>
          <li><NuxtLink to='/#mussels'>Мидии</NuxtLink></li>
        </ul>
      </div>
      <div class="footer__column">
        <div class="footer__column__title">
          Полезные ссылки
        </div>
        <ul class="footer__column__list">
          <li><NuxtLink to='/about'>О нас</NuxtLink></li>
        </ul>
        <ul class="footer__column__list">
          <li><NuxtLink to='/about'>Реквизиты</NuxtLink></li>
        </ul>
      </div>
      <div class="footer__column">
        <div class="footer__column__title">
          <a href='http://instagram.com/pizzburgkrd'><b-img src="/social-icon/inst.svg" fluid alt="Fluid image"></b-img> Instagram</a>
        </div>
        <ul class="footer__column__list">
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </b-container>
    <b-container class="footer__additional-info d-block d-sm-block d-md-none text-white text-left pt-4 pb-4">
      <div class="footer__additional-info__text mb-1">Краснодар, ул. Красная, 29</div>
      <div class="footer__additional-info__text mb-1">Краснодар, ул. Восточно-Кругликовская, 18</div>
      <client-only>
        <div class="footer__additional-info__text mb-1">{{ $config.CALL_CENTER }}</div>
      </client-only>
      <div class="footer__additional-info__text mb-1">с 10:00 до 24:00</div>
      <p class="mt-4 ">Готовим вкусное настроение, мы всегда удивим вас качеством и ценами</p>
    </b-container>
<!--    <div class="d-flex justify-content-center align-items-center footer__green-line">Copyright © 2020. Все права защищены. by <a class="text-white mr-1 ml-1" target="_blank" href="https://rijet.ru">Rijet</a> P.M.</div>-->
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang='scss' scoped>
  .footer{
    position: relative;
    background-color: $bg-color;
    min-height: 270px;
    padding-bottom: 50px;

    @media (max-width: 768px) {
      height: auto
    }

    &__wrapper{
      display: grid;
      grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr;

       @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
        column-gap: 15px;
      }
    }

    &__column{
      text-align: left;

      a{
        color: white;
      }

      &__title{
        font-weight: 600;
        margin-bottom: 15px;
      }

      &__list{
        list-style: none;
        padding: 0;
        margin: 0;
        font-weight: 300;
        font-size: 12px;

        li{
          margin: 10px auto;

          .img-fluid{
            margin-right: 5px;
          }
        }
      }
    }

    &__column:first-child{
      @media (max-width: 768px) {
        grid-column: 1/3;
      }

      .footer__column__title{
        font-size: 20px;
        font-weight: bold;
        letter-spacing: 0.07em;
        margin-bottom: 30px;

        @media (max-width: 768px) {
          margin-bottom: 15px;
        }
      }

      .footer__column__text{
        font-weight: 300;
        font-size: 12px;
        max-width: 150px;

         @media (max-width: 768px) {
          max-width: 100%;
        }
      }
    }

    &__additional-info{
      &__text{
        font-size: $font-size - .09;
      }
      p{
        font-weight: 300;
      }
    }

    &__green-line{
      position: absolute;
      color: white;
      font-weight: 300;
      font-size: 12px;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 50px;
      background-color: $secondary-color;

      a{
        text-decoration: none;
        font-weight: 600;
      }
    }
  }
</style>
