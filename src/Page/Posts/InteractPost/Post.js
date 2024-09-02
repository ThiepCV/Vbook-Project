import React, { useState, useEffect } from 'react';
import axiosIntance from '../../../api/axiosInstance';
import { faComment, faSearch, faHeart, faUser, faBars } from '@fortawesome/free-solid-svg-icons'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Comments from '../InteractPost/Comment';
import "../InteractPost/style.css"

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
        <div className='like'>
            {/* <h3>{post.title}</h3>
            <p>{post.content}</p> */}
            <button onClick={() => handleLikeDislike('like')}><FontAwesomeIcon icon={faHeart}/>{likeCount}</button>
            {/* <button onClick={() => handleLikeDislike('dislike')}><FontAwesomeIcon icon={faHeart}/>{dislikeCount}</button> */}
          <Comments postId={post.PostId} />
         
        </div>
    );
};

export default Post;
