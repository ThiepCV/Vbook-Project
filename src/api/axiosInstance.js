import axios from 'axios'
const API_URL = 'https://api.example.com';


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

// Đăng nhập người dùng
export const loginUser = (data) => {
    return axios.post(`${API_URL}/login/`, data);
};

// Lấy thông tin hồ sơ người dùng
export const fetchUserProfile = (userId) => {
    return axios.get(`${API_URL}/user/${userId}/`);
};

// Cập nhật hồ sơ người dùng
export const updateUserProfile = (userId, data) => {
    return axios.put(`${API_URL}/user/${userId}/`, data);
};

// Tạo bài viết
export const createPost = (data) => {
    return axios.post(`${API_URL}/create-post/`, data);
};

// Cập nhật bài viết
export const updatePost = (postId, data) => {
    return axios.put(`${API_URL}/update-post/`, data);
};

// Xóa bài viết
export const deletePost = (data) => {
    return axios.delete(`${API_URL}/delete-post/`, { data });
};

// Theo dõi người dùng
export const followUser = (data) => {
    return axios.post(`${API_URL}/follow/`, data);
};

// Lấy danh sách người theo dõi
export const getFollowers = (userId) => {
    return axios.get(`${API_URL}/followers/${userId}/`);
};

// Lấy danh sách người đang theo dõi
export const getFollowing = (userId) => {
    return axios.get(`${API_URL}/following/${userId}/`);
};
