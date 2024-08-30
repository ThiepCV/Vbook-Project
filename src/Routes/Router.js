import React from 'react';
import { Navigate } from 'react-router-dom';
import Login from "../Page/Login/Login";
import Register from "../Page/Register/Register";
import Profile from "../Page/Profile/Profile";
import Home from "../Page/Home/Home";
import ProfilePictureUpload from '../Page/Profile/ProfilePictureUpload';
import UpdateProfile from '../Page/Profile/UpdateProfile';

// Hàm kiểm tra xem người dùng đã đăng nhập hay chưa
const isAuthenticated = () => {
    return localStorage.getItem('UserId') !== null;
};

// Public Routes
const publicRoutes = [
    { 
        path: '/login', 
        element:  <Login />, 
        layout: null 
    },
    { 
        path: '/register', 
        element: <Register />, 
        layout: null 
    },
];

// Private Routes
const privateRoutes = [
    { 
        path: '/user/:UserId', 
        element: isAuthenticated() ? <Profile /> : <Navigate to="/login" />, 
    },
    { 
        path: 'user/update/', 
        element: isAuthenticated() ? <UpdateProfile/> : <Navigate to="/login" />, 
    },
    { 
        path: '/profile-upload', 
        element: isAuthenticated() ? <ProfilePictureUpload /> : <Navigate to="/login" />, 
    },
    { 
        path: '/home', 
        element: isAuthenticated() ? <Home /> : <Navigate to="/login" />, 
    },
];

export { publicRoutes, privateRoutes };
