import axios from 'axios'

let api = 'http://127.0.0.1:5000/api/'

export default axios.create({
  baseURL: api
})

// test account: eni08308@bcaoo.com
