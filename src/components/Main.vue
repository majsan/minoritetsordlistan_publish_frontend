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
        <div class="col-auto">Välj lexikon: </div>
        <template v-for="availableLexicon in lexicons">
          <div class="col-auto lexicon" @click="chooseLex(availableLexicon)" v-bind:class="{selected: lexicon === availableLexicon}">{{availableLexicon}}</div>
        </template>
      </div>

      <div class="row" v-if="lexicon !== ''">
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
              <button class="btn btn-danger" @click="unpublish(subtype)">Avpublicera</button>
            </div>
          </div>
          <div class="row subtype-row" v-for="subtype in unpublished">
            <div class="col-12">
              <button class="btn btn-primary" @click="publish(subtype)">Publicera</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as _ from 'lodash'
import backend from '@/services/backend'

export default {
  name: 'Main',
  props: ['lexicons'],
  data () {
    return {
      published: [],
      unpublished: [],
      lexicon: ''
    }
  },
  methods: {
    logout: function () {
      this.$emit('logout')
    },
    publish (subtype) {
      backend.publish(this.lexicon, subtype).then((response) => {
        if (response) {
          if (this.published.indexOf(subtype) == -1) {
            this.published.push(subtype)
            this.unpublished.splice(this.unpublished.indexOf(subtype), 1)
          }
        }
      })
    },
    unpublish (subtype) {
      backend.unpublish(this.lexicon, subtype).then((response) => {
        if (response) {
          if (this.unpublished.indexOf(subtype) == -1) {
            this.unpublished.push(subtype)
            this.published.splice(this.published.indexOf(subtype), 1)
          }
        }
      })
    },
    chooseLex (lexicon) {
      this.lexicon = lexicon
    }
  },
  watch: {
    lexicon () {
      const subtypes = backend.getSubtypes(this.lexicon).then((subtypes) => {
        this.published = subtypes.published
        this.unpublished = subtypes.unpublished
      })
    }
  },
  created () {
    if (this.lexicons.length == 1) {
      this.lexicon = this.lexicons[0]
    }
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
.selected {
  font-weight: bold;
}
.lexicon {
  cursor: pointer;
}
</style>
