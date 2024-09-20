import { API_URL } from '@/configs/config';
//import { API } from '@/routes/apis';
import axios from 'axios'

const BASE_URL = API_URL;

const Axios = axios.create({
  //withCredentials: true,
  baseURL: BASE_URL,
  headers: {
    "Accept": "application/json",
    //Accept: '*/*',
    "Content-Type": "application/json",
    //'X-Requested-With': 'XMLHttpRequest',
    //'Access-Control-Allow-Credentials':true,
  },
  withCredentials: true,
});

// after request
Axios.interceptors.request.use(
  config => {
    console.log('after request: ', config);

    return config;
  },
  error => {
    console.log('after request Err: ', error);
    return Promise.reject(error);
  }
);

// Response interceptor
Axios.interceptors.response.use(
  response => {
    // Do something with the response data
    console.log('after response: ', response);
    return response;
  },
  error => {
    // Handle the response error
    console.log('after response Err: ', error);
    return Promise.reject(error);
  }
);

export default Axios