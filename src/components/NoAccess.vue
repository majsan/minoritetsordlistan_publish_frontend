<template>
  <div class="container-fluid no-access-box">
    <div class="row">
      <div class="col-12 error-text">
        Du måste ha rättigheter att redigera lexikonet term-swefin i Karp för att få åtkomst till denna sida.
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-auto">
        <span class="logout" @click="logout()">Logga ut</span>
      </div>
    </div>
  </div>
</template>

<script>
import * as _ from 'lodash'
import auth from '@/services/auth'

export default {
  name: 'NoAccess',
  data () {
    return {
    }
  },
  methods: {
    logout () {
      this.$emit('logout')
    }
  }
}
</script>

<style scoped>
.logout {
  cursor: pointer;
}
.no-access-box {
  width: 300px;
}
.error-text {
  font-style: italic;
}
</style>
