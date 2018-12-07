<template>
  <div class="dropdown">
    <div class="row">
      <div class="col">
        <label>Användarnamn:</label>
      </div>
      <div class="col">
        <input type='text' v-model="username">
      </div>
    </div>
    <div class="row">
      <div class="col">
        <label>Lösenord:</label>
      </div>
      <div class="col">
        <input type='password' v-model="password">
      </div>
    </div>
    <div class="row">
      <div class="col">
        <b-form-checkbox id="checkbox" v-model="rememberLogin">
           Spara inloggningen
        </b-form-checkbox>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <a target="_blank" rel="noopener" href="https://ws.spraakbanken.gu.se/user/password">Glömt ditt lösenord?</a>
      </div>
    </div>
    <div class="row">
      <div class="col-auto mr-auto"></div>
      <div class="col-auto">
        <button class="btn btn-primary" v-on:click="login()">Logga in</button>
      </div>
    </div>
  </div>
</template>

<script>
import * as _ from 'lodash'
import auth from '@/services/auth'

export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      rememberLogin: false
    }
  },
  methods: {
    login: async function () {
      const [loggedIn, user] = await auth.login(this.username, this.password, this.rememberLogin)
      if(loggedIn) {
        this.showLogin = false
        this.username = ''
        this.password = ''
        this.$emit('loginSuccess', user)
      }
    }
  }
}
</script>

<style scoped>
.active-typeahead {
  background-color: lightgrey;
}
.typeahead-elem {
  padding-left: 10px;
}
</style>
