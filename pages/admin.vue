<template>
  <div class="main container d-block text-left about">
    <b-form-group
      v-if="pass !== $config.ADMIN_PASS"
      label="Введите сюда секретный пароль"
      label-for="input-formatter"
      description="Если вы не знаете пароля обратитесь к администрации сайта"
      class="mb-0"
    >
      <b-form-input
        id="input-formatter"
        type="password"
        v-model="pass"
        placeholder="Enter your name"
      ></b-form-input>
    </b-form-group>

    <template v-else>
      <draggable
        v-model="menu"
        group="people"
        @start="drag=true"
        @end="drag=false">
         <div class="item" v-for="element in menu" :key="element.key">{{element.title}}</div>
      </draggable>
      <button type="button" class="btn btn-primary rounded-pill mt-3" @click="save">Сохранить</button>
    </template>
  </div>
</template>

<script>
import data from '@/store/menu.json';

export default {
  data(){
    return {
      pass: '',
      menu: data
    }
  },
  methods: {
    async save(){
     await this.$axios.post('/api/json', {
        data: this.menu
     })
    }
  }
}
</script>

<style lang='scss' scoped>
.main{
  min-height: 100vh;
}

.item{
  padding: 8px 10px;
  border: 1px solid #ddd;
  margin-bottom: 2px;
  cursor: pointer;
}
</style>
