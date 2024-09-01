import React from 'react';
import { Navigate } from 'react-router-dom';
import Login from "../Page/Login/Login";
import Register from "../Page/Register/Register";
import Profile from "../Page/Profile/Profile";
import Home from "../Page/Home/Home";
import ProfilePictureUpload from '../Page/Profile/ProfilePictureUpload';
import UpdateProfile from '../Page/Profile/UpdateProfile';
import DefaultLayout from '../components/Layout/DefaultLayout';
import withLayout from './PrivateRoute';

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



const privateRoutes = [
   
     { 
        path: '/home', 
        component: Home , 
        
    },
    {
        path: '/user/:UserId', 
        component: Profile
    }
];

export { publicRoutes, privateRoutes };
