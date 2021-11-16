<template>
  <div>
    <MainBanner />
    <Bestsellers />

    <div class="banner d-none d-md-flex d-xl-flex mb-5">
      <b-container class="flex-column text-white align-items-center">
        <div class="banner__title mb-3">Бесплатная доставка <span>от 600 руб.</span></div>
        <div class="banner__text">сделай заказ и получи подарок</div>
      </b-container>
    </div>

    <b-container id="combo" class="main-title mb-4 justify-content-start">Комбо</b-container>
    <b-container class="main-content flex-wrap mb-4">
        <b-card
          :title="item.title"
          img-src="/combo.png"
          img-top
          align="left"
          tag="article"
          class="mb-5"
          v-for="item in combo"
          :key="item.key"
        >
          <b-card-text>
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </b-card-text>

          <div class="text-right">
            <b-button href="#" variant="outline-primary" class="ml-auto">Выбрать</b-button>
          </div>
        </b-card>
    </b-container>

    <b-container id="pizza" class="main-title mb-4 justify-content-start">Пицца</b-container>
    <b-container class="main-content flex-wrap mb-4">
        <b-card
          :title="item.title"
          img-src="/combo.png"
          img-top
          align="left"
          tag="article"
          class="mb-5"
          v-for="item in items"
          :key="item.key"
        >
          <b-card-text>
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </b-card-text>

          <div class="text-right">
            <b-button href="#" variant="outline-primary" class="ml-auto">Выбрать</b-button>
          </div>
        </b-card>
    </b-container>

    <b-container id="drinks" class="main-title mb-4 justify-content-start">Напитки</b-container>
      <b-container class="main-content flex-wrap mb-4">
        <b-card
          :title="item.name"
          :img-src="imageUrl(item)"
          img-top
          align="left"
          tag="article"
          class="mb-5"
          v-for="item in uploadData.drinksItems"
          :key="item.key"
        >
          <b-card-text>
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </b-card-text>

          <div class="text-right">
            <b-button href="#" variant="outline-primary" class="ml-auto" @click="add(item)">Выбрать</b-button>
          </div>
        </b-card>
    </b-container>

    <b-container class="main-title mb-4 delivery-title justify-content-start">Доставка и оплата</b-container>
    <b-container class="text-left flex-column delivery mb-5">
     <p>Суши и роллы с доставкой по  <br>
      Самым известным и без сомнения значимым достижением кулинарной мысли японских поваров стали суши.
      Сегодня это блюдо получило огромную популярность не только в Европе, но и в России. И неудивительно,
      ведь тонкий и неповторимый вкус суши сведет с ума любого ценителя изысканной пищи.</p>

      <p>4 причины заказать суши у нас <br>
      Приведем несколько доводов, почему заказывать суши и роллы в Краснодаре, лучше именно у нас:</p>

      <p>Более 120 различных позиций в ассортименте нашего меню, так что каждый найдёт варианты для себя.<br>
      Оригинальные рецепты блюд - аналогов вы не найдете в других японских ресторанах.<br>
      Мы используем только свежие продукты, от проверенных поставщиков, в пригтовлении суши и роллов.<br>
      Различные акции и скидки, подробности о которых вы можете прочитать в слайдере.<br>
      Приятные цены на сеты, благодаря которым вы можете купить суши очень выгодно.<br>
      А если этих доводов недостаточно, то остаётся только купить наши блюда и убедится в их отличном качестве самостоятельно.
      И это будет дешево и (нет, не сердито) вкусно.</p>

      <p>Ресторан японской кухни в кармане <br>
      Заядлые любители комфорта, современных технологий и суши могут воспользоваться нашим приложением для мобильных
      устройств на базе Android и iOS. Программа позволит выбрать и выгодно заказать роллы из нашего обширного прайс-листа,
      отслеживать историю заказов и ознакомиться со свежими отзывами пользователей.</p>

      <p>К тому же оно запомнит вашу локацию и отобразит актуальные данные по стоимости и времени доставки.
      И вишенкой на торте – специальные акции и предложения для пользователей приложением, ознакомиться с которыми можно в специальном разделе меню.
      А ещё из приложения можно быстро связаться с нашими операторами для уточнения всех интересующих вопросов.</p>

      <p>Что нужно знать об оплате и доставке <br>
      Заставлять клиентов ждать – не наш выбор. Поэтому все заказы доставляются в течение максимум 90 минут в пределах
      рабочего времени (с 9:00 до 22:00, заявки принимаются до 21:30).</p>

     <p> Минимальная сумма заказа составляет 600 рублей. С оплатой проблем также не возникнет, потому что у нас низкие цены,
      а расчёт производится по прибытии заказа на месте при помощи наличных или банковской карты. Так что заказывайте наши блюда и,
      как говорят в Японии, итадакимас вам!</p>

      <p>История суши <br>
      Интересно, что первоначально японцы не ели рыбу и рис вместе. Появление суши – всего лишь результат пищевого эксперимента.
      В Японии, кстати, этот продукт называют не иначе как «сюси», что в переводе с китайского значит «маринованная рыба».
      Дело в том, что рис изначально использовали исключительно для увеличения срока хранения маринованной рыбы.</p>

      <p>Разновидности суши <br>
      Основное достоинство суши в том, что среди большого количества их разновидностей любой может найти себе блюдо по душе.
      Для истинных ценителей японской простоты и гармонии подойдут нигири суши, представляющие сформированный особым образом брусок риса,
      покрытый ломтиком свежей рыбы, омлета или другого морепродукта. Любители пикантных блюд оценят спайс суши (гунканы).</p>

      <p>Практически каждому приглянутся роллы – классическая японская закуска. Роллы по сути являются рулетом,
      обрамленным нори и наполненным рисом, овощами и морепродуктами. Эта закуска больше всего подверглась влиянию различных культур.
      Появились калифорнийские роллы, роллы «Филадельфия», полюбившиеся американцам. Сегодня можно встретить и вовсе далекие от японских
      канонов начинки: фрукты, омлеты. Ну и последняя разновидность суши – это сашими. Ровные ломтики разных видов свежей рыбы и морепродуктов,
      красиво украшенные нарезкой из овощей, не оставят равнодушными приверженцев изящества и лаконичности в пище.</p>

      <p>Суши – не просто традиционный представитель японской кухни. Именно в этом блюде воплотилась одна из важнейших японских ценностей:
      красота в простоте. Изумительные суши всегда станут гармоничным дополнением к здоровой и вкусной пище.</p>
    </b-container>
  </div>
