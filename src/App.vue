<template>
  <div id="app" class="container">
    <NoAccess v-if="user && !access" @logout="logout" />
    <Login v-if="!init && !user" @loginSuccess="loginSuccess" />
    <Main v-if="access && user" @logout="logout" />
    <div v-if="init">checking user...</div>
  </div>
</template>

<script>
import * as _ from 'lodash'
import auth from '@/services/auth'
import backend from '@/services/backend'
import Login from '@/components/Login'
import Main from '@/components/Main'
import NoAccess from '@/components/NoAccess'

export default {
  name: 'App',
  components: {
    Login,
    Main,
    NoAccess
  },
  data () {
    return {
      user: null,
      init: true,
      access: false
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
  },
  watch: {
    user () {
      const user = this.user
      if (user &&
          user.authenticated && 
          user.permitted_resources &&
          user.permitted_resources.lexica &&
          user.permitted_resources.lexica['term-swefin'] &&
          user.permitted_resources.lexica['term-swefin'].write) {
        this.access = true
      } else {
        this.access = false
      }
    }
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
