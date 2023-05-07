import axios from 'axios';

const api = axios.create({
    // baseURL: localhost:3333
    baseURL: 'https://api-node-exercicio3.onrender.com/api'
});

export default api;