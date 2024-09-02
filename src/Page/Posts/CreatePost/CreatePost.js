import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosIntance from '../../../api/axiosInstance';
import "../CreatePost/style.css"

const CreatePost = ({ onPostCreated, posts }) => {
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('access'); 
        const user_id = localStorage.getItem('UserId');
        console.log(token, user_id)
        if (!token || !user_id) {
            setError('投稿を作成するにはログインする必要があります。');
            return;
        }

        try {
            const response = await axiosIntance.post(
                '/post/', 
                { content, UserId: user_id },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            if (response.status === 201) {
                onPostCreated(response.data);
                setContent('');
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.error || 'エラーが発生しました。');
            } else {
                setError('エラーが発生しました。');
            }
        }
    };

    return (
        <div classname="messageBox" >
            <form id="messageInput" onSubmit={handlePostSubmit}>
                <input
                    type="text" 
                    id="messageInput" 
                    name="file" 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="ここに投稿を書いてください..."
                    required
                />
                <button id="sendButton">
                    <svg viewBox="0 0 664 663" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
                        fill="none"
                    ></path>
                    <path
                        d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
                        stroke="#6c6c6c"
                        stroke-width="33.67"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></path>
                    </svg>
                </button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default CreatePost;
