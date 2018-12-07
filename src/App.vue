<template>
  <div id="app" class="container">
    <Login v-if="!init && !user" @loginSuccess="loginSuccess" />
    <Main v-if="user" @logout="logout" />
    <div v-if="init">checking user...</div>
  </div>
</template>

<script>
import * as _ from 'lodash'
import auth from '@/services/auth'
import backend from '@/services/backend'
import Login from '@/components/Login'
import Main from '@/components/Main'

export default {
  name: 'App',
  components: {
    Login,
    Main
  },
  data () {
    return {
      user: null,
      init: true
    }
  },
  methods: {
    loginSuccess (user) {
      this.user = user
    },
    logout () {
      auth.logout()
      this.user = null
    }
  },
  created: function() {
    const that = this
    auth.getUser().then((user) => {
      if(user) {
        that.user = user
      }
      that.init = false
    })
  }
}
</script>

<style>
#body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
#app {
  margin-top: 15px;
}
</style>
