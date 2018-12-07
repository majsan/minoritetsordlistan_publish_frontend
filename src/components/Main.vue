<template>
  <div class="row">
    <div class="col-12">
      <div class="row">
        <div class="col-auto">
          <h1>Hantera sakområden</h1>
        </div>
        <div class="col-auto ml-auto">
          <span class="logout" @click="logout()">Logga ut</span>
        </div>
      </div>

      <div class="row">
        <div class="col-auto">
          <div class="row align-items-center subtype-row" v-for="subtype in published">
            <div class="col-12">
              {{subtype}}
            </div>
          </div>
          <div class="row align-items-center subtype-row" v-for="subtype in unpublished">
            <div class="col-12">
              {{subtype}}
            </div>
          </div>
        </div>
        <div class="col-auto">
          <div class="row subtype-row" v-for="subtype in published">
            <div class="col-12">
              <button class="btn btn-danger">Avpublicera</button>
            </div>
          </div>
          <div class="row subtype-row" v-for="subtype in unpublished">
            <div class="col-12">
              <button class="btn btn-primary">Publicera</button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- <div class="row">
        <div class="col-12">
          <div class="row align-items-center subtype-row"  v-for="subtype in published">
            <div class="col-auto">
              {{subtype}}
            </div>
            <div class="col-auto">
              <button class="btn btn-primary">Avpublicera</button>
            </div>
          </div>
          <div class="row align-items-center subtype-row"  v-for="subtype in unpublished">
            <div class="col-auto">
              {{subtype}}
            </div>
            <div class="col-auto">
              <button class="btn btn-primary">Publicera</button>
            </div>
          </div>
        </div>
      </div> -->
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
    const subtypes = backend.getSubtypes().then((subtypes) => {
      this.published = subtypes.published
      this.unpublished = subtypes.unpublished
    })
  }
}
</script>

<style scoped>
.logout {
  cursor: pointer;
}
.logout:hover {
  text-decoration: underline;
}
.subtype-row {
  height: 50px;
  padding-top: 5px;
  padding-bottom: 5px;
}
</style>
