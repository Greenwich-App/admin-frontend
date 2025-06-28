import axios from 'axios';


const uri = 'https://localhost:8080';
const instance = axios.create({
  baseURL: uri
});

export { instance as axiosPlugin };
