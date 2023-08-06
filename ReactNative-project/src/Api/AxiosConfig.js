import axios from 'axios';
const instance = axios.create({
    baseURL: 'http://13.51.205.247:4000'
});



instance.interceptors.request.use(request => {
    return request;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

instance.interceptors.response.use(response => {
    return response;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

export default instance;
