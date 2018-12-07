<template>
  <div class="row">
    <a @click="logout()">Logga ut</a>
    <div class="col-12">
      <div class="row"  v-for="subtype in published">
        {{subtype}}
      </div>
      <div class="row"  v-for="subtype in unpublished">
        {{subtype}}
      </div>
    </div>
  </div>
</template>

<script>
import * as _ from 'lodash'
import backend from '@/services/backend'

export default {
  name: 'Main',
  data () {
    return {
      published: [],
      unpublished: []
    }
  },
  methods: {
    logout: function () {
      this.$emit('logout')
    }
  },
  created () {
    const subtypes = backend.getSubtypes()
    this.published = subtypes.published
    this.unpublished = subtypes.unpublished
  }
}
</script>

<style scoped>
</style>
