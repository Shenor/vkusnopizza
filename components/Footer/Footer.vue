<template>
  <div class="footer">
    <b-container class="footer__wrapper justify-content-between align-items-baseline pt-4 text-white">
      <div class="footer__column">
        <div class="footer__column__title">
          VKUSNOPIZZA
        </div>
        <p class="footer__column__text">
          Вкуснейшная пицца в городе армавир,
          мы всегда удивим вас качеством и ценами
        </p>
      </div>
      <div class="footer__column">
        <div class="footer__column__title">
          Основные ссылки
        </div>
        <ul class="footer__column__list">
          <li><nuxt-link to='/about'>О компании</nuxt-link></li>
          <li><nuxt-link to='/'>Каталог</nuxt-link></li>
          <li><nuxt-link to='#'>Доставка</nuxt-link></li>
          <li><nuxt-link to='#'>Оплата</nuxt-link></li>
        </ul>
      </div>
      <div class="footer__column">
        <div class="footer__column__title">
          Категории
        </div>
        <ul class="footer__column__list">
          <li><nuxt-link to='/#pizza'>Пицца</nuxt-link></li>
          <li><nuxt-link to='/#combo'>Комбо</nuxt-link></li>
          <li><nuxt-link to='/#drinks'>Напитки</nuxt-link></li>
          <li><nuxt-link to='/stocks'>Акции</nuxt-link></li>
        </ul>
      </div>
      <div class="footer__column">
        <div class="footer__column__title">
          Полезные ссылки
        </div>
        <ul class="footer__column__list">
          <li><nuxt-link to='/about'>О нас</nuxt-link></li>
          <li><nuxt-link to='#'>Условия доставки</nuxt-link></li>
          <li><nuxt-link to='#'>Договор оферты</nuxt-link></li>
        </ul>
      </div>
      <div class="footer__column">
        <div class="footer__column__title">
          Соц сети
        </div>
        <ul class="footer__column__list">
          <li><nuxt-link to='#'><b-img src="/social-icon/vk.svg" fluid alt="Fluid image"></b-img> VK.com</nuxt-link></li>
          <li><nuxt-link to='#'><b-img src="/social-icon/fb.svg" fluid alt="Fluid image"></b-img> Facebook</nuxt-link></li>
          <li><nuxt-link to='#'><b-img src="/social-icon/inst.svg" fluid alt="Fluid image"></b-img> Instagram</nuxt-link></li>
        </ul>
      </div>
    </b-container>
    <b-container class="footer__additional-info d-block d-sm-block d-md-none text-white text-left pt-4 pb-4">
      <div class="mb-1">Армавир, ул. Саловая 112</div>
      <div class="mb-1">8 (918) 627-55-37</div>
      <div class="mb-1">с 8:00 для 24:00</div>
      <p class="mt-4 ">Вкуснейшная пицца в городе армавир, мы всегда удивим вас качеством и ценами</p>
    </b-container>
    <div class="d-flex justify-content-center align-items-center footer__green-line">Copyright © 2020. Все права защищены. by <a class="text-white mr-1 ml-1" target="_blank" href="https://rijet.ru">Rijet</a> P.M.</div>
  </div>
</template>

<script>
export default {

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
