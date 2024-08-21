import axios from 'axios'

const axiosIntance = axios.create({
    baseURL:"http://localhost:8000/api/",
    headers: {
        'Content-Type': 'application/json'
    },
});

axiosIntance.interceptors.request.use(config => {
    if (config.url !== 'register/' && config.url !== 'login/') {
        const token = localStorage.getItem('access');
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config
},error => {
    return Promise.reject(error);
}
);
export default axiosIntance;