</template>
<script>
import MainBanner from "@/components/banner/MainBanner";
import Bestsellers from "@/components/bestsellers/index";
import data from '@/store/data.json';
export default {
  data() {
    return {
      modalInfo:{
        selectedItem: null,
        groupModifiers: null,
        selectedModifiers: '',
        price: 0
      },
      loadCategoryID: {
        newsCategoryID: '7ba3f2a8-fa96-c6ad-0174-b5ba1356019a',
        comboCategoryID: '',
        drinksCategoryID: 'f07bedd4-fbfa-4203-0174-be6eb197baf5'
      },
      uploadData: {
        nomenclature: data.nomenclature,
        comboItems: null,
        drinksItems: data.nomenclature.products.filter(i => i.productCategoryId == 'f07bedd4-fbfa-4203-0174-be6eb197baf5'),
        newsItems: data.nomenclature.products.filter(i => i.productCategoryId == '7ba3f2a8-fa96-c6ad-0174-b5ba1356019a' && i.type == "dish")
      },
      items: [
        {id: 1, title: 'Пицца 4 сезона', price: '350'},
        {id: 2, title: 'Пицца 4 сыра', price: '250'},
        {id: 3, title: 'Пицца Аспромонте', price: '550'},
        {id: 4, title: 'Пицца Болоньезе', price: '650'},
        {id: 5, title: 'Пицца Вегетарианская', price: '250'},
        {id: 6, title: 'Пицца Фирменная', price: '450'},
      ],
      combo: [
        {id: 7, title: 'Комбо 3 в 1', price: '599'},
        {id: 8, title: 'Комбо на двоих', price: '599'},
        {id: 9, title: 'Комбо на компанию', price: '599'},
        {id: 10, title: 'Комбо максимум', price: '599'},
        {id: 11, title: 'Комбо медиум', price: '599'},
        {id: 12, title: 'Комбо лоу', price: '599'},
        {id: 13, title: 'Комбо экспресс', price: '599'},
        {id: 14, title: 'Комбо экспресс', price: '599'}
      ]
    }
  },
  components: {
    MainBanner,
    Bestsellers
  },
  mounted: function () {
    this.visibleSliders = true
    document.querySelector('.delivery').addEventListener('click', this.onCollapseDelivery)
  },
  destroyed(){
    document.querySelector('.delivery').addEventListener('click', this.onCollapseDelivery)
  },
  computed:{
    modifiers(){
      const modifiers = this.modalInfo.selectedItem.groupModifiers[0].childModifiers.map(item => {
        return this.uploadData.nomenclature.products.find(product => {
          return product.id == item.modifierId
        })
      });
      this.modalInfo.selectedModifiers = modifiers[0].id
      this.modalInfo.groupModifiers = modifiers
      console.log(modifiers)
      return modifiers
    },
    priceSelectedModifiers(){
      const {price} = this.modalInfo.groupModifiers.find(item => {
        return item.id == this.modalInfo.selectedModifiers
      })
      return price
    }
  },
  methods: {
    onCollapseDelivery(){
      document.querySelector('.delivery').classList.add('delivery--isActive')
    },
    imageUrl(item){
      return item.images[item.images.length - 1] ? item.images[item.images.length - 1].imageUrl : '/default.png'
    },
    showProductCard(payload){
      this.modalInfo.selectedItem = payload
      this.$bvModal.show('modal-product')
    },
    add(payload){
      if(payload){
        this.$eventHub.$emit('viewBuyMsg')
        this.$store.commit('addToCart', {...payload, count: 1})
        this.$bvModal.hide('modal-product')
        console.log(this.$store.getters.getCart)
      } else {
        const candidate = this.modalInfo.groupModifiers.find((item) => {
          if(item.id == this.modalInfo.selectedModifiers){
            const parent = this.uploadData.nomenclature.products.find((product) => {
              return product.groupModifiers[0].childModifiers.find(modify => {return modify.modifierId ==item.id})
            })
            item.images = parent.images
            return item
          }
        });
        this.$eventHub.$emit('viewBuyMsg')
        this.$store.commit('addToCart', {...candidate, count: 1})
        this.$bvModal.hide('modal-product')
        console.log(this.$store.getters.getCart)
      }
    },
    changeModifiers(){
      console.log('object')
    },
    async dataApi(){
      this.$http.setHeader('Organization')
      const nomenclature = await this.$http.$get()
      console.log(nomenclature)
      this.uploadData.nomenclature = nomenclature;
      this.uploadData.newsItems = nomenclature.products.filter(element => {
        return element.productCategoryId == this.loadCategoryID.newsCategoryID
        && element.type == "dish"
      });
      this.uploadData.drinksItems = nomenclature.products.filter(element => {
        return element.productCategoryId == this.loadCategoryID.drinksCategoryID
      });
    }
  }
}
</script>

