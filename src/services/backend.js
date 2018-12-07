import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:4000'
})

const karpInstance = axios.create({
  baseURL: 'https://ws.spraakbanken.gu.se/ws/karp/v5'
})

const helper = function (promise, callback) {
    return promise
      .then(function (response) {
        if(callback) {
          return callback(response.data)
        } else{
          return response.data
        }
      })
      .catch(function (error) {
        console.log(error)
        if (error.response) {
          return error.response.data
        } else {
          return ''
        }
      })
}

export default {
  login (user, password) {
    const auth = window.btoa(user + ':' + password)
    const params = {
      headers: {
        Authorization: 'Basic ' + auth
      }
    }
    return helper(karpInstance.get('/checkuser', params), (data) => {
      data.token = auth
      return data
    })
  },
  getSubtypes () {
    return helper(instance.get('/subtypes?unpublished=true'))
  },
  publish (subtype) {
    return instance.get('/publish/' + subtype).then(function (response) {
      return response.data
    }).catch(function (error) {
      console.log(error)
    })
  },
  unpublish (subtype) {
    return instance.get('/unpublish/' + subtype).then(function (response) {
      return response.data
    }).catch(function (error) {
      console.log(error)
    })
  }
}
