
import axiosIntance from "../../api/axiosInstance";
import Notifications from "../Notifications/Notifications";
import CreatePost from "../Posts/CreatePost/CreatePost"
import PostFeed from "../Posts/PostFeed/PostFeed"
import Profile from "../Profile/Profile"
import React, { useState, useEffect } from 'react';
import SearchPage from "../Search/Search";
import { Link, useNavigate } from 'react-router-dom';
import "../Home/style.css"
import NavrightComponent from "../../pages/users/theme/NavRight/navright";
import Navleft from "../../pages/users/theme/NavLeft/navleft";
const Home = () =>{
    const UserId = localStorage.getItem('UserId');
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
   
    const fetchPosts = async () => {
        const token = localStorage.getItem('access');
        if (!token) return;

        try {
            const response = await axiosIntance.get('posts/', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setPosts(response.data);
        } catch (error) {
            console.error('Lỗi khi lấy bài đăng:', error);
        }
    };

    const handlePostCreated = (newPost) => {
        fetchPosts(); 
        setPosts([newPost, ...posts]);
    };

    const handlePostDeleted = (postId) => {
        setPosts(posts.filter(post => post.post_id !== postId));
    };
    useEffect(() => {
        fetchPosts();
    }, []);
    // const handleProfileClick = () => {
    //     const userId = localStorage.getItem('UserId'); // Lấy ID của người dùng hiện tại từ localStorage hoặc từ API
    //     if (userId) {
    //         navigate(`/profile/${userId}`);
    //         console.log("clicke")
    //     }
    // };
    return (
        <div className="body">
            <div className="Navright"><NavrightComponent/></div>
            <div className="children">
                {/* <Notifications/> */}
            {/* <h1>Xin chào</h1> */}
            {/* <div className = "post"> 
            <CreatePost onPostCreated={handlePostCreated} posts={posts} />
            </div> */}
          
              {/* <div className="search"><SearchPage /></div> */}
            <PostFeed posts={posts} onPostDeleted={handlePostDeleted} /> 
             {/* <Notifications /> */}
        {/* <Link to={`/user/${UserId}`}>
          
            <button >Profile</button>  </Link> */}
            {/* <Profile/> */}
            </div>
            <div className="Navleft"><Navleft/></div>
        </div>
    );
};

export default Home