<style lang="scss" scoped>

.main-content{
  justify-content: start;

  @media (max-width: 1199.98px) {
    justify-content: center;
  }

  .card{
    width: 18rem;
    height: 22rem;
    border: none;
    box-shadow: 0px 4px 7px 1px rgba(0, 0, 0, 0.2);

    @media (max-width: 767.98px) {
      margin-right: 0;
      width: 24rem;
      height: auto;
    }
    @media (min-width: 768px) and (max-width: 1199.98px) {
      margin-right: 5.5%;
    }

    @media (min-width: 1199.98px) {
      &:not(:nth-child(3n)){
        margin-right: 10.5%;
      }
    }

    &-img-top{
      max-width: 150px;
      margin: auto;
      transition: all .3s;
      cursor: pointer;

      &:hover{
        transform: translate(0, 5px);
      }
    }

    &-title{
      font-weight: 600;
      font-size: 1.1rem;
    }

    &-text{
      font-size: .9rem;
      font-weight: 300;
      min-height: 65px;
      overflow: hidden
    }
  }
}

.grabbing{
  cursor: grab;

  &:active{
    cursor: grabbing;
  }
}

.banner{
  background-color: $secondary-color;
  height: 200px;

  .container{
    height: 100%;
  }

  &__title{
    font-size: 1.6rem;
    text-transform: uppercase;
    font-weight: 600;

    span{
      font-weight: 300;
    }
  }

  &__text{
    font-size: 1.3rem;
    font-weight: 300;
  }
}

.container{
  align-items: start;
}

.spinner{
  margin: 0 auto;
}

.delivery{
  font-size: .75rem;
  font-weight: 300;
  height: 250px;
  position: relative;
  overflow: hidden;

  &--isActive{
    height: auto;
    overflow: visible;

    &::before{
      display: none;
    }
  }

  &::before{
    content: '';
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100px;
    background-image: linear-gradient(rgba(255, 255, 255, 0) 0%, #fff 100%);
  }
}
</style>
