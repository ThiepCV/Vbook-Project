import React, { useState, useEffect } from 'react';
import axiosIntance from '../../../api/axiosInstance';


const Post = ({ post }) => {
    const [likeCount, setLikeCount] = useState(0);
    const [dislikeCount, setDislikeCount] = useState(0);

    useEffect(() => {
        
        setLikeCount(post.like_count);
        setDislikeCount(post.dislike_count);
    }, [post]);

    const handleLikeDislike = async (likeType) => {
        try {
            const response = await axiosIntance.post(`/posts/${post.PostId}/${likeType}/`);
            setLikeCount(response.data.like_count);
            console.log(likeCount, dislikeCount)
            setDislikeCount(response.data.dislike_count);
            console.log("post",post,response.data)
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            {/* <h3>{post.title}</h3>
            <p>{post.content}</p> */}
            <button onClick={() => handleLikeDislike('like')}>Like {likeCount}</button>
            <button onClick={() => handleLikeDislike('dislike')}>Dislike {dislikeCount}</button>
        </div>
    );
};

export default Post;
