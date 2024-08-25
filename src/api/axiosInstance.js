import axios from 'axios'
const API_URL = 'http://localhost:8000/api/';

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

// Hàm lấy thông tin người dùng
export const fetchUserProfile = (userId) => {
    return axiosIntance.get(`/users/${userId}/`);
};

// Cập nhật hồ sơ người dùng
export const updateUserProfile = (userId, data) => {
    return axios.put(`${API_URL}/user/${userId}/`, data);
};

export const fetchUserPosts = (userId) => {
    return axiosIntance.get(`/users/${userId}/posts/`);
};
// Hàm tạo bài đăng
export const createPost = (postData) => {
    return axiosIntance.post('/posts/', postData, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
    });
};

// Cập nhật bài viết
export const updatePost = (postId, data) => {
    return axios.put(`${API_URL}/update-post/`, data);
};

// Xóa bài viết
export const deletePost = (data) => {
    return axios.delete(`${API_URL}/delete-post/`, { data });
};

// Gọi API để thêm like vào bài đăng
export const likePost = (postId) => axiosIntance.post(`/posts/${postId}/like/`);

// Gọi API để thêm comment vào bài đăng
export const commentOnPost = (postId, content) => axiosIntance.post(`/posts/${postId}/comment/`, { content });


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