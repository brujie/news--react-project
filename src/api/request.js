import axios from 'axios';
import {
  store
} from '../redux/store'
//post delete patch get 
// _embed 向下关联
// _expand // 向上关联
const request = axios.create({
  baseURL:'http://localhost:5000',
  timeout: 5000
})

request.interceptors.request.use(config => {
  let {
    baseURL,
    method,
    url
  } = config;
  console.log(`[${method}] ${baseURL+url}`)
  // 使用redux中的dispatch派发事件
  store.dispatch({
    type: "change_loading",
    payload: true
  })
  return config
}, err => {
  console.log(err)
})

request.interceptors.response.use(res => {
  store.dispatch({
    type: "change_loading",
    payload: false
  })
  return res.data;
}, err => {
  console.log(err)
})

export default request;