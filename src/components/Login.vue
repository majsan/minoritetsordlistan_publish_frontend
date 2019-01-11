<template>
  <div class="container-fluid login-box">
    <div class="row">
      <div class="col-12">
        <h1>Hantera sakområden</h1>
      </div>
    </div>
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
    <div class="row error" v-if="authError">
      <div class="col">
        Fel användarnamn eller lösenord
      </div>
    </div>
    <div class="row error" v-if="otherError">
      <div class="col">
        Något gick fel. Försök igen.
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
      rememberLogin: false,
      authError: false,
      otherError: false
    }
  },
  methods: {
    login: async function () {
      const [loggedIn, user] = await auth.login(this.username, this.password, this.rememberLogin)
      if(loggedIn && user.authenticated) {
        this.authError = false
        this.otherError = false
        this.showLogin = false
        this.username = ''
        this.password = ''
        this.$emit('loginSuccess', user)
      } else if (loggedIn) {
        this.authError = true
      } else {
        this.otherError = true
      }
    }
  }
}
</script>

<style scoped>
.login-box {
  width: 450px;
}
.error {
  color: red;
}
</style>
