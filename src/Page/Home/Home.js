
import axiosIntance from "../../api/axiosInstance";
import CreatePost from "../Posts/CreatePost/CreatePost"
import PostFeed from "../Posts/PostFeed/PostFeed"
import Profile from "../Profile/Profile"
import React, { useState, useEffect } from 'react';
const Home = () =>{
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

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
    return (
        <div>
            <h1>Xin chào</h1>
            <CreatePost onPostCreated={handlePostCreated} posts={posts} />
            <PostFeed posts={posts} onPostDeleted={handlePostDeleted} />
        </div>
    );
};

export default Home