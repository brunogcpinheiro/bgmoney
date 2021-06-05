import axios from 'axios'

const api = axios.create({
  baseURL: 'https://bgmoney.vercel.app/api'
})

export default api
