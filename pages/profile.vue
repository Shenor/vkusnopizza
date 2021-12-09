<template>
  <div class="main container d-block pt-3">
    <client-only>
      <b-card no-body>
        <b-tabs pills card vertical end class="text-left">
          <!-- Личные данные (1 раздел) -->
          <b-tab title="Личные данные"><b-card-text>
            <h3 class="mb-3">Личный кабинет</h3>
            <div class="privat-data" v-if="user">
              <client-only>
                <div class="font-weight-semibold">Имя: </div>
                <div>{{user.name}}</div>
                <div class="font-weight-semibold">Номер телефона: </div>
                <div>{{user.phone}}</div>
                <div class="font-weight-semibold">День рождения: </div>
                <div>{{user.birthday || 'Нет данных'}}</div>
                <div class="font-weight-semibold">Email: </div>
                <div>{{user.email || 'Нет данных'}}</div>
              </client-only>
            </div>
          </b-card-text></b-tab>

          <!-- Адреса доставки (2 раздел) -->
          <b-tab title="Адреса доставки"><b-card-text>
            <h3>Адреса доставки</h3>
              <!-- <b-input-group>
                <b-form-input type="text"></b-form-input>

                <b-input-group-append>
                  <b-input-group-text>
                    <img src="https://img.icons8.com/windows/22/000000/edit.png"/>
                  </b-input-group-text>
                  <b-input-group-text>
                    <img src="https://img.icons8.com/windows/22/000000/delete-forever.png"/>
                  </b-input-group-text>
                </b-input-group-append>
              </b-input-group> -->
          </b-card-text></b-tab>

          <!-- Мои заказы (3 раздел) -->
          <b-tab title="Мои заказы"><b-card-text>
            <h3 class="mb-3">Мои заказы</h3>
            <div class="history-order-wrapper">
              <div class="history-order-item">
                <b-badge variant="success">Выполнен</b-badge>
                <div class="order-info">
                  <div>
                    <div class="order-info__date">16 августа в 15:33</div>
                    <span class="order-info__method">самовывоз</span>
                  </div>
                  <div class="order-totalSum">1037 ₽</div>
                </div>
                <div class="order-list text-center">
                  <div class="order-list__item" v-for="item in items" :key="item.message">
                    <b-img class="order-list__item-img" src='/pizza.png'></b-img>
                    <div class="order-list__item-text">{{item.title}}</div>
                  </div>
                </div>
              </div>
              <div class="history-order-item">
                <b-badge variant="success">Выполнен</b-badge>
                <div class="order-info">
                  <div>
                    <div class="order-info__date">16 августа в 15:33</div>
                    <span class="order-info__method">самовывоз</span>
                  </div>
                  <div class="order-totalSum">1037 ₽</div>
                </div>
                <div class="order-list text-center">
                  <div class="order-list__item" v-for="item in items" :key="item.message">
                    <b-img class="order-list__item-img" src='/pizza.png'></b-img>
                    <div class="order-list__item-text">{{item.title}}</div>
                  </div>
                </div>
              </div>
            </div>
          </b-card-text></b-tab>
        </b-tabs>
      </b-card>
    </client-only>
  </div>
</template>

<script>
import { mapGetters} from "vuex";
export default {
  data(){
    return{
      items: [
        {id: 1, title: 'Пицца 4 сезона', price: '350'},
        {id: 2, title: 'Пицца 4 сыра', price: '250'},
        {id: 3, title: 'Пицца Аспромонте', price: '550'},
        {id: 4, title: 'Пицца Болоньезе', price: '650'},
        {id: 5, title: 'Пицца Вегетарианская', price: '250'},
        {id: 6, title: 'Пицца Фирменная', price: '450'},
      ]
    }
  },
  middleware: 'auth',
  methods: {},
  computed: {
    ...mapGetters({
      user: 'account/user'
    })
  },
  async mounted(){
    // this.$strapi.find('clients', {name: 'Павел', fields: 'name'})
    // try {
    //   this.$http.setToken(this.$store.getters.getToken)
    //   const {user} = await this.$http.$get(`users`)
    //   this.user = user;
    // } catch (error) {
    //   this.$router.push('/')
    // }
  }
}
</script>

<style lang='scss' scoped>
  .main{
    min-height: 100vh;
  }
  .privat-data{
    display: grid;
    grid-template-columns: 180px 1fr;
    row-gap: 5px;
    grid-template-rows: auto;
    align-items: center;

    @media (max-width: 768px) {
      // grid-template-columns: 1fr;
      grid-template-columns: .5fr 1fr;
      column-gap: 10px;
      row-gap: 10px;
    }
  }
  .history-order-wrapper{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .history-order-item{
    position: relative;
    width: 95%;
    min-height: 100px;
    box-shadow: 0px 0px 11px 1px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    margin-bottom: 35px;
  }
  .order-info{
    display: flex;
    color: rgba(0, 0, 0, 0.7);
    padding: 35px 15px 15px 15px;
    justify-content: space-between;
    background-color: whitesmoke;

    &__method{
      font-weight: 700;
      letter-spacing: 0.03em;
    }
  }
  .order-list{
    position: relative;
    display: flex;
    overflow: hidden;
    max-width: 100%;
    padding: 10px 15px;

    @media (max-width: 576px) {
      flex-wrap: wrap;
      justify-content: space-evenly;
    }

    &::after{
      content: '';
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      position: absolute;
      top: 0px;
      bottom: 0px;
      right: 0;
      width: 10%;
      z-index: 2;
      padding: 9px 53.3333px 20px;
      pointer-events: none;
      background-image: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 100%);

      @media (max-width: 576px) {
        display: none;
      }
    }

    &__item{
      min-width: 90px;
      width: 130px;
      margin-right: 5px;

      @media (max-width: 576px) {
       margin-right: 0;
      }

      &-img{
        max-width: 90%;
      }
      &-text{
        font-weight: 300;
      }
    }
  }
  .order-totalSum{
    align-self: center;
    font-weight: bold;
    font-size: 1.2rem;
  }
  .link-exit{
    padding: 0.5rem 1rem;

    &:hover{
      text-decoration: none;
    }
  }
  .tabs{
    @media (max-width: 768px) {
      flex-direction: column-reverse;
    }
  }
  .badge{
    content: '';
    position: absolute;
    top: 10px;
    left: -15px;
    padding: 5px;
    font-weight: 600;
  }
  .card{
    border: none;
  }
</style>
