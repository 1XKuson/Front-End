import axios from 'axios';

export default axios.create({
    baseURL: 'http://3.26.39.236:8080'
    // baseURL: 'https://catfact.ninja/fact'
});