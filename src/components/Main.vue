<template>
  <div>
    <a @click="logout()">Logga ut</a>
    ASDFASDFASDF
  </div>
</template>

<script>
import * as _ from 'lodash'

export default {
  name: 'Main',
  data () {
    return {
    }
  },
  methods: {
    logout: function () {
      this.$emit('logout')
    }
  }
}
</script>

<style scoped>
</style>
