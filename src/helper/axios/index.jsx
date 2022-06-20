import axios from 'axios';

 axios.interceptors.request.use(
  function(config) {
    config.headers = ``;
    return config
  }, 
  function(error) {
    return Promise.reject(error);
  },function(data){
    return Promise.resolve(data);
  }
);

const instance = axios.create();
export default instance;