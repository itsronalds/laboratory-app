import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://6dfd718e2d9c.ngrok.io/server/api',
  withCredentials: true,
});

export default instance;
