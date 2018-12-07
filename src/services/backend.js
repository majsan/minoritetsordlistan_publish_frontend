import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:4000'
})

const karpInstance = axios.create({
  baseURL: 'https://ws.spraakbanken.gu.se/ws/karp/v5'
})

const helper = function (promise, callback) {
    const body = document.getElementsByTagName('body')[0]
    body.classList.add('wait-load')
    return promise
      .then(function (response) {
        body.classList.remove('wait-load')
        if(callback) {
          return callback(response.data)
        } else{
          return response.data
        }
      })
      .catch(function (error) {
        body.classList.remove('wait-load')
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
  getLexicons () {
    return helper(instance.get('/lexicon'), (data) => data.lexicons)
  }
}
